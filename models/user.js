const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
    required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
    },
    profile_pic: {
        data: Buffer, 
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now
    }
    })

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.hash_password);
}

mongoose.model('User', UserSchema);