# GharBikri Frontend

<img src="./src/assets/Images/GharBikri-logos_white.png" height=100/>

## Description

This is the frontend of the GharBikri project. It is a single page application that allows users to create an account, login, and post properties for sale. It also allows users to search for properties based on location, price, and property type. It also allows users to view the details of a property and contact the seller.

## Setup

1. First follow the instructions in the [backend README](../server/README.md) to setup the backend server.

2. Create a `.env` file in the root directory of the server and add the following environment variables:

   ```bash
   VITE_CLIENT_URL=http://localhost:5173
   VITE_SERVER_URL=http://localhost:3000
   ```

   - Note: You can use any database name, user and password. Just make sure to update the `.env` file accordingly.
     Replace the variable values `<...>` with your own values.

3. Run `npm install` to install all the dependencies.
4. Run `npm run dev` to start the server

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Follow the required steps before pushing the code to the repository.

1. Run `npm run lint` to check for any linting errors.
