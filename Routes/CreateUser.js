const express = require("express");
const router = express.Router();
const user = require("../Models/Users");
const { body,validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyzabcdef";

router.post(
  "/createUser",[
  body("name").notEmpty(),
  body("password",'Incorrect Password').isLength({ min: 6 }),
  body("email").isEmail()],
  

  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      //   return res.send(`Hello, ${req.query.person}!`);
      res.status(400).json({error: err.array()})
      return;
      }
    // const exist = await user.findOne({email:req.body.email});
    // if(exist){
    //   return res.status(401).json({message:"Email Already Exists..."});
    // }
   
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
      await user.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
  
);

router.post(
  "/loginUser",[
  body("password",'Incorrect Password').isLength({ min: 6 }),
  body("email").isEmail()],
  
  async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
    //   return res.send(`Hello, ${req.query.person}!`);
    return res.status(400).json({error: err.array()})
  
    }

    const email = req.body.email;
    try {
      let userData = await user.findOne({email});
      if(!userData){
        return res.status(400).json({error:"Enter Correct Credentials"});
      }
      const comparedPwd = await bcrypt.compare(req.body.password,userData.password);
      if(!comparedPwd){
        return res.status(400).json({error:"Enter Correct Credentials"});
      }

      const data = {
        User :{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken ,data:userData.email});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);


module.exports = router;
