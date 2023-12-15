import { User } from "../models/index.js";
import Joi from 'joi';
import bcrypt from "bcrypt";

export async function getAllUsers(req, res) {
    const users = await User.findAll();
    if(!users){
        return res.status(404).json({error: '/users not found.'})
    };
    res.status(200).json(users);
};

export async function getOneUser(req, res) {
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
        return res.status(400).json({error: 'User ID should be a valid integer'})
    };
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({error: 'User not found. Please verify the provided id.'})
    };
    res.status(200).json(user);
};

export async function createdUser(req, res) {
    const createUserSchema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

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
    })

  const { error } = createUserSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({error: 'Passwords do not match'})
  };

  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return res.status(400).json({error: 'Email is already in use'})
  };
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createdUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address, 
        role: req.body.role || "signed",
    });
    res.status(201).json(createdUser)
};

export async function updatedUser(req, res) {
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
        return res.status(400).json({error: 'User ID should be a valid integer'})
    };
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({error: 'User not found. Please verify the provided id.'})
    };

    const updateUserSchema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

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
    })

  const { error } = updateUserSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({error: 'Passwords do not match'})
  };
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  if(isValidPassword) {
    return res.status(400).json({error: 'Password is already in use'})
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
};

export async function deletedUser(req, res) {
    const userId = Number.parseInt(req.params.id, 10);
    if(isNaN(userId)){
        return res.status(400).json({error: 'User ID should be a valid integer'})
    };
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({error: 'User not found. Please verify the provided id.'})
    };
    await user.destroy();
    res.status(204).end();
}