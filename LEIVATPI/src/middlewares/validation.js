const { body } = require('express-validator')
const bcryptjs = require('bcryptjs');
const db = require('../database/models/models/')
const validation_results = [
  body("correo")
  .notEmpty()
  .withMessage("Tiene que tener un correo para identificarse")
  .isEmail()
  .withMessage("Tiene que tener un correo valido")
  .bail(),
  body("password")
  .notEmpty()
  .withMessage("Tiene que colocar su contrseña")
  .bail()
]
module.exports = validation_results;
