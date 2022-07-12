import { Router } from "express";
import logger from '../utils/loggers.js'
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import allProducts from "../services/listProductsOnDB.js";
const listProductsOnDB = allProducts;
//import { upload } from "../middlewares/upload.js";

import multer from "multer";
//const upload = multer({ dest: "uploads/Users" }); >>>> pasa al código de abajo
const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });

import sharp from "sharp";
import fs from "fs";
// sharp = sharp.load({
//   allowOverwrite: true,
//   failOnError: false
// });






const routeUser = Router();

/*============================[Rutas API: /]============================*/
routeUser

  .get('/productos', isAuth, (req, res) => {
    if (req.user.username) {
      const nombre = req.user.username
      const email = req.user.email
      const id = req.user._id
      const imagen = req.user.image
      // if (imagen) {
      //   sharp(imagen)
      //     .resize(200, 200)
      //     .toBuffer()
      //     .then(data => {
      //       res.json({
      //         nombre: nombre,
      //         email: email,
      //         id: id,
      //         imagen: data
      //       });
      //     }).catch(err => {
      //       logger.error(err);

      //     });
      //   }
      // const processImage = sharp(imagen.buffer)
      //   .resize(200, 200) 
      //   .toBuffer()
      //   .then(data => {
      //     res.json({
      //       nombre: nombre,
      //       email: email,
      //       id: id,
      //       imagen: data
      //     });
      //   }).catch(err => {
      //     logger.error(err);
      //   }
      //   );




      logger.info(`Se registra petición GET /productos por ${nombre}`)
      res.render('products', { listProductsOnDB, nombre, email, id, imagen })
    } else {
      logger.info(`Se registra petición GET /productos pero no esta autenticado, se redirige a /login`)
      res.redirect('/login')
    }
  })

  .get('/', (req, res) => {
    if (req.session.username) {
      const nombre = req.user.username
      const email = req.user.email
      logger.info(`Se registra petición GET / ${nombre} ${email}`)
      res.render('ingreso', { listProductsOnDB, nombre, email })
    } else {
      logger.info(`Se registra petición GET / pero no esta autenticado, se redirige a /login`)
      res.redirect('/login')
    }
  })

  .get('/login', (req, res) => {
    logger.info(`Se registra petición GET /login`)
    res.render('login');
  })

  .post('/login', passport.authenticate('login',
    { failureRedirect: '/login-error' }), (req, res) => {
      logger.info(`Se registra petición POST /login`)
      res.render('ingreso', { listProductsOnDB, nombre: req.user.username, email: req.user.email, image: req.user.image })
    })

  .get('/login-error', (req, res) => {
    logger.info(`Se registra petición GET /login-error`)
    res.render('login-error');
  })

  .get('/registro', (req, res) => {
    logger.info(`Se registra petición GET /registro`)
    res.render('registro');
  })

  .post('/registro', upload.single('image'), passport.authenticate('signup',
    { failureRedirect: '/registro-error' }), (req, res) => {
      logger.info(`Se registra petición POST /registro`)
      res.redirect('/login')
    })

  .post('/imagen', upload.single('image'), async function (req, res) {
    logger.info(`Se registra petición POST /imagen`)
    const image = req.file;
    console.log(image);
    const processImage = sharp(image.buffer)
    const data = await processImage.resize(200, 200).toBuffer();

    fs.writeFileSync(`newRoute/Users/${image.originalname}`, data);

      

    }
    )



  .get('/logout', isAuth, (req, res) => {
    const nombre = req.user.username
    req.session.destroy((err) => {
      if (!err) {
        logger.info(`Se registra petición GET /logout por ${nombre}`)
        res.render('logout', { nombre });
      } else {
        logger.error(`Error al cerrar sesión por ${nombre}`)
        res.json(err);
      }
    })
  })

export default routeUser;
