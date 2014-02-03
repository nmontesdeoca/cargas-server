var mongoose = require('mongoose');

module.exports = function (authTypes) {
    return {
        /**
         * validates a document field is not empty
         * @param  {String} field the field to validate
         * @return {Boolean}      is valid
         */
        empty: function (field) {
            /**
             * if you are authenticating by any of the oauth strategies, don't validate
             */
            if (authTypes && ~authTypes.indexOf(this.provider)) {
                return true;
            }
            return field.length;
        },

        /**
         * validate the email is not already registered
         * @param  {String}   email the email to validate
         * @param  {Function} fn    unknown
         * @return {Boolean}        is valid
         */
        email: function (email, fn) {
            var User = mongoose.model('User');
            
            /**
             * if you are authenticating by any of the oauth strategies, don't validate
             */
            if (authTypes && ~authTypes.indexOf(this.provider)) {
                fn.apply(this, [true]);
            }

            /**
             * check only when it is a new user or when email field is modified
             */
            if (this.isNew || this.isModified('email')) {
                User.find({ email: email }).exec(function (err, users) {
                    fn.apply(this, [!err && users.length === 0]);
                });
            } else {
                fn.apply(this, [true]);
            }
        }
    };
};