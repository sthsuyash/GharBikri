# GharBikri Server

<img src="../client/src/assets/Images/GharBikri-logos_white.png" height=100>

## Description

This is the backend server for the GharBikri app. It is built using Node.js, Express.js and PostgreSQL for database. It also uses JWT for authentication and authorization.

## Installation

1. Install [Node.js](https://nodejs.org/en/download/) for backend server
2. Install [PostgreSQL](https://www.postgresql.org/download/) for database

## Setup

1. Create a database in PostgreSQL
2. Create a `.env` file in the root directory of the server and add the following environment variables:

   ```bash
   DB_PORT=<postgres-port-number> # default is 5432
   DB_NAME=<database-name> # gharbikri
   DB_USER=<database-user> # default is postgres
   DB_PASSWORD=<your-pg-password>
   DB_HOST=localhost
   SERVER_PORT=<backend-port> # default is 3000
   JWT_SECRET=<any-secret>
   ```

   - Note: You can use any database name, user and password. Just make sure to update the `.env` file accordingly.
     Replace the variable values `<...>` with your own values.

3. Run `npm install` to install all the dependencies.
4. Run `npm run dev` to start the server

## API Documentation

The API documentation can be found [here](https://documenter.getpostman.com/view/20437995/2s93Xx1jMS).

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
