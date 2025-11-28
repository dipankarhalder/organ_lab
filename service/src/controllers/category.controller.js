const { StatusCodes } = require('http-status-codes');
const Category = require('../models/common/category.model');
const { core, userVal, mongoValid } = require('../utils');

/*
 * endpoint: /category/new
 * method: POST
 * access: private access
 * desc: add new category
 * payload: name, description
 */
const createCategory = async (req, res) => {
  try {
    const decoded = req.user;

    /** validate user by ID */
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const { name, description } = req.body;

    /** validate existing info */
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return core.validateFields(
        res,
        'Category name is required and must be a non-empty string.',
      );
    }

    /** validate existing category */
    const existingCategory = await Category.findOne({
      name: name.trim(),
    });
    if (existingCategory) {
      return core.validateFields(res, 'A category with this name already exists.');
    }

    const uploadedImage = req.file ? req.file.filename : null;

    /** build new object */
    const newCategory = new Category({
      name: name.trim(),
      description: description?.trim() || '',
      image: uploadedImage,
      user: user._id,
    });

    /** save new info */
    await newCategory.save();
    const populatedCategory = await Category.findById(newCategory._id).populate(
      'user',
      '_id firstName lastName role',
    );

    /** final response */
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: populatedCategory,
      message: 'New category created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /category/list
 * method: GET
 * access: private access
 * desc: list of category
 */
const listCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [categoryInfo, totalCount] = await Promise.all([
      Category.find()
        .populate({
          path: 'user',
          select: '_id firstName lastName role',
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Category.countDocuments(),
    ]);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: categoryInfo,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /category/:id
 * method: GET
 * access: private access
 * desc: category details
 */
const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!mongoValid.isValidObjectId(categoryId, res, 'category ID')) return;

    const categoryInfo = await Category.findById(categoryId);
    if (!categoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      details: categoryInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /category/:id
 * method: PATCH
 * access: private access
 * desc: update category details
 * payload: name, description
 */
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    /** validate category id */
    if (!mongoValid.isValidObjectId(categoryId, res, 'category ID')) return;

    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
      return core.validateFields(res, 'Category name must be a non-empty string.');
    }

    /** modified category name and description */
    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();

    /** validate existing category by ID */
    if (trimmedName) {
      const existing = await Category.findOne({
        name: trimmedName,
        _id: { $ne: categoryId },
      });
      if (existing) {
        return core.validateFields(res, 'A category with this name already exists.');
      }
    }

    /** uploade image */
    const uploadedImage = req.file ? req.file.filename : undefined;

    /** build category object */
    const updateFields = {
      ...(trimmedName && { name: trimmedName }),
      ...(description !== undefined && {
        description: trimmedDescription,
      }),
      ...(uploadedImage && { image: uploadedImage }),
    };

    /** update category information */
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateFields, {
      new: true,
      runValidators: true,
    }).populate('user', '_id firstName lastName role');

    /** validate category found or not */
    if (!updatedCategory) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updatedCategory,
      message: 'Category updated successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /category/:id/status
 * method: PATCH
 * access: private access
 * desc: update status of the category
 */
const updateCategoryStatus = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { active } = req.body;
    if (!mongoValid.isValidObjectId(categoryId, res, 'category ID')) return;

    const categoryInfo = await Category.findByIdAndUpdate(
      categoryId,
      { active },
      { new: true, runValidators: true },
    ).select('active');
    if (!categoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Category status updated successfully.`,
      active: categoryInfo.active,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /category/:id
 * method: DELETE
 * access: private access
 * desc: delete the category
 */
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!mongoValid.isValidObjectId(categoryId, res, 'category ID')) return;

    const categoryInfo = await Category.findByIdAndDelete(categoryId);
    if (!categoryInfo) {
      return core.notFoundItem(res, 'The item you are looking for, we are not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createCategory,
  listCategory,
  getCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
};
