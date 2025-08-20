const db = require("../database/models/models/");
async function alumnado_validation(req,res,next) {
  const alumnado = await db.Persona.findAll({where: {tipo_usuario_id: 3}});
  if (alumnado.tipo_usuario_id != 3 && !req.session.user) {
    return res.redirect("/");
  };
  next();
};
module.exports = alumnado_validation;
