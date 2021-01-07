const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hashPassword : async (password) => {
        try {
            const hashedPassword =  await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        }
        catch(err) {
            console.log(err)
        }
    } 
}