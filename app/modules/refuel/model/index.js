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
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

RefuelSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next.apply(this);
});

mongoose.model('Refuel', RefuelSchema);