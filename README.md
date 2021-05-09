# Mini Wallet

You can find a live instance of this project [here](https://mini-wallet.onrender.com/).

Follow the instruction below to run the project on localhost.
Make sure to run `npm install` on respective directory before running any command.

## Start the Front End

Run the following command to run the React Front End

```
cd frontend/
npm run start
```

## Start the Mock API server

A very rough implementation of the Mock API server is available inside `mock-api/` directory

Run the following commands if you prefer to run the Mock API server locally

```
npm run dev
```

Update the API_HOST variable your `frontend/.env` file

```
+ REACT_APP_API_HOST=localhost:8080
- REACT_APP_API_HOST=hidden-firefly-9843.fly.dev
```
