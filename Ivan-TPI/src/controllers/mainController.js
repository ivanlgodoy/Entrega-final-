// creamos un objeto donde van todas nuestras funciones
const mainController = {};
// llamamos a la base de datos, y importamos los modelos
const db = require('../database/models/models/');
// importamos bcrypt para encriptar nuestras contraseñas
const bcrypt = require('bcryptjs');
mainController.inicio = (req, res) => {
  // solo renderiza la vista del inicio
  const {validationResult} = require("express-validator");
  let errors = validationResult(req);
  res.render("inicio",{errors: errors.array()});
};
mainController.registro = (req, res) => {
  // solo renderiza la vista del registro
  res.render("registro")
};
mainController.crear_usuario = async (req, res) => {
  // Saca los datos del formulario, segun el campo,
  // y los saca directamente de req.body que es donde estan todos los datos;
  const { nombre, correo, password, curso } = req.body;
  // usamos el await y llamamos al modelo Persona para crear un usuario nuevo
  // y segun el nombre de la columna se le asigna el dato correspondiente
  await db.Persona.create({
    nombre: nombre,
    correo: correo,
    // usamos la libreria bcrypt para encriptar las contraseñas
    // y el numero 12 es por que es un HASH de 12 caracteres
    contrasena: await bcrypt.hashSync(password, 12),
    // como el formulario nos envia los datos en strings
    // usamos la funcion parseInt para convertir esa cadena a un numero
    curso_id: parseInt(curso)
  });
  // despues de crear el usuario, lo redirije a la vista de iniciar session
  res.redirect('/');
};
mainController.iniciar_session = async (req, res) => {
  try {
    // extraemos los datos del formulario, osea solo correo y contraseña
    const { correo, password } = req.body;
    // guardamos en una variable los resultados de las validaciones
    const persona = await db.Persona.findOne({ where: { correo } });
    // si hay errores de validacion, renderizamos la vista con los errores
    if (!persona) {
      return res.send("Persona no encontrada");
    };
    // si no se encuentra al alumno, mostramos un mensaje de error
    const match = await bcrypt.compare(password,persona.contrasena);
    if (!match) {
      return res.send("Contraseña incorrecta");
    };
    if (persona.tipo_usuario_id === 3) {
      req.session.user = persona;
      return res.redirect('/alumnado');
    };
    if (persona.tipo_usuario_id === 2) {
      req.session.user = persona;
      return res.redirect("/admin");
    };
    req.session.user = persona;
    return res.redirect("/alumno");
  } catch (err) {
    // mostramos el error en consola si ocurre algun problema
    console.error('error al comparar las contraseñas: ', err);
    res.status(500).send('error interno del servidor');
  }
};
mainController.vista_alumno = async (req, res) => {
  // solo renderiza la vista del alumno
  user = req.session.user;
  const usuario2 = await db.Persona.findOne({
  where: { persona_id: user.persona_id },
    include: [{
      model: db.Curso,
      as: 'curso',
      attributes: ['nombre_curso'],
      include: [{
        model: db.Materia,
        as: 'materias',
        include: [{
          model: db.Nota,
          as: 'notas',
          where: { persona_id: user.persona_id },
          attributes: ['nota', 'persona_id', 'cuatrimestre', 'informe'],
          required: false
        }]
      }]
    }]
  });
  return res.render("interfaz_alumno",{usuario2})
};
mainController.vista_notas = async (req,res) => {
  const alumnos = await db.Persona.findAll({where: {tipo_usuario_id: 1}});
  const materias = await db.Materia.findAll();
  return res.render("notas",{alumnos,materias});
};
mainController.vista_nota = async (req,res) => {
  const alumno = req.session.user;
};
mainController.guardar_nota = async (req, res) => {
  const { nota, materia, curso, cuatrimestre, informe, nombre } = req.body;

  try {
    const alumno_encontrado = await db.Persona.findOne({
      where: { nombre, tipo_usuario_id: 1 }
    });

    if (!alumno_encontrado) {
      return res.status(404).send("Alumno no encontrado");
    }

    req.app.locals.alumno = alumno_encontrado;

    const materia_encontrada = await db.Materia.findOne({
      where: { nombre_materia: materia }
    });

    // Crear la nota si existe en el formulario
    if (nota) {
      await db.Nota.create({
        persona_id: alumno_encontrado.persona_id,
        materia_id: materia_encontrada.materia_id,
        curso_id: parseInt(curso),
        nota: parseFloat(nota),
        cuatrimestre: parseInt(cuatrimestre),
        informe: parseInt(informe),
      });
    }

    // Traer al usuario con curso, materias y notas
    const usuario2 = await db.Persona.findOne({
      where: { persona_id: alumno_encontrado.persona_id },
      include: [
        {
          model: db.Curso,
          as: 'curso',
          include: [{
            model: db.Materia,
            as: 'materias'
          }]
        },
        {
          model: db.Nota,
          as: 'notas',
          include: [
            { model: db.Materia, as: 'materia' },
            { model: db.Curso, as: 'curso' }
          ]
        }
      ]
    });

    // Organizar las notas dentro de cada materia
    usuario2.curso.materias.forEach(materia => {
      // Filtrar notas de esta materia para este alumno
      const notas_de_materia = usuario2.notas.filter(nota =>
        nota.materia_id === materia.materia_id
      );

      // Organizar en array [0-5]
      const organizadas = [];

      notas_de_materia.forEach(nota => {
        const index = (nota.cuatrimestre - 1) * 3 + (nota.informe - 1);
        organizadas[index] = nota;
      });

      materia.notas = organizadas;
    });

    return res.render("interfaz_alumno", { usuario2 });

  } catch (error) {
    console.error("Error en guardar_nota:", error);
    return res.status(500).send("Error al guardar la nota");
  }
};
mainController.adminView = async (req,res) => {
  const alumnos = await db.Persona.findAll({where: {tipo_usuario_id: 1}});
  const alumnados = await db.Persona.findAll({where: {tipo_usuario_id: 2}});
  const admins = await db.Persona.findAll({where: {}});
  let cantidad = alumnos.length;
  let cantidad_alumnados = alumnados.length;
  let cantidad_admins = admins.length;
  res.render("admin_view",{alumnos,cantidad_admins,cantidad_alumnados,cantidad,alumnados,admins});
}
module.exports = mainController
