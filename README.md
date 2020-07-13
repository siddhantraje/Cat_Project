# CatProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.12.

The project is single-page, and responsinve web application which is made using `Angular`, `Bootstart`, `font-awesome icons` and open API `https://docs.thecatapi.com`.

The landing page is a dashboard which shows a random cat image the available categories of cats which user can browse after you select any category. The images being shown for category selection are also random of that category.

When user selects any category, from header or category images, he/she will be shown 10 images of that category. If clicked on 'Show More', the images of that category will be fetched as the user scrolls down, indefinitely. There will also a button to stop the process of loading the images.

## Getting started
Open Command prompt and type command `node --version` and `npm --version` one by one.
     Tf it runs without error and shows version, then node is installed in your system. 
     If it gives error, please install from `https://nodejs.org/en/download/` and download the Latest Stable Release. The installation will also install npm, which is Node Package Manager.
     Run the same command again after installation to check if node is properly installed or not.

Open Command prompt and type command `ng --version`,
     If it runs without error, then angular CLI is installed in your system. 
     If it gives error, please install angular CLI by typing command `npm install -g @angular-cli`. It will require internet connection. It will install angular CLI globally.
     Run the same command again after installation to check if angular CLI is properly installed or not.


## Installing Dependencies and devDependencies
run `npm install` to install all the required dependencies and devDependencies for the project. Make sure that you are connected to the internet. The process will take some time.
After the process is completed, you will be able to see a folder `node_modules` in the project directory.


## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Recommended browsers:  Google Chrome or Mozilla Firefox (latest versions).
Internet Connection is also recommended.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Build

Run `ng build` or `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng test --code-coverage` to execute the unit tests as well as to see the code coverage summary.
You will be able to see a folder `coverage\catProject` which will have a `index.html` file. Open that file inside any browser to see the details of the unit tests.


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Architectrual decisions
Angular is supported by Google. When company like Google uses this framework, I am pretty sure that Angular is not going to die very soon. As a framework, Angular keeps many things ready, and we just need to put code where we want. The angular CLI helps in keeping uniformity in folder structures, file naming etc.
for example, if user generate any service using command `ng generate service serviceName`, it will create 2 files, the service file with the name suffixed with .service.ts and the service testing file with the name suffixed with .service.spec.ts and also modifies the app.module.ts file with the entry of that service in Providers section of ngModule.
There are other advantages too. Angular is modular in nature. Also we can reuse components. We can also generate the building blocks of the application which are components, pipes, directives, services, modules, guards simply by using angular CLI.

I have learnt angular during the training program and also I have completed a certification course on angular. So I used Angular for building this application.
