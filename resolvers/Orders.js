const PubSub = require ('graphql-firestore-subscriptions');
const { firestore } = require("../utils/firebase");
const {OrderCollection} = require("../utils/Collections")
const pubsub = new PubSub.default();
const { withFilter } = require('apollo-server');

const ORDER  = {
   STATUS_UPDATED:'ORDER_UPDATED' ,
   ORDER_CREATED:'ORDER_CREATED'
}
 
pubsub.registerHandler(ORDER.STATUS_UPDATED, (broadcast, options) => {
   let isInitialSnapshot = true;
   const unsub = firestore.collection(OrderCollection).onSnapshot(snapshot => {
      if(isInitialSnapshot) {
         isInitialSnapshot = false;
         return ;
      }
      snapshot
         .docChanges()
         //If no order is removed,
         .filter(change => change.type === 'modified')
         .map(item => {
            //Sending the data for subscribe order
            broadcast({ _id: item.doc.id, ...item.doc.data()})});
   })
   return unsub
})

pubsub.registerHandler(ORDER.ORDER_CREATED, (broadcast, options) => {
   let isInitialSnapshot = true;
   const unsub = firestore.collection(OrderCollection).onSnapshot(snapshot => {
      if(isInitialSnapshot) {
         isInitialSnapshot = false;
         return ;
      }
      snapshot
         .docChanges()
         //If no order is removed,
         .filter(change => change.type === 'added')
         .map(item => {
            //Sending the data for subscribe order
            broadcast({ _id: item.doc.id, ...item.doc.data()})});
   })
   return unsub
});

const subscribeOrderByRestaurant = {
   resolve: (payload) => {
      return payload;
   },
   subscribe: withFilter(
      () => pubsub.asyncIterator([ORDER.ORDER_CREATED]),
      (payload, variables) => {
         return variables.restaurantId === payload.restaurantId;         
      },
   )
}

const subscribeOrderByCustomer = {
   resolve: (payload) => {
      return payload;
   },
   subscribe: withFilter(
      () => pubsub.asyncIterator([ORDER.STATUS_UPDATED]),
      (payload, variables) => {
         return variables.orderId === payload._id;         
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
          pubsub.publish(ORDER.STATUS_UPDATED)
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
      pubsub.publish(ORDER.ORDER_CREATED)
      return {
         id: orderId,
      }
   }
   catch (err) {
      console.log("Update Order Error");
      console.log(err)
   }
}
module.exports = {
    createOrder,
    updateOrder,
    subscribeOrderByRestaurant,
    subscribeOrderByCustomer
}