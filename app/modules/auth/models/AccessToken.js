var mongoose = require('mongoose');

mongoose.model('AccessToken', new mongoose.Schema({
    userId: { type: String, required: true },
    clientId: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now }
}));