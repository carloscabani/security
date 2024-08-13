var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET token listing. */
router.get('/', async function (req, res, next) {
  try {
    const tokenData = {
      info: 'this is sensitive data'
    };
    const secretKey = process.env.TOKEN_SECRET;
    const jwtToken = jwt.sign(tokenData, secretKey, {
      expiresIn: '1h'
    });
    res.render('token', { title: 'Pagina de token', token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;