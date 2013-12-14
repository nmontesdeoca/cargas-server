var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validations = require('./validations'),
    _ = require('underscore'),
    UserSchema;

UserSchema = new Schema({
    name: {
        type: String,
        validate: [
            validations.empty,
            '{PATH} must have a value'
        ]
    },
    email: {
        type: String,
        validate: [validations.email, '"{VALUE}" must be a valid {PATH}'],
        lowercase: true
    },
    password: { type: String },
    salt: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date }
});

UserSchema.virtual('_password').set(function (config) {
    this.salt = this.salt || UserSchema.statics.makeSalt();
    this.password = UserSchema.statics.encryptPassword(
        config.password,
        this.salt,
        config.callback
    );
}).get(function () {
    return this.password;
});

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, result, options) {
  // remove the _id of every document before returning the result
  delete result._id;
  delete result.password;
  delete result.salt;
}

_.extend(UserSchema.statics, {
    encryptPassword: function (password, salt, callback) {
        crypto.pbkdf2(password, salt, 3, 256, callback);
    },
    makeSalt: function () {
        return UserSchema.statics.makeRandom(256);
    },
    preSave: function (next) {
        var self = this;
        this.updated_at = new Date;
        if (this.isNew) {
            this.created_at = new Date;
        }
        next.apply(this);
    },
    makeToken: function () {
        return UserSchema.statics.makeRandom(128);
    },
    makeRandom: function (bytes) {
        return crypto.randomBytes(bytes).toString('base64');
    }

});

UserSchema.pre('save', UserSchema.statics.preSave);
mongoose.model('User', UserSchema);