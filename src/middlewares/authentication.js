const { decodeToken } = require('../services/jwtservice')


exports.authenticateUser = (req, res, next) => {
    // check if there is an authorisation token
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'authorization header required'})
    }

    let splittedHeader = req.headers.authorization.split(' ')
    if (splittedHeader[0] !== "Bearer"){
        return res.status(401).json({ message: 'authorization format is Bearer <token>'})
    }
    let token = splittedHeader[1];
    // decode token
   let decodedToken = decodeToken(token);
        // check if valid
        if(!decodedToken) {
            return res.status(401).json({message: 'user not found'})
        } else {
       
        // allow user to continue with request
        req.user = decodedToken
        next()
    }
}

exports.checkifAdmin = (req, res, next) => {
    //check if user  is an admin
    if(req.user.role !== 'admin') {
        return res.status(401).json({ message: 'this route is restricted to admin users'})
    }
     return next()
}