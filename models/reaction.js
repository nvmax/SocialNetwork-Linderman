// reaction model
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create reaction schema
const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        // use getters and virtuals when data is requested
        toJSON: {
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// exports model 
module.exports = ReactionSchema;
