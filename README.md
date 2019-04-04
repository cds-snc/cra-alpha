# CRA Alpha

This is a small frontend to trial user flows for a future CRA service that will help Canadians receive the benefits to which they are entitled.

It's a server-side [express](https://expressjs.com/) application using [htm](https://github.com/developit/htm) to render out JSX-style components on the server.

## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

`npm` will complain if you're not on node version `v10.15.0` or higher when you boot up the app.

### [Install `docker`](https://docs.docker.com/install/)

A docker container allows a developer to package up an application and all of its parts. This means we can build an app in any language, in any stack, and then run it anywhere — whether locally or on a server.

## Build and run with npm

Guess what? There is **no build step**. Just install the dependencies and run it.

Pretty slick. 😎

```bash
# install dependencies
npm install

# run application in 'dev' mode
npm start

# run application in 'prod' mode
npm start
```

The app should be running at [http://localhost:3000/](http://localhost:3000/). With `npm run dev`, saving a file will restart the server automatically.

On a Mac, press `Control` + `C` to quit the running application.

### Run tests with npm

```bash
# run unit tests
npm test

# run linting
npm run lint
```

## Build and run as a Docker container

```bash
# build an image locally
docker build -t cdssnc/cra-alpha .

# run the container
docker run -it -p 3000:3000 cdssnc/cra-alpha
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.
