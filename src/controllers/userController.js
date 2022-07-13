import dotenv from "dotenv";
dotenv.config();
import logger from "../utils/loggers.js";

import UserClass from "../class/classUser.js";
const userClass = new UserClass();


import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import allProducts from "../services/listProductsOnDB.js";
const listProductsOnDB = allProducts;


import multer from "multer";
const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });

import sharp from "sharp";
import fs from "fs";





class UserController {
    constructor() {
        this.userClass = []
    }
    async getAllUsers(req, res) {
        try {
            logger.info(`Se registra petición GET /api/usuarios`)
            const users = await userClass.getAllUsers()
            logger.info(`Se obtienen users`)
            res.json(users)
            return users
        }
        catch (err) {
            logger.error(`Error al obtener users`)
            throw err
        }
    }

    async getUserById(req, res) {
        try {
            logger.info(`Se registra petición GET /api/usuarios/${req.params.id}`)

            const user = await userClass.getUserById(req.params.id)
            logger.info(`Se obtiene user`)
            res.json(user)
            return user
        }
        catch (err) {
            logger.error(`Error al obtener user`)
            throw err
        }
    }
    async createUser(req, res) {
        try {
            logger.info(`Se registra petición POST /api/usuarios`)
            const userCreado = await userClass.createUser(req.body)
            logger.info(`Se crea user`)
            res.json(userCreado)
        }
        catch (err) {
            logger.error(`Error al crear user`)
            throw err
        }
    }

    async login(req, res) { 
        try {
            logger.info(`Se registra petición POST /api/login`)
            const user = await userClass.login(req.body)
            logger.info(`Se obtiene user`)
            res.json(user)
            return user
        }
        catch (err) {
            logger.error(`Error al obtener user`)
            throw err
        }
    }

    
    async updateUser(req, res) {
        try {
            logger.info(`Se registra petición PUT /api/usuarios/${req.params.id}`)
            const userActualizado = await userClass.updateUser(req.params.id, req.body)
            logger.info(`Se actualiza user`)
            res.json(userActualizado)
        }
        catch (err) {
            logger.error(`Error al actualizar user`)
            throw err
        }
    }
    async deleteUser(req, res) {
        try {
            logger.info(`Se registra petición DELETE /api/usuarios/${req.params.id}`)
            const userEliminado = await userClass.deleteUser(req.params.id)
            logger.info(`Se elimina user`)
            res.json(userEliminado)
        }
        catch (err) {
            logger.error(`Error al eliminar user`)
            throw err
        }
    }



}

export default UserController;




// const userController = {};

// userController.renderSignUpForm = (req, res) => {
//     res.render('users/signup');
// }

// userController.signup = (req, res) => {
//     const errors = [];
//     const { name, email, password, confirm_password } = req.body;
//     if (password !== confirm_password) {
//         errors.push({ text: 'Las contraseñas no coinciden' });
//     } 
//     if (password.length < 4) {
//         errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
//     }
//     if (errors.length > 0) {
//         res.render('partials/errors', { errors, name, email });
//     } else {
//         res.send ('ok');
//     }


//     //res.render('users/signup');
// }


// userController.renderSignInForm = (req, res) => {
//     res.render('users/signin');
// }

// userController.signIn = (req, res) => {
//     res.render('users/signin');
// }

// userController.logout = (req, res) => {
//    res.send('logout');
// }



//export default userController;