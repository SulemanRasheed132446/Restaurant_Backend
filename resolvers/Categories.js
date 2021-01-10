const {CategoryCollection, DishesCollection} = require("../utils/Collections")
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

const deleteCategory = async (_, {categoryId}) => {
   try {
      //Delete the category from the Category Collection
      firestore.collection(CategoryCollection).doc(categoryId).delete()
      //Get the dishes of that category
      const dishesSnapshots = await firestore.
                              collection(DishesCollection).
                              where('categoryId' , '==', categoryId).
                              get()
      //Created a batch 
      const batch =  firestore.batch();
      
      //Delete each dish having same category
      dishesSnapshots.forEach(dish => batch.delete(dish.ref))
      //Commit the batch
      batch.commit()
      return  {
         id: categoryId
      }
   }
   catch(err) {
      console.log('DELETE DISH ERROR')
      console.log(err)
   }
}
module.exports = {
    addCategory,
    getCategories,
    deleteCategory
}
