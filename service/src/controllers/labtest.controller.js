const { StatusCodes } = require('http-status-codes');
const Labtest = require('../models/common/labtest.model');
const { core, mongoValid } = require('../utils');

const createLabTestItem = async (req, res) => {
  try {
    const {
      testCode,
      testName,
      commission,
      reportDay,
      labCharge = [],
      isActive = true,
      sampletype,
      createdBy,
      updatedBy,
    } = req.body;

    const existingTest = await Labtest.findOne({
      $or: [{ testCode }, { testName }],
    });

    if (existingTest) {
      if (existingTest.testCode === testCode) {
        return core.validateFields(res, 'Test with this code already exists');
      }
      if (existingTest.testName === testName) {
        return core.validateFields(res, 'Test with this name already exists');
      }
    }

    const labTestData = {
      testCode,
      testName,
      commission,
      reportDay,
      labCharge,
      isActive,
      sampletype,
      createdBy,
      updatedBy,
    };

    const newLabTest = new Labtest(labTestData);
    await newLabTest.save();

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newLabTest,
      message: 'Lab test created successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const listLabTests = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = {};

    if (search) {
      filter.$or = [
        { testCode: { $regex: search, $options: 'i' } },
        { testName: { $regex: search, $options: 'i' } },
      ];
    }

    const labTests = await Labtest.find(filter)
      .populate('sampletype', 'name')
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Labtest.countDocuments(filter);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: labTests,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const getLabTestDetails = async (req, res) => {
  try {
    const testId = req.params.id;
    if (!mongoValid.isValidObjectId(testId, res, 'Lab test ID')) return;

    const labTest = await Labtest.findById(testId)
      .populate('sampletype', 'name')
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName');

    if (!labTest) {
      return core.notFoundItem(res, 'Lab test not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: labTest,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const deleteLabTest = async (req, res) => {
  try {
    const testId = req.params.id;
    if (!mongoValid.isValidObjectId(testId, res, 'Lab test ID')) return;

    const deletedLabTest = await Labtest.findByIdAndDelete(testId);
    if (!deletedLabTest) {
      return core.notFoundItem(res, 'Lab test not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Lab test deleted successfully',
      data: deletedLabTest,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createLabTestItem,
  listLabTests,
  getLabTestDetails,
  deleteLabTest,
};
