# Front-End Webpack starter

```
TODO
- Create NPM package
```

> A starter Kit for front-end developer including [TailwindCss](https://tailwindcss.com/), [font-awesome](http://fontawesome.io), [Sass](http://sass-lang.com), [Pug](https://pugjs.org/), [Babel](https://babeljs.io), [webpack](http://webpack.github.io), [Jest](https://facebook.github.io/jest/)

This seed repo is a starter kit for front-end developer that needs an environment allowing them to speed up development while ensuring good practice and overall quality.

* Best practice for HTML5, CSS and JavaScript organization
* Code validation (HTML, JS, CSS)
* HTML Templating
* CSS Preprocessing

## Quick start
### Pre-requirements
* Node version >= 8 + npm
* Sass `gem install sass`

```bash
# clone the repo
git clone https://github.com/gairal/webpack-stack.git

# change directory to the repo
cd webpack-stack

# install the repo with npm
npm i

# start the server
npm start
```
go to [http://localhost:3000](http://localhost:3000) in your browser

---

# Table of Contents
* [File structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [License](#license)

## File structure
```
webpack-stack/
 ├──src/                             * our source files that will be compiled to javascript
 │   ├──index.pug                    * our index.html
 │   │
 │   ├──html/                        * where you keep your pug templates
 │   │   └──layout.pug               * the main pug layout
 │   │
 │   ├──app/                         * JavaScript/ES2015 files
 │   │
 │   ├──root/                        * files that will be copied to the root of the compiled site (robots.txt, favicon, ...)
 │   │
 │   ├──img/                         * images
 │   └──scss/                        * Sass files
 │       ├──app.scss                 * Main Sass files
 │       └──common/                  * Sass common files
 │           ├──_libs.scss           * 3rd-party libs import
 │           ├──_mixins.scss         * for you own Sass mixins here
 │           └──_variables.scss      * for your sass variables
 │
 ├──test/                            * Jest test definitions
 │
 ├──webpack/                         * Webpack configuration files
 │   ├──webpack.config.base.js       * Base config
 │   ├──webpack.config.js            * Development overrides
 │   └──webpack.config.prod.js       * Production overrides
 │
 └──package.json                     * what npm uses to manage it's dependencies
```
## Getting Started
### Dependencies
You need to install the following on you system
* `node` and `npm` (`brew install node`)
* Ensure you running Node version >= 8.0.0
* ruby (`brew install ruby`)

Then install tools you'll need to run the app
* sass (`gem install sass`)

### Installing
* `fork` this repo
* `clone` your fork
* `npm i` to install all dependencies
* `make start` or `npm start` to start the dev server

### Running the app
After all dependencies are installed, just run `make start` to start a local server using `webpack-dev-server` which will watch your files and build them.
webpack-dev-server will display the address and port of your server (by default, `http://0.0.0.0:3000`).

## Build commands
### Server
```bash
# build files then launch the server and watch files
make start
```
### Build files
```bash
# build files in ./build/ (Webpack, Sass, Pug) and validate them
make build
# "compile" files in ./dist/
# minify and concatenate every css and js including
# Optimize images compression
# Site ready for production
make release
```
### Validate files
```bash
# runs the validations htmlhint, csslint, sasslint, TsLint
make test
```

## License
[MIT](/LICENSE.md)
