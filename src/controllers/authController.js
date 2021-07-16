const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { createToken} = require('../services/jwtservice')

exports.registerNewUser = (req, res) => {
    // fetch user details from req.body
    // check if user with this username exists
    User.findOne({username : req.body.username}, (err, existingUser)  => {
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
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
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
                        let  token = createToken(newUser)
                        if (!token) {
                            return res.status(500).json({message : 'sorry, we could not authenticate you.'})
                        }
                                // send token to user
                                return res.status(200).json({ message : "User registration sucessful", token})
                         })
                   })
                })
            })
        })   
}

exports.loginUser = (req, res) => {
    // check if user exists
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
            return res.status(500).json({ err })
        }
        if(!foundUser) {
            return res.status(401).json({ message: 'incorrect username' })
        } 
        // check if password is correct
       let match =  bcrypt.compareSync(req.body.password, foundUser.password) 
       if (!match){
           return res.status(401).json({message: 'incorrect password'})
       }
       // create a token and send to user
       let  token = createToken(foundUser)
       if (!token) {
           return res.status(500).json({message : 'sorry, we could not authenticate you. Please log in.'})
       }
          return res.status(200).json({message : 'user logged in', token})
       })

    
}