const path = require('path');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/admin/user.model');
const { core, userVal } = require('../utils');

const userProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const sanitizedUser = { ...user._doc };
    delete sanitizedUser.password;

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: sanitizedUser,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const userAllProfile = async (req, res) => {
  const { locationId } = req.params;

  try {
    const users = await User.find({ labLocation: locationId })
      .select('-password')
      .populate('labLocation')
      .lean();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: users,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const decoded = req.user;
    const value = req.validatedBody;

    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      return core.validateFields(res, 'The user is not found.');
    }

    const isMatch = await user.comparePassword(value.oldPassword);
    if (!isMatch) {
      return core.validateFields(res, 'Entered password is invalid, please try again.');
    }

    user.password = value.newPassword;
    user.refreshTokens = [];
    await user.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Password successfully updated. Please log in again.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const decoded = req.user;
    if (!req.file) {
      return core.validateFields(res, 'No image file uploaded.');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      core.deleteUploadedFile(req.file);
      return core.validateFields(res, 'User not found.');
    }

    /* Delete previous profile image if exists */
    if (user.profileImage) {
      const oldImagePath = path.join('src', user.profileImage);
      core.deleteUploadedFile({ path: oldImagePath });
    }

    /* Save new image path */
    const newImagePath = path.join('uploads', req.file.filename);
    user.profileImage = newImagePath;
    await user.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Profile image updated successfully.',
      data: {
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    core.deleteUploadedFile(req.file);
    return core.sendErrorResponse(res, error);
  }
};

const getActiveSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        message: 'Not found you in our user list.',
      });
    }

    const sessions = user.refreshTokens.map((session) => ({
      device: session.device || 'Unknown',
      browser: session.browser || 'Unknown',
      os: session.os || 'Unknown',
      loginTime: session.createdAt,
    }));

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  userProfile,
  userAllProfile,
  updatePassword,
  updateProfileImage,
  getActiveSessions,
};
