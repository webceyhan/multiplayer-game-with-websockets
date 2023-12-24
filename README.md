<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/webceyhan/multiplay-ball-game/actions/workflows/github-code-scanning/codeql)


<!-- LOGO (OPTIONAL) -->

<!-- <img src="./src/assets/logo.png" width="100px"> -->

 <!-- HEADER ///////////////////////////////////////////////////////////// -->

# Multiplay Ball Game using Express + Websockets

This is a multiplay ball game to demonstrate how to utilize Express + Websockets for full duplex communication written in TypeScript.

It consists of a backend server and a frontend application.

Backend server was implemented using ExpressJs to serve the compiled frontend app as static content. And the WebSocket Server starts listening to the same port to respond socket messages.

Frontend application is built with Vue 3 + Bootstrap. Client is automatically connected to the server and getting the list of available games to join from.
There is maximum of 3 players in a game. Players can join and leave the game.


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

## Deployment (Render)

Project is linked to [Render](https://render.com/) for deployment.

>It will automatically deploy the project to Render on every push.

<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [Vue.js](https://vuejs.org/)
-   [Bootstrap](https://getbootstrap.com)
-   [Express](https://expressjs.com/)
-   [WebSocket (WS)](https://github.com/websockets/ws)
