const { StatusCodes } = require('http-status-codes');
const SampleType = require('../models/common/sampleType.model');
const { core, userVal, mongoValid } = require('../utils');

/*
 * endpoint: /sampleType/new
 * method: POST
 * access: private access
 * desc: add new sampleType
 * payload: name, description
 */
const createTypeService = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const { typeName, typeDesc } = req.body;
    const existing = await SampleType.findOne({
      typeName: typeName.trim(),
    });
    if (existing) {
      return core.validateFields(res, 'Sample type with this name already exists.');
    }

    const sampleType = new SampleType({
      typeName: typeName.trim(),
      typeDesc: typeDesc.trim(),
      createBy: user._id,
    });

    await sampleType.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: sampleType,
      message: 'Sample type created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /sampleType/list
 * method: GET
 * access: private access
 * desc: list of sampleType
 */
const listsTypeService = async (req, res) => {
  try {
    const types = await SampleType.find()
      .populate('createBy', '_id firstName lastName role')
      .populate('updatedBy', '_id firstName lastName role')
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: types,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /sampleType/:id
 * method: GET
 * access: private access
 * desc: sampleType details
 */
const getTypeService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoValid.isValidObjectId(id, res, 'SampleType ID')) return;

    const sampleType = await SampleType.findById(id);
    if (!sampleType) {
      return core.notFoundItem(res, 'SampleType not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: sampleType,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /sampleType/:id
 * method: PATCH
 * access: private access
 * desc: update sampleType
 * payload: name, description, location
 */
const updateTypeService = async (req, res) => {
  try {
    const id = req.params.id;
    const decoded = req.user;
    const { typeName, typeDesc } = req.body;

    if (!mongoValid.isValidObjectId(id, res, 'SampleType ID')) return;
    if (typeName && typeof typeName !== 'string') {
      return core.validateFields(res, 'Type name must be a string.');
    }

    const trimmedTypeName = typeName?.trim();
    const trimmedTypeDesc = typeDesc?.trim();

    if (trimmedTypeName) {
      const exists = await SampleType.findOne({
        typeName: trimmedTypeName,
        _id: { $ne: id },
      });
      if (exists) {
        return core.validateFields(res, 'A type with this name already exists.');
      }
    }

    const updated = await SampleType.findByIdAndUpdate(
      id,
      {
        ...(trimmedTypeName && {
          typeName: trimmedTypeName,
        }),
        ...(trimmedTypeDesc && {
          typeDesc: trimmedTypeDesc,
        }),
        updatedBy: decoded.id,
      },
      { new: true, runValidators: true },
    ).populate('createBy updatedBy', '_id firstName lastName role');

    if (!updated) {
      return core.notFoundItem(res, 'SampleType not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updated,
      message: 'Sample type updated successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /sampleType/new
 * method: PATCH
 * access: private access
 * desc: update sampleType status
 * payload: isActive
 */
const updateTypeStatusService = async (req, res) => {
  try {
    const id = req.params.id;
    const { isActive } = req.body;

    if (!mongoValid.isValidObjectId(id, res, 'SampleType ID')) return;

    const updated = await SampleType.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true },
    ).select('isActive');
    if (!updated) {
      return core.notFoundItem(res, 'SampleType not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Status updated successfully.',
      isActive: updated.isActive,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /sampleType/:id
 * method: DELETE
 * access: private access
 * desc: delete sampleType
 */
const deleteTypeService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoValid.isValidObjectId(id, res, 'SampleType ID')) return;

    const deleted = await SampleType.findByIdAndDelete(id);
    if (!deleted) {
      return core.notFoundItem(res, 'SampleType not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'SampleType deleted successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createTypeService,
  listsTypeService,
  getTypeService,
  updateTypeService,
  updateTypeStatusService,
  deleteTypeService,
};
