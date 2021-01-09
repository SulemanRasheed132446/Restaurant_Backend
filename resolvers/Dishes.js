const {CategoryCollection, DishesCollection} = require("../utils/Collections")
const { firestore, bucket } = require("../utils/firebase");
const addDish = async  (_,{addDishInput}) => {
    const { 
       categoryID,
       name,
       image,
       price,
       multipleSize,
       sizes,} =  addDishInput;

    try {
       const snapshots = await firestore.collection(DishesCollection).
                   where('categoryId', '==', categoryID).
                   where('name', '==',name)
                   .get()
       if (snapshots.size !== 0) {
          throw Error('Such Dish Already Exists')
       }
       const imageUrl = await uploadImage(image, `${categoryID}_${name}`)
       const dish  = await firestore.collection(DishesCollection).add({
          name,
          imageUrl,
          price,
          multipleSize,
          sizes,
          categoryId: categoryID
       })
       
       return {
          _id: dish.id,
          name,
          imageUrl,
          price,
          multipleSize,
          sizes,
       }
    }
    catch(err) {
       console.log('ADD DISH ERROR');
       throw err;
    }
    
}

const deleteDish = async (_ , {dishId, categoryId}) => {
   console.log(dishId, categoryId);
   try {
     await firestore.collection(DishesCollection).
               doc(dishId).
               delete()
      bucket.file(`${categoryId}_${dishId}`).delete()
      return {
         id: dishId
      }
   }
   catch(err) {
      console.log('DELETE DISH ERROR');
      console.log(err)
      throw Error("Such dish does not exists")
   }
}
module.exports = {
    addDish,
    deleteDish
}