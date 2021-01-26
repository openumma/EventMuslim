const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Organizer.js");
const { Op } = require("sequelize");

const docs = require('simple-rest-docs');

const options = {
  files: ['./register.js'], // glob pattern
  output: './README.md', //default './DOCUMENT.md'
  // parsers: []
}

docs(options);

router.use(express.urlencoded({extended:true}));

router.route("/register")
    //show all user
    .get(async (req,res)=>{
        try {
            const getAllUser = res.json(await User.findAll({}));

        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    })
    //insert new user
    .post(async (req,res)=>{
        try {
            const {email, nama_organizer, nomor_hp, password, instagram, facebook, whatsapp} = req.body;

            //validate form
            if(email && nama_organizer && password){
                //validate existed user
                const getUser = await User.findOne({
                    where: {
                        // [Op.or]: [{username: username},{email:email}]
                        email:email
                    }
                });
                if(!getUser){
                    await bcrypt.hash(req.body.password, 10).then(async (hash)=>{
                        const newUser =  await new User({
                            email, nama_organizer, nomor_hp, password: hash, instagram, facebook, whatsapp
                        })
                        await newUser.save();
                        const message = "User successfully inserted!";
                        res.json({newUser, message:message});
                    })
                }else{throw({message: "email existed!"})}
            }else{throw({message: "please fill the form correctly!"})}
        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    });

router.route("/users/:id")
    //search user by id
    .get(async (req,res)=>{
        try {
            const id = req.params.id;
            const getUser = res.json(await User.findOne({
                where: {id:id}
            }));

        } catch (err) {
            console.error(err.message);
            res.status(500).json(err);
        }
    })

router.route("/register/:id")
    //edit user
    .put(async (req,res)=>{
        try {
            const {email, nama_organizer, nomor_hp, password, instagram, facebook, whatsapp} = req.body;
            const id = req.params.id;
            
            bcrypt.hash(req.body.password, 10).then(async (hash)=>{
                const editUser = await User.update({
                    email, nama_organizer, nomor_hp, password: hash, instagram, facebook, whatsapp
                },{where: {id:id}});
                await editUser; 
                return res.json({editUser:{id, email, nama_organizer, nomor_hp, password: hash, instagram, facebook, whatsapp}, message:'User successfully edited!'});
            })

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({message:"server error"});
            }
    })
    //delete user
    .delete(async (req,res)=>{
        try {
            const id= req.params.id;
            const deleteUser = await User.destroy({
                where: {id:id}
            });
            await deleteUser; 
            res.json({message:"User successfully deleted!"})
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    });

module.exports = router;


/**
 * @title Register
 *
 * @desc Register new user.
 *
 * @method POST
 *
 * @url /register/
 * @data username
 * @data email
 * @data namalengkap
 * @data password
 *
 * @success-code 200
 * @success-content
 * {
 *  "newUser": {
 *      "id": 1,
 *      "username": "example",
 *      "email": "example@gmail.com",
 *      "namalengkap": "nama",
 *      "password": "$2a$10$VjflGRM6eUmKB/HumI4IyeAefqKHGk4pJDn.588pZY87g5o4W4Kfu",
 *      "updatedAt": "2021-01-23T09:05:36.938Z",
 *      "createdAt": "2021-01-23T09:05:36.938Z"
 *      },
 *  "message": "User successfully inserted!"
 * }
 *
 * @note This is still in development.
 *
 * 
 * @title Show User
 *
 * @desc Returns json data about a single user.
 *
 * @method GET
 *
 * @url /users/:id
 * @data none
 *
 * @success-code 200
 * @success-content
 * {
 *   "id": 1,
 *   "username": "example",
 *   "email": "example@gmail.com",
 *   "namalengkap": "nama",
 *   "password": "$2a$10$VjflGRM6eUmKB/HumI4IyeAefqKHGk4pJDn.588pZY87g5o4W4Kfu",
 *   "updatedAt": "2021-01-23T09:05:36.938Z",
 *   "createdAt": "2021-01-23T09:05:36.938Z"
 * }
 *
 * @note This is still in development.
 *
 * 
 * @title Edit User
 *
 * @desc Edit existed user data.
 *
 * @method PUT
 *
 * @url /register/:id
 * @data username
 * @data email
 * @data namalengkap
 * @data password
 *
 * @success-code 200
 * @success-content
 * {
 *  "editUser": {
 *      "id": 1,
 *      "username": "example",
 *      "email": "example@gmail.com",
 *      "namalengkap": "nama",
 *      "password": "$2a$10$VjflGRM6eUmKB/HumI4IyeAefqKHGk4pJDn.588pZY87g5o4W4Kfu",
 *      },
 *  "message": "User successfully edited!"
 * }
 *
 * @note This is still in development.
 *
 * 
 * @title Delete User
 *
 * @desc Delete user data permanently.
 *
 * @method DELETE
 *
 * @url /users/:id
 * @data none
 *
 * @success-code 200
 * @success-content
 * {
 *   "message": "User successfully deleted!"
 * }
 *
 * @note This is still in development.
 */