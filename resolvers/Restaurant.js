const { RestaurantCollection } = require("../utils/Collections");
const { auth, firestore } = require("../utils/firebase");
const { hashPassword } = require("../utils/Hashing");
const {createJWT} = require("../utils/jwt")
const signUpRestaurant = async (_, {restaurantInput}) => {
    try {
        const {email, password, phoneNumber, name} = restaurantInput;
        //Hash the password
        //Now create a user with this email and hashedPassword
        await auth.createUserWithEmailAndPassword(email, password);
        //If signup successfull store it in the firestore
        const snapshot = await firestore.collection(RestaurantCollection).add({
            email,
            phoneNumber,
            name
        })
        //Storing the user data in the firestore
        let token = createJWT({restaurantId: snapshot.id, email});
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

const signIn = async (_, {signInInput}) => {
    try {
        const {email, password} = signInInput
        await auth.signInWithEmailAndPassword(email, password)

        const snapshot = await firestore.collection(RestaurantCollection).where('email','==', email).limit(1).get();
        //If there is only one user with such email
        let token;
        //Checking that only a single restaurnat with such email exits or not
        if (snapshot.size == 1) {
            snapshot.forEach(document => {
                token = createJWT({restaurantId: document.id, email})
                
            })
            //Sending the token for storage purposes
            return {
                token
            }
        }
        throw Error('No such user exits')
    }
    catch(err) {
        console.log('sign In error')
        console.log(err)
    }
}
module.exports = {
    signUpRestaurant,
    signIn
}