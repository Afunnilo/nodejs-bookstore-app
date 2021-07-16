const User = require('../models/user');
const bcrypt = require('bcryptjs');
let password = 'admin111'

exports.seedAdmin = () => {
    //  check if theres an admin account
    User.findOne({role: 'admin'}, (err, admin) =>{
        if (err) throw err
        if(admin) {
            return "admin account already exists"
        }

        User.create({
            firstName: 'Book',
            lastName: 'Supreme',
            username: 'supremebook',
            role: 'admin'
        }, (err, user)=>{
            if (err) throw err
            bcrypt.genSalt(10, (err, salt)=>{
                if (err) throw err
                bcrypt.hash(password, salt, (err, hash)=>{
                    if (err) throw err
                    user.password = hash;
                    user.save((err, savedUser)=>{
                        if(err) throw err
                        return 'Admin account created'
                    })
                })

            })
        })
    
    })

}

