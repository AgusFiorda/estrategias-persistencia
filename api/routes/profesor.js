var express = require("express");
var router = express.Router();
var models = require("../models");
var validarToken = require("../shared/verifyToken");

router.get("/", validarToken, (req, res, next) => {
  models.profesor
    .findAll({
      attributes: ["id", "nombre", "apellido", "dni"],

      /////////se agrega la asociacion
      include: [
        {
          as: "Materia-Relacionada",
          model: models.materia,
          attributes: ["id", "nombre"],
        },
      ],
      ////////////////////////////////
    })
    .then((profes) => res.send(profes))
    .catch((error) => {
      return next(error);
    });
});

router.post("/", validarToken, (req, res) => {
  models.profesor
    .create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      id_materia: req.body.id_materia,
    })
    .then((profe) => res.status(201).send({ id: profe.id }))
    .catch((error) => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res
          .status(400)
          .send("Bad request: existe otro profesor con el mismo nombre");
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findProfe = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["id", "nombre", "apellido"],
      where: { id },
    })
    .then((profe) => (profe ? onSuccess(profe) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", validarToken, (req, res) => {
  findProfe(req.params.id, {
    onSuccess: (profe) => res.send(profe),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put("/:id", validarToken, (req, res) => {
  const onSuccess = (profe) =>
    profe
      .update(
        { nombre: req.body.nombre, apellido: req.body.apellido },
        { fields: ["nombre", "apellido"] }
      )
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra profesor con el mismo nombre");
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  findProfe(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete("/:id", validarToken, (req, res) => {
  const onSuccess = (profe) =>
    profe
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfe(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
