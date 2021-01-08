var jwt = require('jsonwebtoken');
const secretKey = 'secretKey'



module.exports = {
    createJWT: ({restaurantId, email}) => {
        try {
            const token = jwt.sign({ 
                restaurantId, 
                email
            }, secretKey);
             return token
        }
        catch (err) {
            console.log('JWT Error')
        }
    },
    parseJWT: (token) => {
        return jwt.verify(token, secretKey)
    }
}