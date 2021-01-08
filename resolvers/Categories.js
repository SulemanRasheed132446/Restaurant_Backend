const {CategoryCollection} = require("../utils/Collections")
const { firestore } = require("../utils/firebase");

const addCategory = async (_,{addCategoryInput}) =>  {
    const {
       restaurantId,
       name
    } = addCategoryInput
    try {
       const snapshots =  await firestore.collection(CategoryCollection).
          where("restaurantId" ,"==", restaurantId).
          where("name", '==', name).
          get()
       const isNotAlreadyPresent = snapshots.size == 0
       if(isNotAlreadyPresent) {
          const category = await firestore.collection(CategoryCollection).add({
             restaurantId,
             name
          })
          return {
             _id: category.id,
             name,
             dishes:[]
          }
       }
       throw Error("Such dish already exists for this restauraat")
    }
    catch (err) {
       throw err
    }
 }
 
module.exports = {
    addCategory
}
