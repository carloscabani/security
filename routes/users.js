var express = require('express');
var router = express.Router();

/* 1. Importe el módulo crypto */
let crypto = require('crypto');
/* 2. Instanciación del modelo */
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    /* 3. Uso del método findAll */
    let usersCollection = await models.users.findAll({
      /* 3.1. Including everything */
      include: { all: true, nested: true },
      /* 3.2. Raw Queries */
      raw: true,
      nest: true,
    });

    /* Obtén la colección de roles */
    let rolesCollection = await models.roles.findAll({
      raw: true,
    });

    /* 4. Paso de parámetros a la vista */
    res.render('crud', {username: req.cookies['username'], title: 'CRUD of users', usersArray: usersCollection, rolesArray: rolesCollection });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

/* POST user. */
/* 2. Cree el callback asíncrono que responda al método POST */
router.post('/', async (req, res) => {
  /* 3. Desestructure los elementos en el cuerpo del requerimiento */
  let { name, password, idrole } = req.body;

  try {
    /* 4. Utilice la variable SALT para encriptar la variable password. */
    let salt = process.env.SALT;
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    let passwordHash = salt + "$" + hash;

    /* 5. Guarde el registro mediante el método create */
    let user = await models.users.create({ name: name, password: passwordHash });

    /* Relaciona el usuario con el rol */
    await models.users_roles.create({ users_iduser: user.iduser, roles_idrole: idrole });

    /* 6. Redireccione a la ruta con la vista principal '/users' */
    res.redirect('/users');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
