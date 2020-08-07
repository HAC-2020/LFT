const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Must provide a name']
    },
    user_email: {
        type: String,
        unique: true,
        required: [true, 'Must provide an email']
    },
    user_mobile: Number,
    user_telephone: Number,
    user_role: {
        type: String,
        default: "student"
    },
    user_password: {
        type: String,
        required: [true, 'Must provide a password']
    },
    user_registered_at: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

// PASSWORD HASHING
userSchema.pre('save', async function (next) {
    // HASH ONLY IF NEW ENTRY ELSE SKIP PIPELINE
    if (!this.isModified('user_password')) return next();

    this.user_password = await bcrypt.hash(this.user_password, 12);
    this.user_confirm_password = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('user_password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

// PASSWORD VERIFICATION
userSchema.methods.checkPassword = async function (enteredPassword, encryptedPassword) {
    return await bcrypt.compare(enteredPassword, encryptedPassword);
};

// PASSWORD RESET TIME
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(6).toString('hex');
    console.log(resetToken);
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

User = mongoose.model('user', userSchema);

module.exports = User;