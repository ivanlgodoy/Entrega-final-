-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-08-2025 a las 21:02:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `charliDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `curso_id` int(11) NOT NULL,
  `nombre_curso` varchar(100) NOT NULL,
  `orientacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`curso_id`, `nombre_curso`, `orientacion`) VALUES
(25, '7mo 1ra', 'Tecnica'),
(26, '7mo 2da', 'Tecnica'),
(27, '7mo 3ra', 'Tecnica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_materia`
--

CREATE TABLE `curso_materia` (
  `curso_materia_id` int(11) NOT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `materia_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso_materia`
--

INSERT INTO `curso_materia` (`curso_materia_id`, `curso_id`, `materia_id`) VALUES
(1, 25, 1),
(2, 25, 2),
(3, 25, 3),
(4, 25, 4),
(5, 25, 5),
(6, 25, 6),
(7, 25, 7),
(8, 25, 8),
(9, 25, 9),
(10, 25, 10),
(11, 26, 1),
(12, 26, 2),
(13, 26, 3),
(14, 26, 4),
(15, 26, 5),
(16, 26, 6),
(17, 26, 7),
(18, 26, 8),
(19, 26, 9),
(20, 26, 10),
(21, 27, 1),
(22, 27, 2),
(23, 27, 3),
(24, 27, 4),
(25, 27, 5),
(26, 27, 6),
(27, 27, 7),
(28, 27, 8),
(29, 27, 9),
(30, 27, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `materia_id` int(11) NOT NULL,
  `nombre_materia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`materia_id`, `nombre_materia`) VALUES
(1, 'matematicas septimo'),
(2, 'ingles tecnico septimo'),
(3, 'marco juridico y derechos del trabajo'),
(4, 'asistencia 2'),
(5, 'autogestion'),
(6, 'hardware 4'),
(7, 'practicas profesionalizantes 2'),
(8, 'programacion'),
(9, 'redes 3'),
(10, 'arduino 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `nota_id` int(11) NOT NULL,
  `persona_id` int(11) DEFAULT NULL,
  `materia_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `nota` decimal(5,2) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `informe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`nota_id`, `persona_id`, `materia_id`, `curso_id`, `nota`, `cuatrimestre`, `informe`) VALUES
(60, 33, 6, 25, 6.00, 1, 1),
(61, 31, 4, 26, 5.00, 1, 1),
(62, 33, 4, 25, 9.00, 1, 1),
(63, 31, 9, 26, 6.00, 1, 1),
(64, 31, 1, 26, 4.00, 1, 1),
(65, 31, 1, 26, 9.00, 1, 2),
(66, 31, 1, 26, 9.00, 2, 1),
(67, 35, 6, 26, 6.00, 1, 1),
(68, 29, 1, NULL, 2.00, 1, 1),
(69, 29, 1, NULL, 2.00, 1, 1),
(70, 29, 1, NULL, 2.00, 1, 1),
(71, 29, 1, NULL, 2.00, 1, 1),
(72, 29, 1, NULL, 2.00, 1, 1),
(73, 29, 1, NULL, 2.00, 1, 1),
(74, 29, 1, NULL, 3.00, 1, 1),
(75, 29, 1, NULL, 3.00, 1, 1),
(76, 29, 1, NULL, 3.00, 1, 1),
(77, 29, 1, NULL, 3.00, 1, 1),
(78, 29, 1, NULL, 2.00, 1, 1),
(79, 29, 1, NULL, 4.00, 2, 1),
(80, 29, 1, NULL, 4.00, 2, 1),
(81, 29, 1, NULL, 4.00, 2, 1),
(82, 29, 1, NULL, 4.00, 2, 1),
(83, 31, 1, NULL, 4.00, 2, 1),
(84, 31, 1, 26, 7.00, 2, 1),
(85, 31, 1, NULL, 7.00, 2, 1),
(86, 31, 1, NULL, 7.00, 2, 1),
(87, 31, 1, 7, 7.00, 2, 1),
(88, 31, 1, 7, 7.00, 2, 1),
(89, 31, 1, 7, 2.00, 2, 1),
(90, 31, 1, 7, 2.00, 2, 1),
(91, 32, 1, 7, 2.00, 1, 1),
(92, 32, 1, 7, 2.00, 1, 1),
(93, 32, 1, 7, 2.00, 1, 1),
(94, 31, 1, 6, 2.00, 1, 1),
(95, 33, 1, 7, 8.00, 2, 2),
(96, 33, 1, 7, 8.00, 2, 2),
(97, 31, 1, 26, 3.00, 1, 1),
(98, 31, 1, 26, 3.00, 2, 2),
(99, 37, 1, 26, 3.00, 2, 2),
(100, 37, 1, 26, 3.00, 2, 2),
(101, 37, 8, 26, 4.00, 2, 2),
(102, 37, 8, 26, 4.00, 2, 2),
(103, 37, 8, 26, 4.00, 2, 2),
(104, 37, 8, 26, 4.00, 2, 2),
(105, 37, 8, 26, 4.00, 2, 2),
(106, 37, 8, 26, 4.00, 2, 2),
(107, 37, 8, 26, 4.00, 2, 2),
(108, 37, 8, 26, 4.00, 2, 2),
(109, 37, 8, 26, 4.00, 2, 2),
(110, 35, 6, 26, 5.00, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `persona_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `tipo_usuario_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`persona_id`, `nombre`, `correo`, `contrasena`, `tipo_usuario_id`, `curso_id`, `foto_perfil`) VALUES
(29, 'matias fernandez', 'fernandez@gmail.com', '$2b$10$ETvbV1DW2DhFgLsfwhvJxuaJdjP9jnHwIGxriJ7jOLqcvmxweo/si', 3, 25, NULL),
(31, 'Ramiro Aquino', 'Rama@gmail.com', '$2b$10$ttEwaVvTk9UjRXHRra1px.s/5zARFnnhBm2oYyKqOrYpGd6PWSM4u', 1, 26, NULL),
(32, 'Alan Peralta', 'Peralta@gmail.com', '$2b$10$mdZQY1g4QdKJYO9Px5lwPO3opIMzKbxItuLu8RoksBxZQKF/fMV2O', 1, 26, NULL),
(33, 'Gonzalo Forneron', 'Forneron@gmail.com', '$2b$10$nM1vh86uoC0MlnvBS1QKu.DoeeAlYh7iW351nWNp8IyMtBsHUAGEm', 1, 25, NULL),
(34, 'Axel Armella', 'Axel@gmail.com', '$2b$10$u1nQCTlWHlmQh.OTlCfeKu.A9cloEEIMVqhoNcBH1cttkuA09JHZa', 1, 26, NULL),
(35, 'Joaquin Orona', 'joa@gmail.com', '$2b$10$iD9lymMW8ls3R6eBGnXtAeCEETgo3KcRzQgijXXUTHgcNQVGuEeR6', 1, 26, NULL),
(37, 'elcharli', 'elcharli@gmail.com', '$2b$12$GR/Lr14y847YHbQsZamFo.Jz9tCRDuzUMn.DN.Sv78HOampnk9pfe', 1, 26, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipo_usuario_id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipo_usuario_id`, `rol`) VALUES
(1, 'alumno'),
(2, 'administrador'),
(3, 'alumnado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`curso_id`);

--
-- Indices de la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  ADD PRIMARY KEY (`curso_materia_id`),
  ADD KEY `curso_id` (`curso_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materia_id`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`nota_id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`persona_id`),
  ADD KEY `curso_id` (`curso_id`),
  ADD KEY `tipo_usuario_id` (`tipo_usuario_id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipo_usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `curso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  MODIFY `curso_materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `nota_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `persona_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipo_usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso_materia`
--
ALTER TABLE `curso_materia`
  ADD CONSTRAINT `curso_materia_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curso_id`),
  ADD CONSTRAINT `curso_materia_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`materia_id`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curso_id`),
  ADD CONSTRAINT `persona_ibfk_2` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`tipo_usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
