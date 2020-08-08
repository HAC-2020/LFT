const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

const User = require('./../models/userModel');

// SIGNING A JWT WITH USER_ID
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// STORING THE JWT IN A COOKIE
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    // TODO: ADD HTTPS SECURITY DURING PRODUCTION

    res.cookie('jwt', token, cookieOptions);

    user.user_password = undefined;

    res.status(statusCode).json({
        status: 'success',
        success: true,
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_role: req.body.user_role,
        user_password: req.body.user_password,
        user_registered_at: new Date(Date.now())
    });

    const url = `https://github.com`;
    await new Email(newUser, url).sendHello();

    createSendToken(newUser, 201, res);
});

exports.updateUser = catchAsync(async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.user._id }, req.body);
    const user = await User.findById(req.user._id);
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            user
        }
    });
});

exports.login = catchAsync(async (req, res) => {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
        return res.status(400)
            .send('Both email and password are required!');
    }
    const user = await User.findOne({ user_email }).select('+user_password');

    if (!user || !(await user.checkPassword(user_password, user.user_password))) {
        return res.status(400)
            .send('Incorrect Email or Password');
    }
    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success',
        message: 'successfully logged out'
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError('You are not logged in!', 401)
        );
    }

    const decodedUser = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decodedUser.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The User with these credentials no longer exists.',
                401
            )
        );
    }

    // CHECK PASSWORD CHANGED
    if (currentUser.changedPasswordAfter(decodedUser.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    req.user = currentUser;
    next();
});

exports.restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.user_role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // GET USER FROM REQUESTED EMAIL
    const user = await User.findOne({ user_email: req.body.email });
    if (!user) {
        return next(new AppError('User does not exist', 404));
    }

    // GENERATE RESET TOKEN
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // SEND EMAIL
    try {
        const resetURL = `${resetToken}`;

        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // GET USER FROM REQUESTED TOKEN
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // PATCH PASSWORD IF TOKEN IS VALID
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.user_password = req.body.password;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});

exports.deleteUser = catchAsync(async (req, res) => {
    await User.findByIdAndUpdate({ user_email: req.params.email_id }, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});