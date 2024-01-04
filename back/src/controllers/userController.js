import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import postUser from "../../middlewares/schemas/postUser.js";
import patchUser from "../../middlewares/schemas/patchUser.js";


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
    const createUserSchema = postUser;
  
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
  
    const updateUserSchema = patchUser;
  
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