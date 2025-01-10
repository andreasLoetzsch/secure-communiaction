const User = require('../models/userCreate')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
require('dotenv').config();

function generateAccessToken (user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {expiresIn: '15m'})
}
function generateRefreshToken (user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_KEY, {expiresIn: '7d'})
}

const giveUserJwt = async (req, res) =>{
     const {username, password} = req.body
     const authResult =  userController.login(username, password)
     if(authResult.status === 200){
        const accessToken = generateAccessToken(authResult.user)
        const refreshToken = generateRefreshToken(authResult.user)

        res.cookie('accessToken', generateAccessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict'
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })
        res.status(200).json({message: 'Login successful'})
     }else{
        res.status(authResult.status).json({message: authResult.message})
     }
}

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
        res.json({success: true, message: 'LOGGED_IN'})
    }
    catch(error){
       res.json({succes: false, message: 'ERROR_VERIFYING'})
    }
}

module.exports = {registerUser, loginUser, giveUserJwt}