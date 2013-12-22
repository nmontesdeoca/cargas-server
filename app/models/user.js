var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema;

UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        lowercase: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, result, options) {
    // remove the _id of every document before returning the result
    delete result._id;
};

UserSchema.statics.preSave = function (next) {
    this.updated_at = new Date;
    next.apply(this);
};

UserSchema.pre('save', UserSchema.statics.preSave);
mongoose.model('User', UserSchema);