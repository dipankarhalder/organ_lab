const { StatusCodes } = require('http-status-codes');
const Subcategory = require('../models/common/subcategory.model');
const { core, userVal, mongoValid } = require('../utils');

const createSubCategory = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const { name, description } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return core.validateFields(
        res,
        'Subcategory name is required and must be a non-empty string.',
      );
    }

    const existingSubCategory = await Subcategory.findOne({
      name: name.trim(),
    });
    if (existingSubCategory) {
      return core.validateFields(res, 'A subcategory with this name already exists.');
    }

    const uploadedImage = req.file ? req.file.filename : null;
    const newSubCategory = new Subcategory({
      name: name.trim(),
      description: description?.trim() || '',
      image: uploadedImage,
      user: user._id,
    });

    await newSubCategory.save();
    const populatedSubCategory = await Subcategory.findById(newSubCategory._id).populate(
      'user',
      '_id firstName lastName role',
    );

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: populatedSubCategory,
      message: 'New subcategory created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const listSubCategory = async (req, res) => {
  try {
    const subcategoryInfo = await Subcategory.find()
      .populate({
        path: 'user',
        select: '_id firstName lastName role',
      })
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: subcategoryInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const getSubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    if (!mongoValid.isValidObjectId(subcategoryId, res, 'subcategory ID')) return;

    const subcategoryInfo = await Subcategory.findById(subcategoryId);
    if (!subcategoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      details: subcategoryInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const { name, description } = req.body;
    if (!mongoValid.isValidObjectId(subcategoryId, res, 'subcategory ID')) return;

    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
      return core.validateFields(res, 'Subcategory name must be a non-empty string.');
    }

    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();

    if (trimmedName) {
      const existing = await Subcategory.findOne({
        name: trimmedName,
        _id: { $ne: subcategoryId },
      });
      if (existing) {
        return core.validateFields(res, 'A subcategory with this name already exists.');
      }
    }

    const uploadedImage = req.file ? req.file.filename : undefined;
    const updateFields = {
      ...(trimmedName && { name: trimmedName }),
      ...(description !== undefined && {
        description: trimmedDescription,
      }),
      ...(uploadedImage && { image: uploadedImage }),
    };

    const updatedSubCategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      updateFields,
      {
        new: true,
        runValidators: true,
      },
    ).populate('user', '_id firstName lastName role');

    if (!updatedSubCategory) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updatedSubCategory,
      message: 'Subcategory updated successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updateSubCategoryStatus = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const { active } = req.body;
    if (!mongoValid.isValidObjectId(subcategoryId, res, 'subcategory ID')) return;

    const subcategoryInfo = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { active },
      { new: true, runValidators: true },
    ).select('active');
    if (!subcategoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Subcategory status updated successfully.`,
      active: subcategoryInfo.active,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    if (!mongoValid.isValidObjectId(subcategoryId, res, 'subcategory ID')) return;

    const subcategoryInfo = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!subcategoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Subcategory deleted successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createSubCategory,
  listSubCategory,
  getSubCategory,
  updateSubCategory,
  updateSubCategoryStatus,
  deleteSubCategory,
};
