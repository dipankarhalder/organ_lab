const path = require('path');
const { StatusCodes } = require('http-status-codes');
const UAParser = require('ua-parser-js');
const User = require('../models/admin/user.model');
const { env } = require('../config');
const { core } = require('../utils');
const { role } = require('../constant');

/** roles define */
const roles = [role.userRole.SUPER, role.userRole.ADMIN, role.userRole.STAFF];

/*
 * endpoint: /auth/signin
 * method: POST
 * access: public access
 * desc: login internal people
 * payload: email, password
 */
const userSignin = async (req, res) => {
  try {
    const value = req.validatedBody;

    /** validate user email */
    const user = await User.findOne({
      email: value.email,
    }).select('+password');
    if (!user) {
      return core.validateFields(res, 'Provided email address is not exist!');
    }

    /** validate Password */
    const isMatch = await user.comparePassword(value.password);
    if (!isMatch) {
      return core.validateFields(res, 'Entered password is invalid, please try again.');
    }

    /** generate tokens */
    const { accessToken, refreshToken } = user.generateTokens();

    /** parse user for refresh token metadata */
    const parser = new UAParser();
    const ua = parser.setUA(req.headers['user-agent']).getResult();
    const deviceInfo = {
      token: refreshToken,
      device: ua.device.type || 'desktop',
      browser: ua.browser.name,
      os: ua.os.name,
    };

    if (user.refreshTokens.length >= 5) {
      user.refreshTokens.shift();
    }

    /** push the device info and save the user */
    user.refreshTokens.push(deviceInfo);
    await user.save();

    /** set refresh token in cookie */
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODEENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      accessToken,
      role: user.role,
      location: user.labLocation,
      isApproved: user.isApproved,
      message: 'You are successfully logged-in.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /auth/signup
 * method: POST
 * access: public access
 * desc: register / create a new internal people
 * payload: firstName, lastName, email, phone, password, role, labLocation
 */
const userSignup = async (req, res) => {
  try {
    const value = req.validatedBody;

    /** validate existing user by email or phone  */
    const existingUser = await User.findOne({
      $or: [{ email: value.email }, { phone: value.phone }],
    });
    if (existingUser) {
      core.deleteUploadedFile(req.file);
      const conflictField = existingUser.email === value.email ? 'email' : 'phone';
      return core.validateFields(
        res,
        `Provided ${conflictField} is already associated with another user.`,
      );
    }

    /** handle profile image */
    const profileImagePath = req.file ? path.join('uploads', req.file.filename) : '';

    /** build user object */
    const user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      phone: value.phone,
      role: roles.includes(value.role) ? value.role : role.userRole.ADMIN,
      profileImage: profileImagePath,
      labLocation: value.labLocation,
      isApproved: value.isApproved || false,
    });

    /** generate tokens */
    const { accessToken, refreshToken } = user.generateTokens();

    /** parse user for refresh token metadata */
    const parser = new UAParser();
    const ua = parser.setUA(req.headers['user-agent']).getResult();
    if (user.refreshTokens.length >= 5) {
      user.refreshTokens.shift();
    }
    user.refreshTokens.push({
      token: refreshToken,
      device: ua.device.type || 'desktop',
      browser: ua.browser.name,
      os: ua.os.name,
    });

    /** save the user */
    await user.save();

    /** set refresh token in cookie */
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODEENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      accessToken,
      role: user.role,
      location: user.labLocation,
      isApproved: user.isApproved,
      message: 'New user created successfully and logged in.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /auth/refresh-token
 * method: POST
 * access: private access
 * desc: check the prev refresh token and if expired generate the new token
 */
const refreshToken = async (req, res) => {
  try {
    /** get the refresh token from cookies */
    const tokenFromCookie = req.cookies.refreshToken;
    if (!tokenFromCookie) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Refresh token not provided.',
      });
    }

    /** decode and verifiy refresh token */
    let decoded;
    try {
      decoded = User.verifyRefreshToken(tokenFromCookie);
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: err.message,
      });
    }

    /** validate the user */
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: 'User not found. Please log in again.',
      });
    }

    /** validate refresh token exist or not */
    const tokenExists = user.refreshTokens.some((rt) => rt.token === tokenFromCookie);
    if (!tokenExists) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: 'Refresh token is not recognized. Please log in again.',
      });
    }
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== tokenFromCookie);

    /** parse user for refresh token metadata */
    const { accessToken, refreshToken: newRefreshToken } = user.generateTokens();
    const parser = new UAParser();
    const ua = parser.setUA(req.headers['user-agent']).getResult();
    if (user.refreshTokens.length >= 5) {
      user.refreshTokens.shift();
    }
    user.refreshTokens.push({
      token: newRefreshToken,
      device: ua.device.type || 'desktop',
      browser: ua.browser.name,
      os: ua.os.name,
    });

    /** save the user */
    await user.save();

    /** set refresh token in cookie */
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: env.NODEENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      accessToken,
      message: 'Token refreshed successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /auth/signout
 * method: POST
 * access: public access
 * desc: logged out the current user
 */
const userSignout = async (req, res) => {
  try {
    const tokenFromCookie = req.cookies.refreshToken;

    /** clear refresh token from cookie */
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: env.NODEENV === 'production',
      sameSite: 'Strict',
    });

    /** now kill all the cookies and send response */
    if (!tokenFromCookie || !req.user?.id) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'You are logged out successfully.',
      });
    }

    /** check and save the user */
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (rt) => rt.token !== tokenFromCookie,
      );
      await user.save();
    }

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'You are Logged-out successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
  refreshToken,
};
