<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/codeql-analysis.yml)
[![Deploy to Heroku](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/heroku.yml/badge.svg)](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/heroku.yml)

<!-- LOGO (OPTIONAL) -->

<img src="./src/assets/logo.png" width="100px">

 <!-- HEADER ///////////////////////////////////////////////////////////// -->

# Multiplay Ball Game using Express + Websockets

This is a multiplay ball game to demonstrate how to utilize Express + Websockets for full duplex communication written in TypeScript.

It consists of a backend server and a frontend application.

Backend server was implemented using ExpressJs to serve the compiled frontend app as static content. And the WebSocket Server starts listening to the same port to respond socket messages.

Frontend application is built with Vue 3 + Bootstrap. Client is automatically connected to the server and getting the list of available games to join from.
There is maximum of 3 players in a game. Players can join and leave the game.

[View Demo](https://webceyhan-chat-app.herokuapp.com/) |
[Report Issue](https://github.com/webceyhan/multiplay-ball-game/issues) |
[Request Feature](https://github.com/webceyhan/multiplay-ball-game/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

<br>
<!-- REQUIREMENTS /////////////////////////////////////////////////////// -->

## Requirements

You need to install the [Node.js](https://nodejs.dev/)
and `npm` package manager first.

> Recommended IDE:
> [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

<br>
<!-- INSTALLATION //////////////////////////////////////////////////////// -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/multiplay-ball-game.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd multiplay-ball-game
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```

<br>
<!-- USAGE /////////////////////////////////////////////////////////////// -->

## Usage

You can use following commands to do various task with the project.

```sh
npm start               # run application
npm run dev             # start watching backend server
npm run build           # build for production
```

> Take a look at the other scripts in [`package.json`](./package.json)

<br>
<!-- DEVELOPMENT ///////////////////////////////////////////////////////// -->

## Development

You should start development server for backend which will be compiled from TypeScript on every change.

```sh
npm run dev
```

<br>
<!-- BUILDING //////////////////////////////////////////////////////////// -->

## Building

Build the backend server for production.

```sh
npm run build
```

<br>
<!-- DEPLOYMENT ////////////////////////////////////////////////////////// -->

## Deployment (Heroku)

A GitHub Action will automatically deploy the project to Heroku on every push. 
> See the details in [.github/workflows/heroku.yml](./.github/workflows/heroku.yml)

1. Create an [Heroku](https://www.heroku.com/home) account.

2. Install the `heroku-cli` as shown in the [guide](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli).

3. Create a new Heroku app inside the project folder to bind it.

    ```sh
    heroku create
    ```

    > This will create a new application on Heroku server and bind it to your project by adding a remote `heroku` upstream to your git repository.

4. Set the following secrets on your Github repository:
    ```sh
    HEROKU_API_KEY
    HEROKU_APP_NAME
    HEROKU_EMAIL
    ```

<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [Vue.js](https://vuejs.org/)
-   [Bootstrap](https://getbootstrap.com)
-   [Express](https://expressjs.com/)
-   [WebSocket (WS)](https://github.com/websockets/ws)
-   [GitHub Actions](https://docs.github.com/en/actions)
    -   [Heroku](https://www.heroku.com)
    -   [heroku-deploy](https://github.com/akhileshns/heroku-deploy@)
