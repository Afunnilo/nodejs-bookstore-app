const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');   
const secret = "verySecureSECRET";
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    // fetch user details from req.body
    // check if user with this username exists
    User.findOne({username : req.body.usernmae}, (err, existingUser)  => {
        if (err){
            return res.status(500).json({err})
        } 
        if (existingUser) {
                return res.status(400).json({ message : "a user with this username already exists"})
            }
        // create new user
        User.create({
            firstName : req.body.firstName,
            lastName :  req.body.lastName,
            username: req.body.username,
        }, (err, newUser)=> {
            if (err) {
                return res.status(500).json({err})
            }
            // hash users password
            bcyrpt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                bcryptjs.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({err})
                    }
                    // save password to database
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({ err })
                        }
                        // create jwt for user
                        jwt.sign(
                            {
                                id: newUser._id,
                                username: newUser.username,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName

                            }, secret, {expiresIn: expiry}
                        )
                        // send token to user

                    })
                })
            })
        })
    })
    
    // hash password
    // save password to db
    // create jwt for user
    // send token to user   
}