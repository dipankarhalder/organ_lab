const { StatusCodes } = require('http-status-codes');
const LabDoctor = require('../models/doctor/labdoctor.model');
const { core, userVal } = require('../utils');

const createLabDoctor = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const {
      fullName,
      email,
      phone,
      experience,
      qualifications,
      bio,
      location,
      specialization,
    } = req.body;

    /* validate user by email */
    const existingEmail = await LabDoctor.findOne({ email });
    if (existingEmail) {
      return core.validateFields(res, 'Lab doctor with this email already exists');
    }

    /* validate user by phone */
    const existingPhone = await LabDoctor.findOne({ phone });
    if (existingPhone) {
      return core.validateFields(res, 'Lab doctor with this phone already exists');
    }

    /* create lab doctor object */
    const labDoctorData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      experience: Number(experience),
      qualifications: Array.isArray(qualifications) ? qualifications : [],
      bio,
      location,
      specialization,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const newLabDoctor = new LabDoctor(labDoctorData);
    await newLabDoctor.save();

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newLabDoctor,
      message: 'Lab doctor profile created successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const listLabDoctors = async (req, res) => {
  try {
    // const { page = 1, limit = 10, search = '', isActive } = req.query;
    // const skip = (Number(page) - 1) * Number(limit);
    // const filter = {};

    // if (isActive !== undefined) {
    //   filter.isActive = isActive === 'true';
    // }
    // if (search) {
    //   filter.fullName = { $regex: search, $options: 'i' };
    // }

    // const doctors = await LabDoctor.find(filter)
    //   .populate('user', 'firstName lastName email')
    //   .populate({
    //     path: 'specialization',
    //     select: 'name description',
    //   })
    //   .skip(skip)
    //   .limit(Number(limit))
    //   .sort({ createdAt: -1 });

    // const refinedDoctors = search
    //   ? doctors.filter(
    //       (doc) =>
    //         doc.specialization?.name?.toLowerCase().includes(search.toLowerCase()) ||
    //         doc.fullName?.toLowerCase().includes(search.toLowerCase()),
    //     )
    //   : doctors;
    const total = await LabDoctor.find()
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .populate('specialization', 'name description')
      .populate('location', 'locationName locationCode')
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: total,
      // pagination: {
      //   total,
      //   page: Number(page),
      //   limit: Number(limit),
      //   totalPages: Math.ceil(total / limit),
      // },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createLabDoctor,
  listLabDoctors,
};
