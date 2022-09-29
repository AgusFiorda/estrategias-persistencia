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

//crea la tabla cars
class Users extends Sequelize.Model {}
Users.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: "users" }
);

/* crea usuario*/
sequelize
  .sync()
  .then(() =>
    Users.create({
      firstName: "Agustin",
      lastName: "Paez",
    })
  )
  .then((jane) => {
    console.log("Usuario creado con exito", jane.dataValues);
    Users.update(
      { firstName: "Jorge" },
      {
        where: {
          lastName: "Paez",
        },
      }
    )
      .then(() => {
        console.log("El usuario se actualizo con exito");
      })
      .then(() => {
        Users.findAll({
          where: {
            firstName: "Jorge",
          },
        }).then((user) => {
          console.log("El usuario es: ", JSON.stringify(user, null, 4));
        });
      });
  });
