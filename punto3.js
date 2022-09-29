const Sequelize = require("sequelize");
const mysql = require("mysql2");

const nameDb = "prueba";

const sequelize = new Sequelize(`${nameDb}`, "root", "root", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  //autentica las credenciales a la base de datos
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//crea la tabla Users
class Users extends Sequelize.Model {}
Users.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: "users" }
);

let nombres = ["agustin", "federico", "tomas", "melody", "monica"];
let apellidos = ["fiordalisi", "puig", "eloy", "such", "lera"];
/* crea usuario*/
sequelize
  .sync()
  .then(() => {
    for (let index = 0; index < 5; index++) {
      Users.create({
        firstName: nombres[index],
        lastName: apellidos[index],
      });
    }
  })
  .then(() => {
    for (let index = 0; index < nombres.length; index++) {
      Users.update(
        { firstName: "modificado" },
        {
          where: {
            lastName: apellidos[index],
          },
        }
      );
    }
    console.log("Usuarios actualizados con exito");
  });
