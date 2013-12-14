var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validations = require('./validations'),
    _ = require('underscore'),
    RefuelSchema;

RefuelSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cost: { type: Number },
    capacity: { type: Number },
    kilometers: { type: Number },
    created_at: { type: Date, default: Date.now }
});

mongoose.model('Refuel', RefuelSchema);