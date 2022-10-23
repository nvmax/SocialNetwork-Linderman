const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./reaction');

// // reaction schema
// const ReactionSchema = new Schema(
//     {
//         // reactionId schema type ObjectId, value is set to a new ObjectId
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         // reactionBody schema type string, 280 character maximum and required, trim true. 
//         reactionBody: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 280
//         },
//         // username schema type string, required.
//         username: {
//             type: String,
//             required: true,
//         },
//         // createdAt schema type Date, value is set to the current timestamp
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: createdAtVal => dateFormat(createdAtVal)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         }
//     }
// );

// thought schema
const ThoughtSchema = new Schema(
    {
        // thoughtText schema type string, required, 280 character maximum and trim true
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280
        },
        // createdAt schema type Date, value is set to the current timestamp.
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // username schema type string, required
        username: {
            type: String,
            required: true
        },
        // reactions schema type array, data will be populated by the reaction model's ObjectId
        reactions: [ReactionSchema]
    },
    {
        // use virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of reactions. 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;


// **Reaction** (SCHEMA ONLY)

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.