var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FuelSchema;

FuelSchema = new Schema({
    cost: { type: Number },
    name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

FuelSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next.apply(this);
});

mongoose.model('Fuel', FuelSchema);