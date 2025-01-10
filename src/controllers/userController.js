const User = require('../models/userCreate')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) =>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message: 'Username and password are required'})
    }
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, password: hashedPassword})
        const user = await newUser.save()
        res.status(201)
    }
    catch (error){
        console.error(error.message)
        res.status(500).send('server error')
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message: 'Username and password are required'})
    }
    try{
        const user = await User.findOne({username})
        if(!user){
            res.json({success: false, message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        {
            res.json({success: false, message: 'Invalid credentials'})
        }
        res.json({success: true, message: 'LOGGED_IN', user})
    }
    catch(error){
       res.json({succes: false, message: 'ERROR_VERIFYING'})
    }
}

module.exports = {registerUser, loginUser}