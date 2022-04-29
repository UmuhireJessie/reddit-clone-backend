const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/user")


const changePassword = async (req, res) => {
  try {
    const validator = new Validator(req.body, {
      old_password: "required",
      new_password: "required",
      confirm_password: "required|same:new_password",
    });

    const matched = await validator.check();

    if (!matched) {
      return res.status(422).json({
          error: validator.error
      });
    }

    let currentUser = req.user;
    if(bcrypt.compareSync(req.body.old_password, currentUser.password)) {
        let hashPassword = bcrypt.hashSync(req.body.new_password, 10);
        
        await User.updateOne({
            _id: currentUser._id,
        },{
            password: hashPassword
        });

        
        let userData = await User.find({_id: currentUser._id})
        let jwt_secret = process.env.TOKEN_SECRET;
        let token = jwt.sign({
            data: userData
        }, jwt_secret, { expiresIn: '1d' });


        return res.status(200).json({
            message: "Password is successfully updated",
            data: userData,
            token: token
        });

    } else {
        return res.status(400).json({
            message: "Password does not match",
        });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({
        error: error.message
    })
  }
};

module.exports = { changePassword }
