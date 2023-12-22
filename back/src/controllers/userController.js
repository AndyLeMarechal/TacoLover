import { User } from "../models/index.js";
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import bcrypt from "bcrypt";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export async function getAllUsers(req, res) {
  try{
    const users = await User.findAll({
      order: ["id"],});
    if(!users){
      return res.status(404).json({error: '/users not found.'});
    }
    res.status(200).json(users);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOneUser(req, res) {
  try{
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
      return res.status(400).json({error: 'User ID should be a valid integer'});
    }
    const user = await User.findByPk(userId,{
      order: ["id"],
    });
    if(!user){
      return res.status(404).json({error: 'User not found. Please verify the provided id.'});
    }
    res.status(200).json(user);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdUser(req, res) {
  try{
    const createUserSchema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(4)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
          'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
          'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
          'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
          'password.noWhiteSpaces': '{#label} should not contain white spaces',
          'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        }),
  
      passwordConfirm: Joi.ref('password'),
  
      firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      address: Joi.string()
        .min(3)
        .max(200)
        .required(),
  
      role: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
  
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }) ,
    });
  
    const { error } = createUserSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }
  
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({error: 'Passwords do not match'});
    }
  
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({error: 'Email is already in use'});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    const createdUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address, 
      role: req.body.role || "registered",
    });
    res.status(201).json(createdUser);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedUser(req, res) {
  try{
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
      return res.status(400).json({error: 'User ID should be a valid integer'});
    }
    const user = await User.findByPk(userId);
    if(!user){
      return res.status(404).json({error: 'User not found. Please verify the provided id.'});
    }
  
    const updateUserSchema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(4)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
          'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
          'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
          'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
          'password.noWhiteSpaces': '{#label} should not contain white spaces',
          'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        }),
  
      passwordConfirm: Joi.ref('password'),
  
      firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
      address: Joi.string()
        .min(3)
        .max(200)
        .required(),
  
      role: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
  
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }) ,
    });
  
    const { error } = updateUserSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }
  
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({error: 'Passwords do not match'});
    }
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
  
    if(isValidPassword) {
      return res.status(400).json({error: 'Password is already in use'});
    }
  
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    const updatedUser = await user.update({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address, 
      role: req.body.role,
    });
    res.status(200).json(updatedUser);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function deletedUser(req, res) {
  try{
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
      return res.status(400).json({error: 'User ID should be a valid integer'});
    }
    const user = await User.findByPk(userId);
    if(!user){
      return res.status(404).json({error: 'User not found. Please verify the provided id.'});
    }
    await user.destroy();
    res.status(204).end();
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}