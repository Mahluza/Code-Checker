# Patterns

1. Using Model View Controller Pattern for the Project. View is being implemented as a seperate service. So the server holds Models and Controller portion.
2. Builder Pattern to create models whenever needed.
3. Factory Pattern to swtich hashing/encryption technique.
4. Singleton Pattern to maintain a single instance of Project for Tsmorph, Director to maintain all users

# References

1. https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
2. https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

# server

Project scaffold for server

This is a customized Typescript 3.9 project starter which includes the following features:

- Webpack bunding
- Webpack bundle analyzer
- Unit test with Mocha/Chai/Sinon
- Coverage report with nyc
- TSLint Html Report
- Code Duplicity Html Report (with git integration)
- Documentation with Typedoc

## Running the code

Run _`npm run start`_ to execute the code.  
This command will first build the project using _`npm run build`_ (see below).  
Then, the the generated code will be executed as _`node dist/server.js`_.  
_Note:_ Entry point for project is set to index.ts.

## Build the code

Run _`npm run build`_ to build the project with [Webpack](https://webpack.js.org/).  
The build artifacts will be stored in the `dist/` directory.  
To execute the code, run _`node dist/server.js`_.  
_Note:_ Entry point for project is set to index.ts.

## Running unit tests

Run _`npm run mocha`_ to execute the unit tests via [Mocha](https://mochajs.org/)/[Chai](https://www.chaijs.com/)/[Sinon](https://sinonjs.org/).  
Note: CLI output only, no files generated.

## Generate Code coverage Report for unit tests

Run _`npm run test`_ to generate unit test coverage report using [nyc](https://github.com/istanbuljs/nyc).  
Report location: `reports/coverage`.

## Generate Webpack Bundle Analysis Report

Run _`npm run build:analysis`_ to generate Webpack bundle Analysis report using [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).  
Report location: `reports/build-analysis`.

## Generate TSLint Html Report

Run _`npm run lint`_ to generate a json and html lint report using [TSLint-Html-report](https://www.npmjs.com/package/tslint-html-report).  
Report location: `reports/tslint-html-report`

## Generate Code-Duplicity Report

Run _`npm run jscpd`_ to generate a json and html duplicity report using [JSCPD-Html-report](https://www.npmjs.com/package/jscpd-html-reporter).  
Report location: `reports/code-duplicity`

## Generate Documentation

Run _`npm run docs`_ to generate documentation for the code using [Typedoc](https://typedoc.org/).  
Information for Params and Returns of functions is generated automatically.  
Use JSDoc comment format to provide description for functions:

```Javascript
  /**
   * This is the description for my method
   * */
```

Report location: `documentation`
