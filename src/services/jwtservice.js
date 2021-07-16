const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'abigsecret';
const expiry = Number(process.env.TOKEN_EXPIRY) || 48000;

exports.createToken = (user) =>{
    try {
        let token = jwt.sign({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }, secret, {expiresIn: expiry});
        return token
    } catch (err) {
        console.log(err)
        return null
    }
}

exports.decodeToken = (token) =>{
    try{
        let decodedToken = jwt.verify(token, secret);
        return decodedToken

    } catch(error) {
        console.log(error)
        return null
    }
}