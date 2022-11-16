# Estrategias de persistencia

## Instalación

Para ejecutar localmente debe ejecutar:

> Recuerde tener levantado una base de datos MySql con la siguiente [configuración](https://github.com/AgusFiorda/estrategias-persistencia/blob/feature/clase-8/api/config/config.json).

```bash
npm install
```

> Este comando se utiliza para instalar paquetes y dependencias del proyecto.

```bash
DEBUG=api:* npm start
```

> Para levantar localmente el proyecto en el puerto 3001

Una vez levantado el proyecto puede utilizar [Postman](https://www.postman.com/) para realizar los request:

## Pruebas locales

Para poder ejecutar las peticiones debe contar con el header `jwt-token`.
El cual lo puede solicitar a través de este endpoint

```bash
http://localhost:3001/jwt/generateToken
```

> Recuerde que este token tiene una validez de 30 min. Pasado este tiempo debe volver a generarlo.

![image](https://user-images.githubusercontent.com/62823762/193472973-a5f52e24-2c07-437a-9424-c582bca814f4.png)

- También puede consultar la validéz del token mediante este endpoint:

```bash
http://localhost:3001/jwt/validateToken
```

![image](https://user-images.githubusercontent.com/62823762/193471779-a2493d34-3084-4787-ab69-95165f7afa93.png)

- Una vez solicitado el token ya puede comenzar a probar los request por ejemplo:
  ![image](https://user-images.githubusercontent.com/62823762/193472085-7f408c0c-9d07-48c6-a55f-a76c265aa268.png)
