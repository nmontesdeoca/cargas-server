var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    authTypes = ['twitter', 'facebook', 'google'],
    validation = require('../../../../lib/model/validation')(authTypes),
    UserSchema;

UserSchema = new Schema({
    firstName: { type: String, validate: [ validation.empty, 'first name cannot be blank' ] },
    lastName: { type: String, validate: [ validation.empty, 'last name cannot be blank' ] },
    email: {
        type: String,
        lowercase: true,
        validate: [
            { validator: validation.empty, msg: 'email cannot be blank' },
            { validator: validation.email, msg: 'email already exists' }
        ]
    },
    provider: String,
    hashedPassword: { type: String, validate: [ validation.empty, 'password name cannot be blank' ] },
    salt: String,
    authToken: String,
    facebook: {},
    facebookId: String,
    twitter: {},
    twitterId: String,
    google: {},
    googleId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

/**
 * we delete the salt and the hashedPassword
 * in order to don't send these properties to the client (front end)
 */
UserSchema.options.toObject.transform = function (document, result, options) {
    delete result.salt;
    delete result.hashedPassword;
};

/**
 * virtuals
 */
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._password; });

/**
 * instance methods
 */
UserSchema.method({

    /**
     * authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function () {
        return '' + Math.round(new Date().valueOf() * Math.random());
    },

    /**
     * encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function (password) {
        var encrypred;

        if (!password) {
            return '';
        }

        try {
            encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
            return encrypred;
        } catch (err) {
            return '';
        }
    }
});

/**
 * pre-save hook
 */
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();

    if (!this.isNew) {
        return next.apply(this);
    }

    if (!this.password && !~authTypes.indexOf(this.provider)) {
        next.apply(this, [new Error('invalid password')]);
    } else {
        next.apply(this);
    }
});
mongoose.model('User', UserSchema);