const {CategoryCollection, DishesCollection} = require("../utils/Collections")
const { firestore, bucket } = require("../utils/firebase");
const addDish = async  (_,{addDishInput}) => {
    const { categoryID, name, image, price, multipleSize, sizes} =  addDishInput;
    const dishData = {name, imageUrl : '', price, multipleSize, sizes, categoryId: categoryID }
      try {
         //Checking whether such a dish is already in this category
         //If such dish exists throw dish id already present
         const snapshots = await firestore.collection(DishesCollection).
               where('categoryId', '==', categoryID).
               where('name', '==',name)
               .get()
         //If a snapshot is present throwing error
         if (snapshots.size !== 0) {
             throw Error('Such Dish Already Exists')
         }
         //Storing the dish data except image url in the firestore
         const dish  = await firestore.collection(DishesCollection).add(dishData)
         //Storing the image with a unique name of categoryID and dishID
         const imageUrl = await uploadImage(image, `${categoryID}_${dish.id}`)
         //storing the image url in the firestore
         firestore.collection(DishesCollection).doc(dish.id).update({
          imageUrl : imageUrl,
         })
         return {
          _id: dish.id,
          ...dishData,
          imageUrl,
       }
    }
    catch(err) {
       console.log('ADD DISH ERROR');
       throw err;
    }
    
}
const update = async ( _, {updateDish}) => {
   const { dishID, name, price, multipleSize, sizes, image, categoryID } = updateDish;
   try {
      //Checking whether a dish with new name already exits in the firestore or not
      //If present throw Error Dish is already present
      const snapshots = await firestore.collection(DishesCollection).
               where("categoryId", '==' , categoryID).
               where("name" , '==' , name).
               get();
      if (snapshots.size) {
         throw Error("Such a dish is already present")
      }
      if (image !== undefined) {
         //Since image will be uploaded with the same name as the previous image
         //so we dont need to update the imageUrl for dish
         uploadImage(image, `${categoryID}_${dishID}`)
      }
      
      
      //We only need to update the name, price, multipleSize , sizes,
      //because the imageUrl and category will remain same
      firestore.collection(DishesCollection).doc(dishID).update({
         name,
         price, 
         multipleSize,
         sizes,
      })
      return {
         id: dishID,
         name,
         price, 
         multipleSize,
         sizes,
         categoryId: categoryID
      }
   }
   catch(error) {
      console.log("Update Dish Error");
      console.log(error)
      throw error
   }
}

module.exports = {
    addDish,
    update
}