const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const signup = async (req,res) =>{

    try{

        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.json({
            message: "User created successfully"
        })

    }

    catch(error){
        console.log(error);
        
        res.status(500).json({
            error: "Signup failed",
        
        });
    }
};

const login = async (req,res) =>{

    try{
        
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },

            "secretkey",

            {
                expiresIn: "7d",
            }
        );

        res.json({
            token
        });


    }catch(error){
    
        console.log(error);

        res.status(500).json({
            error: "Login failed",
        });

    }

};


module.exports = {
    signup,
    login
};