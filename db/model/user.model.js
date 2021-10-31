const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// name, username, email, password, phone, age, skills, gender, image, info, experiences
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    userType: {
        type: String,
        trim: true,
        required: true,
        enum: ['client', 'freelancer', 'admin']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) throw new Error('Invalid email!')
        }
    },
    location: {
        city: {
            type: String,
            trim: true,
            maxlength: 50
        },
        street: {
            type: String,
            trim: true,
            maxlength: 50
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    phone: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone number")
        }
    },
    age: {
        type: Number,
        min: 18,
        max:100
    },
    rate:{
        type:Number,
        min:1,
        max:5
    },
    skills: [
        { name: { type: String, trim: true } }
    ],
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    image: {
        type: String
    },
    info: {
        type: String,
        trim: true,
        maxlength: 500
    },
    experiences: [
        { experience: { type: String, trim: true }, startDate: { type: Date }, endDate: { type: Date } }
    ],
    socialLinks: [
        { website: { type: String, trim: true }, link: { type: String, trim: true } }
    ],
    notifications:[
        {msg:{ type: String, trim: true}}
    ],
    tokens: [{ token: { type: String, required: true } }]
}, { timestamps: true })

// model configrations
userSchema.virtual('myJobs', {
    ref: "Job",
    localField: "_id",
    foreignField: "ownerId"
})

userSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.password
    delete data.__v
    delete data.tokens
    if(data.userType == 'admin' || data.userType == 'client'){
       delete data.skills 
       delete data.experiences 
    }
    return data
}

userSchema.pre('save', async function () {
    let user = this
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)
})

userSchema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("email not found")
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) throw new Error("invalid password")
    return user
}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWTTOKEN)
    user.tokens.push({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User