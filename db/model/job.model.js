const mongoose = require('mongoose')

// title, description, owner, offers
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    location: {
        city: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 50
        },
        street: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 50
        }
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cost: {
        type: Number
    },
    offers: [
        {
            freelancer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            cost: { type: String, required: true },
            duration: { type: String, required: true },
            status: { type: Boolean, default: false }
        }
    ],
    done:{ type: Boolean, default: false }
}, { timestamps: true })

jobSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    return data
}

const Job = mongoose.model('Job', jobSchema)

module.exports = Job