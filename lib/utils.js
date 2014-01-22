var fs = require('fs');

module.exports = {
    /**
     * this function will require a module from a certain path and with a certain name
     * @param  {String} path is from where the file will be loaded
     * @param  {String} file is the name of the file that will be loaded
     * @return {void}        the require of the file it's executed
     */
    requireJSFile: function (path, file) {
        if (~file.indexOf('.js')) {
            require(path + '/' + file);
        }
    },

    /**
     * this function will require all the modules into a certain folder path
     * @param  {String} path is the folder that contains the modules that will be loaded
     * @return {void}        exec the requireJSFile fo each file into the folder path
     */
    requirePath: function (path) {
        fs.readdirSync(path).forEach(module.exports.requireJSFile.bind(module.exports, path));
    },

    /**
     * function to require a module within an application
     * @param  {String}   path   path to the folder for this module
     * @param  {Function} app    express application
     * @param  {String}   module name of the module that will be required
     * @return {void}            the module is required by the application
     */
    requireModule: function (path, app, module) {
        var moduleApplication = require(path + '/' + module);
        app.use(moduleApplication);
        console.log('loaded %s module', moduleApplication.get('name'));
    },

    /**
     * function to require all the modules into a folder path within an application
     * @param  {String}   path folder path that contains modules
     * @param  {Function} app  express application
     * @return {void}          the modules into the folder path are required by the application
     */
    requireModules: function (path, app) {
        fs.readdirSync(path).forEach(module.exports.requireModule.bind(module.exports, path, app));
    }
};