var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FuelSchema;

FuelSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cost: { type: Number },
    name: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

FuelSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next.apply(this);
});

mongoose.model('Fuel', FuelSchema);