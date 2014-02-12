var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CarSchema;

CarSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel'},
    name: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

CarSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next.apply(this);
});

mongoose.model('Car', CarSchema);