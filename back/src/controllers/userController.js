import { User } from "../models/index.js";

export async function getAllUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
};

export async function getOneUser(req, res) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    res.json(user);
};

export async function createdUser(req, res) {
    const body = req.body;
    const createdUser = await User.create({
        username: body.username,
        email: body.email,
        password: body.password, 
        firstname: body.firstname,
        lastname: body.lastname,
        address: body.address, 
        role: body.role || "signed",
    });
    res.json(createdUser)
};

export async function updatedUser(req, res) {
    const userId = req.params.id;
    const body = req.body;
    const user = await User.findByPk(userId);
    const updatedUser = await user.update({
        username: body.username,
        email: body.email,
        password: body.password, 
        firstname: body.firstname,
        lastname: body.lastname,
        address: body.address, 
        role: body.role
    });
    res.json(updatedUser);
};

export async function deletedUser(req, res) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const deletedUser = await user.destroy();
    res.json(deletedUser);
}