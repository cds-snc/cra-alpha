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
npm run dev

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

## Resources

As previously mentioned, this is a server-side [express](https://expressjs.com/) application using [htm](https://github.com/developit/htm) to render out JSX-style components on the server. Using htm as the view library is fairly cutting-edge, but otherwise this is a standard express application.

### express

[express](https://expressjs.com/) is a Node.js web application framework that provides a robust set of features for web and mobile applications.

- [The official express docs](https://expressjs.com/en/starter/installing.html) are a pretty good place to start
- To see some example code, run [the express app generator](https://expressjs.com/en/starter/generator.html) to bootstrap a conventional demo application
- Express is the most popular JavaScript-based web-framework so there are plenty of online tutorials and blog posts (for example, [here is one by Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs))

### es6

[ES6](https://www.makeuseof.com/tag/es6-javascript-programmers-need-know/) refers to version 6 of the ECMA Script programming language. It is a major enhancement to the JavaScript language, and adds many more features intended to make large-scale software development easier. Primarily, you should be familiar with **arrow function syntax**, **objects destructuring**, and **tagged template literals**.

[ES6 features](https://caniuse.com/#search=es6) are not supported by older browsers (eg, all versions of Internet Explorer), but, since we are only sending HTML to the browser, we don't need to worry about browser compatibility.

- [ES6: The Right Parts](https://www.pluralsight.com/courses/es6-the-right-parts) by Kyle Simpson is a great set of tutorials if you have access to it.
- [Arrow functions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Object destructuring on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Tagged Template literals on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)


### htm

[Hyperscript Tagged Markup](https://github.com/developit/htm): JSX alternative using standard tagged templates, with compiler support.

This application uses htm as a templating language. htm allows us to write components which are compiled on the server and served as HTML to the browser.

Components allow us to group related markup and CSS together, and the JSX-like syntax is a clean way to write self-contained slices of interface. Dedicated documentation for htm is fairly sparse, but if you understand [ES6 template literals](- [Tagged Template literals on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)) and are familiar with [JSX](https://reactjs.org/docs/introducing-jsx.html), then you're 95% of the way there.

- [htm on GitHub](https://github.com/developit/htm)
- [htm server-side demo by @timarney](https://github.com/timarney/htm-ssr-demo)
- [htm server-side demo by @pcraig3](https://github.com/pcraig3/az-htm)

### JSX

[JSX](https://www.reactenlightenment.com/react-jsx/5.1.html) is an XML/HTML-like syntax used by React that extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript/React code. The syntax is intended to be used by preprocessors JSX syntax back into standard JavaScript so that browsers understand it.

In this application, we're not using JSX proper. Intead, we're using htm, which transforms JSX-like syntax into parseable HTML. However, understanding JSX is important for building out the views for this application.

- [Introducing JSX on ReactJS.org](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth on ReactJS.org](https://reactjs.org/docs/jsx-in-depth.html)

### jest

[Jest](https://jestjs.io/en/) is a super-popular JavaScript unit testing framework. Once we render our components, we can use Jest to make assertions about their content and HTML attributes. [Jest's official documentation](https://jestjs.io/docs/en/getting-started) gives a good overview.


### VSCode

[VSCode](https://code.visualstudio.com/) is a general purpose, highly configurable code editor by Microsoft. It isn't as chunky as a full-fledged IDE (eg, [WebStorm](https://www.jetbrains.com/webstorm/)) but it can be extended with plugins ("Extensions") for additional functionality. There are concise VSCode tutorials for both [JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript) and [Node.js](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial) to get familiarized with some of the editor's features.

I would recommend starting off with VSCode, turning on "Format On Save", and installing the following extensions:

- [ESLint](https://marketplace.visualstudio.com/itemdetails?itemName=dbaeumer.vscode-eslint)
- [lit-html](https://marketplace.visualstudio.com/itemdetails?itemName=bierner.lit-html)
- [Prettier — Code formatter](https://marketplace.visualstudio.com/itemdetails?itemName=esbenp.prettier-vscode)
- [Docker](https://marketplace.visualstudio.com/itemdetails?itemName=PeterJausovec.vscode-docker)
