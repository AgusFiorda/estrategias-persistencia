var express = require("express");
var router = express.Router();
var models = require("../models");
var validarToken = require("../shared/verifyToken");
var { getPagination, getPagingData } = require("../shared/pagination");

router.get("/", validarToken, (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  models.materia
    .findAndCountAll({
      attributes: ["id", "nombre", "id_carrera"],

      /////////se agrega la asociacion
      include: [
        {
          as: "Carrera-Relacionada",
          model: models.carrera,
          attributes: ["id", "nombre"],
        },
      ],
      ////////////////////////////////
      limit,
      offset,
    })
    .then((materias) => {
      const response = getPagingData(materias, page, limit);

      res.send(response);
    })
    .catch((error) => {
      return next(error);
    });
});

router.post("/", validarToken, (req, res) => {
  models.materia
    .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera })
    .then((materia) => res.status(201).send({ id: materia.id }))
    .catch((error) => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res
          .status(400)
          .send("Bad request: existe otra materia con el mismo nombre");
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findmateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ["id", "nombre"],
      where: { id },
    })
    .then((materia) => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", validarToken, (req, res) => {
  findmateria(req.params.id, {
    onSuccess: (materia) => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put("/:id", validarToken, (req, res) => {
  const onSuccess = (materia) =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra materia con el mismo nombre");
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  findmateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete("/:id", validarToken, (req, res) => {
  const onSuccess = (materia) =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findmateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
