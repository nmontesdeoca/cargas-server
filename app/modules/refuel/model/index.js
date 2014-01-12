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
    date: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

/**
 * virtuals
 */
RefuelSchema
    .virtual('html_date')
    .get(function () {
        var day = this.date.getDate(),
            month = this.date.getMonth() + 1;

        return this.date.getFullYear() +
            '-' + (month < 10 ? '0' : '') + month +
            '-' + (day < 10 ? '0' : '') + day;
    });

/**
 * static methods
 */
RefuelSchema.static({
    preSave: function (next) {
        if (!this.date) {
            this.date = new Date();
        }

        return next.apply(this);
    }
});

RefuelSchema.pre('save', RefuelSchema.statics.preSave);
mongoose.model('Refuel', RefuelSchema);