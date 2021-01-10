const PubSub = require ('graphql-firestore-subscriptions');
const { firestore } = require("../utils/firebase");
const {OrderCollection} = require("../utils/Collections")
const pubsub = new PubSub.default();
const { withFilter } = require('apollo-server');

const Topic  = {
   ORDER_STATUS_UPDATED:'ORDER_UPDATED' ,
}
 

pubsub.registerHandler(Topic.ORDER_STATUS_UPDATED, broadcast =>
// Note, that `onSnapshot` returns a unsubscribe function which
// returns void.
   firestore.collection(OrderCollection).onSnapshot(snapshot => {
      snapshot
         .docChanges()
         .filter(change => change.type === 'modified')
         .map(item => {
            //Sending the data for subscribe order
            broadcast({subscribeOrder:{ _id: item.doc.id, ...item.doc.data()}})});
   })
);

const subscribeOrder = {
   subscribe: withFilter(
      () => pubsub.asyncIterator(Topic.ORDER_STATUS_UPDATED),
      (payload, variables) => {
         return variables.orderId === payload.subscribeOrder._id;         
      },
   )
}

const createOrder = async (_, {restaurantId, dishes, tableNo, total}) => {
    try {
       const orderSnapshot = await firestore.
          collection(OrderCollection).
          where('restaurantId', '==', restaurantId).
          where('tableNo', '==', tableNo).
          where('status', '!=', 'DELIVERED')
          .get()
       //If there is an order whose status is not delivered
       //We should not place any order
       orderSnapshot.forEach(order => {
          order.id
       })
       
       //If there is no order whose status is not delivered
       if (orderSnapshot.size  ===  0) {
          const order = await firestore.collection(OrderCollection).add({
             tableNo,
             dishes,
             status: 'PENDING',
             total,
             restaurantId
          })
          return  {
             _id: order.id,
             dishes,
             status: 'PENDING',
             total
          }
       }
       throw Error('An order has already been placed')
    }
    catch (err) {
       console.log('CREATE ORDER')
       console.log(err)
       throw err;
    }
 }

const updateOrder = async (_ , {orderId, status}) => {
   try {
      await firestore.collection(OrderCollection).doc(orderId).update({
         status
      })
      console.log("yes");
      pubsub.publish(Topic.ORDER_STATUS_UPDATED)
      return {
         id: orderId,
      }
   }
   catch (err) {
      console.log("Update Order Error");
   }
}
module.exports = {
    createOrder,
    updateOrder,
    subscribeOrder
}