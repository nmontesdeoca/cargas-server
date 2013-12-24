var fs = require('fs');

/**
 * this function will require a module from a certain path and with a certain name
 * @param  {String} path is from where the file will be loaded
 * @param  {String} file is the name of the file that will be loaded
 * @return {void}        the require of the file it's executed
 */
exports.requireJSFile = function (path, file) {
    if (~file.indexOf('.js')) {
        require(path + '/' + file);
    }
};

/**
 * this function will require all the modules into a certain folder path
 * @param  {String} path is the folder that contains the modules that will be loaded
 * @return {void}        exec the requireJSFile fo each file into the folder path
 */
exports.requirePath = function (path) {
    fs.readdirSync(path).forEach(exports.requireJSFile.bind(this, path));
};

/**
 * function to require a module within an application
 * @param  {String}   path   path to the folder for this module
 * @param  {Function} app    express application
 * @param  {String}   module name of the module that will be required
 * @return {void}            the module is required by the application
 */
exports.requireModule = function (path, app, module) {
    var module_application = require(path + '/' + module);
    app.use(module_application);
    console.log('loaded %s module', module_application.get('name'));
};

/**
 * function to require all the modules into a folder path within an application
 * @param  {String}   path folder path that contains modules
 * @param  {Function} app  express application
 * @return {void}          the modules into the folder path are required by the application
 */
exports.requireModules = function (path, app) {
    fs.readdirSync(path).forEach(exports.requireModule.bind(this, path, app));
};