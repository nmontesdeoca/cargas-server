/**
 * middleware to check if the user has the right access
 */
exports.requiresLogin = require('passport').authenticate('basic', { session: false });
