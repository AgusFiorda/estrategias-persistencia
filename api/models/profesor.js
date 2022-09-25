"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    "profesor",
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      dni: DataTypes.BIGINT,
      id_materia: DataTypes.INTEGER,
    },
    {}
  );
  profesor.associate = function (models) {
    // associations can be defined here
    profesor.belongsTo(
      models.materia, // modelo al que pertenece
      {
        as: "Materia-Relacionada", // nombre de mi relacion
        foreignKey: "id_materia", // campo con el que voy a igualar
      }
    );
    /////////////////////
  };
  return profesor;
};
