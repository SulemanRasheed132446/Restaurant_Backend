const {CategoryCollection, DishesCollection} = require("../utils/Collections")
const { firestore } = require("../utils/firebase");
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

const getDishes = async ( _, {categoryId}) => {
   try {
      const snapshots = await firestore.collection(DishesCollection).
            where("categoryId", '==',categoryId)
            .get();
      const dishes = []
      snapshots.forEach(document => {
         dishes.push({
            _id: document.id,
            ...document.data()
         })
      })
      return dishes;
   }
   catch(err) {
      console.log("GET DISHES ERROR");
      console.log(err)
   }
}

module.exports = {
    addDish,
    getDishes
}