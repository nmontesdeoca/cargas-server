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
    fs.readdirSync(path).forEach(exports.requireJSFile.bind(requireJSFile, path));
};