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

module.exports = {registerUser}