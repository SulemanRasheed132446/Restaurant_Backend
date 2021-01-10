const { firestore } = require("../utils/firebase");
const {OrderCollection} = require("../utils/Collections")

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
    updateOrder
}