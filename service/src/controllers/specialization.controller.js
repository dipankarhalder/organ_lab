const { StatusCodes } = require('http-status-codes');
const Specialization = require('../models/common/specialization.model');
const { core, userVal, mongoValid } = require('../utils');

/*
 * endpoint: /specialization/new
 * method: POST
 * access: private access
 * desc: add new specialization
 * payload: name, description
 */
const createSpclService = async (req, res) => {
  try {
    const decoded = req.user;

    /** validate user by ID */
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const { name, description } = req.body;

    /** validate existing info */
    const existing = await Specialization.findOne({
      name: name.trim(),
    });
    if (existing) {
      return core.validateFields(res, 'A specialization with this name already exists.');
    }

    /** build new object */
    const newSpecialization = new Specialization({
      name: name.trim(),
      description: description.trim(),
      createBy: user._id,
    });

    /** save new info */
    await newSpecialization.save();
    const populated = await Specialization.findById(newSpecialization._id)
      .populate('createBy', '_id firstName lastName role')
      .populate('updatedBy', '_id firstName lastName role');

    /** final response */
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: populated,
      message: 'New specialization created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /specialization/list?page=1&limit=5
 * method: GET
 * access: private access
 * desc: list of specialization
 */
const listsSpclService = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [list, totalCount] = await Promise.all([
      Specialization.find()
        .populate('createBy', '_id firstName lastName role')
        .populate('updatedBy', '_id firstName lastName role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Specialization.countDocuments(),
    ]);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: list,
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
 * endpoint: /specialization/:id
 * method: GET
 * access: private access
 * desc: specialization destils
 */
const getSpclService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoValid.isValidObjectId(id, res, 'specialization ID')) return;

    const data = await Specialization.findById(id)
      .populate('createBy', '_id firstName lastName role')
      .populate('updatedBy', '_id firstName lastName role');
    if (!data) {
      return core.notFoundItem(res, 'Specialization you are looking for was not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /specialization/:id
 * method: PATCH
 * access: private access
 * desc: update specialization destils
 */
const updateSpclService = async (req, res) => {
  try {
    const id = req.params.id;
    const decoded = req.user;
    const { name, description } = req.body;

    /** validate specialization id */
    if (!mongoValid.isValidObjectId(id, res, 'specialization ID')) return;

    /** modified specialization name and description */
    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();

    /** validate existing specialization by ID */
    if (trimmedName) {
      const existing = await Specialization.findOne({
        name: trimmedName,
        _id: { $ne: id },
      });
      if (existing) {
        return core.validateFields(
          res,
          'A specialization with this name already exists.',
        );
      }
    }

    /** update specialization information */
    const updated = await Specialization.findByIdAndUpdate(
      id,
      {
        ...(trimmedName && { name: trimmedName }),
        ...(description !== undefined && {
          description: trimmedDescription,
        }),
        updatedBy: decoded.id,
      },
      { new: true, runValidators: true },
    )
      .populate('createBy', '_id firstName lastName role')
      .populate('updatedBy', '_id firstName lastName role');

    /** validate specialization found or not */
    if (!updated) {
      return core.notFoundItem(res, 'Specialization you are looking for was not found.');
    }

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updated,
      message: 'Specialization updated successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /specialization/:id/status
 * method: PATCH
 * access: private access
 * desc: update status of the specialization
 * payload: active
 */
const updateSpclStatusService = async (req, res) => {
  try {
    const id = req.params.id;
    const { active } = req.body;
    const decoded = req.user;

    if (!mongoValid.isValidObjectId(id, res, 'specialization ID')) return;

    const updated = await Specialization.findByIdAndUpdate(
      id,
      { active, updatedBy: decoded.id },
      { new: true, runValidators: true },
    ).select('active');
    if (!updated) {
      return core.notFoundItem(res, 'Specialization you are looking for was not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Specialization status updated successfully.',
      active: updated.active,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /specialization/:id
 * method: DELETE
 * access: private access
 * desc: delete the specialization
 */
const deleteSpclService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoValid.isValidObjectId(id, res, 'specialization ID')) return;

    const deleted = await Specialization.findByIdAndDelete(id);
    if (!deleted) {
      return core.notFoundItem(res, 'Specialization you are looking for was not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Specialization deleted successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createSpclService,
  listsSpclService,
  getSpclService,
  updateSpclService,
  updateSpclStatusService,
  deleteSpclService,
};
