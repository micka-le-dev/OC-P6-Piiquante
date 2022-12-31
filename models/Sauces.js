const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
        userId: { type: string, required: true},
        name: { type: string, required: true},
        manufacturer: { type: String, required: true},
        description: { type: String, required: true},
        mainPepper: { type: String, required: true},
        imageUrl: { type: String, required: true},
        heat: { type: Number, required: true},
        likes: { type: Number, required: true},
        dislikes: { type: Number, required: true},
        usersLiked: { type: String[], required: true},
        usersDisliked: { type: String[], required: true}
    })


module.exports = mongoose.model('Sauce',sauceSchema)