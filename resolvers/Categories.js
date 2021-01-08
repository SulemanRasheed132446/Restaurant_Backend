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
 
const getCategories = async (_,{restaurantId}) => {
   try {
      //Find all the categories of a given restaurant with its id
      const snapshots = await firestore.collection(CategoryCollection).
         where('restaurantId' ,'==', restaurantId)
         .get();
      const categories = []
      //Create an array of those documents
      snapshots.forEach(document => {
         const _id = document.id
         const { name } = document.data()
         categories.push({
            _id,
            name
         })
      })
      //return the categories
      return categories;
   }
   catch (err) {
      console.log('GET CATEGORIES')
      console.log(err)
   }
}
module.exports = {
    addCategory,
    getCategories
}
