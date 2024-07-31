var express = require('express');
var router = express.Router();


/* GET token listing. */
router.get('/', async function (req, res, next) {
  try {
    res.render('token', { title: 'Pagina de token' });
} catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
