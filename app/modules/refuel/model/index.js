var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    RefuelSchema;

RefuelSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel'},
    cost: { type: Number },
    capacity: { type: Number },
    average: { type: Number },
    kilometers: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

RefuelSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next.apply(this);
});

mongoose.model('Refuel', RefuelSchema);