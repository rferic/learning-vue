var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
        username: { type: String, index: true },
        password: { type: String, index: false }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

var User = mongoose.model('user', userSchema);

var postSchema = new Schema({
    title: String,
    body: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            body: String,
            date: Date
        }
    ],
    date: { type: Date, default: Date.now },
})

var Post = mongoose.model('post', postSchema);

mongoose.connect('mongodb://127.0.0.1/curso-vuejs2')

module.exports = {
    User: User,
    Post: Post
}