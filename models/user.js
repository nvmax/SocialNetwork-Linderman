// user schema

const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        // username schema type string, required, unique and trimmed
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // email schema type string, required, unique and must match valid email
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match a valid email address!']
        },
        // thoughts schema type array, data will be populated by the thought model's ObjectId
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // friends schema type array, data will be populated by the user model's ObjectId
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // use virtuals to retrieve length of user's friends array field on query
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
