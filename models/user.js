var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    UserSchema;

UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, result, options) {
  // remove the _id of every document before returning the result
  delete result._id;
}

_.extend(UserSchema.statics, {
    encryptPassword: function (password, salt, callback) {
        crypto.pbkdf2(password, salt, 3, 256, callback);
    },
    makeSalt: function () {
        return UserSchema.statics.makeRandom(256);
    },
    preSave: function (next) {
        this.updated_at = new Date;
        next.apply(this);
    },
    makeToken: function () {
        return UserSchema.statics.makeRandom(128);
    },
    makeRandom: function (bytes) {
        return crypto.randomBytes(bytes).toString('base64');
    },
    serialize: function(user, done) {
        if (user.emails && user.emails.length) {
            done(null, user.emails[0].value);
        } else {
            done(null, user.email);
        }
    },
    deserialize: function(email, done) {
        this.findOne({ email: email }, function (error, user) {
            done(null, user);
        });
    }
});

UserSchema.pre('save', UserSchema.statics.preSave);
mongoose.model('User', UserSchema);