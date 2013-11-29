var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('underscore'),
    UserSchema;

UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    salt: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date }
});

UserSchema.path('name').validate(function (name) {
    return name;
}, 'name must be a value');

UserSchema.virtual('_password')
    .set(function (array_password) {
        this.salt = this.salt || UserSchema.static.makeSalt();
        this.password = UserSchema.static.encryptPassword(array_password[0], this.salt, array_password[1]);
    }).get(function () {
        return this.password;
    });

_.extend(UserSchema.static, {
    encryptPassword: function (password, salt, callback) {
        crypto.pbkdf2(password, salt, 3, 256, callback);
    },
    makeSalt: function () {
        return crypto.randomBytes(256).toString('base64');
    },
    preSave: function (next) {
        var self = this;
        this.updated_at = new Date;
        if (this.isNew) {
            this.created_at = new Date;
        }
        console.log('Model saving: ', this);
        next.apply(this);
    }
});

UserSchema.pre('save', UserSchema.static.preSave);
mongoose.model('User', UserSchema);