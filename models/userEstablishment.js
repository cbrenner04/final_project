var mongoose = require('mongoose');
var {Schema} = mongoose;
var userEstablishmentSchema = new Schema({
    bathroomGender: {
        enum: ['gender neutral', 'female', 'family', 'male'],
        required: true,
        type: String
    },
    comment: {body: String},
    establishmentId: [{
        ref: 'Establishment',
        type: Schema.Types.ObjectId
    }],
    id: {
        required: true,
        type: Number,
        unique: true
    },
    rating: {
        enum: ['terrible', 'decent', 'splendid'],
        required: true,
        type: String
    },
    userId: [{
        ref: 'User',
        type: Schema.Types.ObjectId
    }]
});
var UserEstablishment =
    mongoose.model('UserEstablishment', userEstablishmentSchema);
module.exports = UserEstablishment;