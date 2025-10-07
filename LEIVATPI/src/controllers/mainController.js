// objeto principal con todas las funciones del controlador
const mainController = {};

// importamos las dependencias necesarias
const db = require('../database/models/models/');
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

// vista de inicio de sesion
mainController.inicio = (req, res) => {
  const errors = validationResult(req);
  res.render("inicio", { errors: errors.array() });
};

// vista de registro de usuario
mainController.registro = (req, res) => {
  res.render("registro");
};

// crear nuevo usuario
mainController.crear_usuario = async (req, res) => {
  try {
    const { nombre, correo, password, curso } = req.body;
    
    await db.Persona.create({
      nombre: nombre,
      correo: correo,
      contrasena: bcrypt.hashSync(password, 12),
      curso_id: parseInt(curso)
    });
    
    res.redirect('/');
  } catch (error) {
    console.error('error al crear usuario:', error);
    res.status(500).send('error al crear el usuario');
  }
};

// iniciar sesion de usuario
mainController.iniciar_session = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const persona = await db.Persona.findOne({ where: { correo } });
    
    if (!persona) {
      return res.send("usuario no encontrado");
    }
    
    const match = await bcrypt.compare(password, persona.contrasena);
    
    if (!match) {
      return res.send("contraseña incorrecta");
    }
    
    // guardar usuario en sesion y redirigir segun tipo de usuario
    req.session.user = persona;
    
    const redirectPaths = {
      3: '/alumnado',
      2: '/admin',
      1: '/alumno'
    };
    
    return res.redirect(redirectPaths[persona.tipo_usuario_id] || '/alumno');
    
  } catch (error) {
    console.error('error al iniciar sesion:', error);
    res.status(500).send('error interno del servidor');
  }
};

// vista principal del alumno
mainController.vista_alumno = async (req, res) => {
  try {
    const user = req.session.user;
    
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
    
    return res.render("interfaz_alumno", { usuario2 });
  } catch (error) {
    console.error('error al cargar vista alumno:', error);
    res.status(500).send('error al cargar la vista');
  }
};

// vista para gestionar notas
mainController.vista_notas = async (req, res) => {
  try {
    const alumnos = await db.Persona.findAll({ where: { tipo_usuario_id: 1 } });
    const materias = await db.Materia.findAll();
    return res.render("notas", { alumnos, materias });
  } catch (error) {
    console.error('error al cargar vista notas:', error);
    res.status(500).send('error al cargar las notas');
  }
};

// guardar nueva nota
mainController.guardar_nota = async (req, res) => {
  try {
    const { nota, materia, curso, cuatrimestre, informe, nombre } = req.body;

    const alumno_encontrado = await db.Persona.findOne({
      where: { nombre, tipo_usuario_id: 1 }
    });

    if (!alumno_encontrado) {
      return res.status(404).send("alumno no encontrado");
    }

    const materia_encontrada = await db.Materia.findOne({
      where: { nombre_materia: materia }
    });

    // crear la nota si existe
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

    // obtener datos actualizados del alumno
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

    // organizar notas por materia
    usuario2.curso.materias.forEach(materia => {
      const notas_de_materia = usuario2.notas.filter(nota =>
        nota.materia_id === materia.materia_id
      );

      const organizadas = [];
      notas_de_materia.forEach(nota => {
        const index = (nota.cuatrimestre - 1) * 3 + (nota.informe - 1);
        organizadas[index] = nota;
      });

      materia.notas = organizadas;
    });

    return res.render("interfaz_alumno", { usuario2 });

  } catch (error) {
    console.error("error al guardar nota:", error);
    return res.status(500).send("error al guardar la nota");
  }
};

// vista del administrador
mainController.adminView = async (req, res) => {
  try {
    const user = req.session.user;
    
    if (!user || user.tipo_usuario_id !== 2) {
      return res.redirect('/');
    }
    
    const [alumnos, alumnados, admins] = await Promise.all([
      db.Persona.findAll({ 
        where: { tipo_usuario_id: 1 },
        attributes: ['persona_id', 'nombre', 'correo'], // QUITAR createdAt
        order: [['persona_id', 'DESC']], // ORDENAR por persona_id en lugar de createdAt
        limit: 5
      }),
      db.Persona.findAll({ 
        where: { tipo_usuario_id: 2 },
        attributes: ['persona_id', 'nombre', 'correo'], // QUITAR createdAt
        order: [['persona_id', 'DESC']], // ORDENAR por persona_id
        limit: 5
      }),
      db.Persona.findAll({ 
        where: { tipo_usuario_id: 3 },
        attributes: ['persona_id', 'nombre', 'correo'], // QUITAR createdAt
        order: [['persona_id', 'DESC']], // ORDENAR por persona_id
        limit: 5
      })
    ]);
    
    const counts = {
      alumnos: await db.Persona.count({ where: { tipo_usuario_id: 1 } }),
      alumnados: await db.Persona.count({ where: { tipo_usuario_id: 2 } }),
      admins: await db.Persona.count({ where: { tipo_usuario_id: 3 } })
    };
    res.render("admin_view", {
      alumnos,
      alumnados,
      admins,
      cantidad: counts.alumnos,           // Agregar estas variables
      cantidad_alumnados: counts.alumnados, // que espera la vista
      cantidad_admins: counts.admins,
      title: "panel de administración",
      currentPage: 'admin',
      user: user
    });
    
  } catch (error) {
    console.error('error al cargar vista admin:', error);
    // CAMBIAR 'error' por 'inicio' en esta línea:
    res.status(500).render('inicio', {
      error: 'error al cargar el panel de administración',
      title: "iniciar sesión",
      currentPage: 'inicio'
    });
  }
};
module.exports = mainController;

