const { RestaurantCollection } = require("../utils/Collections");
const { auth, firestore } = require("../utils/firebase");
const { hashPassword } = require("../utils/Hashing");
const {createJWT} = require("../utils/jwt")
const signUpRestaurant = async (_, {restaurantInput}) => {
    try {
        const {email, password, phoneNumber, name} = restaurantInput;
        //Hash the password
        const hashedPassword = await hashPassword(password);
        //Now create a user with this email and hashedPassword
        await auth.createUserWithEmailAndPassword(email, hashedPassword);
        //If signup successfull store it in the firestore
        const snapshot = await firestore.collection(RestaurantCollection).add({
            email,
            phoneNumber,
            name
        })
        //Storing the user data in the firestore
        const token = createJWT({restaurantId: snapshot.id, email});
        //Creating a jwt token and returning it
        return {
            token
        }

    }
    catch(err) {
       if (err.code === 'auth/email-already-in-use')
          throw Error("The email address is already in use by another account.")
    }
}

module.exports = {
    signUpRestaurant
}