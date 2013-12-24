var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FuelSchema;

FuelSchema = new Schema({
    cost: { type: Number },
    name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

FuelSchema.statics.preSave = function (next) {
    this.updated_at = new Date();
    next.apply(this);
};

FuelSchema.pre('save', FuelSchema.statics.preSave);
mongoose.model('Fuel', FuelSchema);