const { StatusCodes } = require('http-status-codes');
const Doctor = require('../models/doctor/doctor.model');
const { core, userVal, mongoValid } = require('../utils');

const createDoctor = async (req, res) => {
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
    const existingEmail = await Doctor.findOne({ email });
    if (existingEmail) {
      return core.validateFields(res, 'Doctor with this email already exists.');
    }

    /* validate user by phone */
    const existingPhone = await Doctor.findOne({ phone });
    if (existingPhone) {
      return core.validateFields(res, 'Doctor with this phone already exists.');
    }

    /* create lab doctor object */
    const doctorData = {
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

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newDoctor,
      message: 'Doctor profile created successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const listDoctors = async (req, res) => {
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

    // const doctors = await Doctor.find(filter)
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
    // const total = await Doctor.countDocuments(filter);

    const total = await Doctor.find()
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

const getDoctorDetails = async (req, res) => {
  try {
    const doctorId = req.params.id;
    if (!mongoValid.isValidObjectId(doctorId, res, 'doctor ID')) return;

    const doctor = await Doctor.findById(doctorId)
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'specialization',
        select: 'name description',
      });

    if (!doctor) {
      return core.notFoundItem(res, 'Doctor is not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: doctor,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const userId = req.user?.id;
    if (!mongoValid.isValidObjectId(doctorId, res, 'doctor ID')) return;

    const updater = await userVal.getUserOrRespondNotFound(userId, res);
    if (!updater) return;

    const existingDoctor = await Doctor.findById(doctorId);
    if (!existingDoctor) {
      return core.notFoundItem(res, 'Doctor is not found');
    }

    const {
      fullName,
      email,
      phone,
      specialization,
      experience,
      qualifications,
      bio,
      location,
    } = req.body;
    if (email && email !== existingDoctor.email) {
      const emailExists = await Doctor.findOne({
        email,
        _id: { $ne: doctorId },
      });
      if (emailExists) {
        return core.validateFields(res, 'Another doctor is already using this email');
      }
    }

    if (fullName) existingDoctor.fullName = fullName;
    if (email) existingDoctor.email = email;
    if (phone) existingDoctor.phone = phone;
    if (specialization) existingDoctor.specialization = specialization;
    if (experience !== undefined) existingDoctor.experience = experience;
    if (Array.isArray(qualifications)) existingDoctor.qualifications = qualifications;
    if (bio) existingDoctor.bio = bio;
    if (location) existingDoctor.location = location;

    existingDoctor.lastUpdatedBy = {
      _id: updater._id,
      firstName: updater.firstName,
      lastName: updater.lastName,
      role: updater.role,
    };

    await existingDoctor.save();
    const updatedDoctor = await Doctor.findById(existingDoctor._id)
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'specialization',
        select: 'name description',
      });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Doctor information updated successfully',
      data: updatedDoctor,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const toggleDoctorStatus = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const userId = req.user?.id;
    if (!mongoValid.isValidObjectId(doctorId, res, 'doctor ID')) return;

    const updater = await userVal.getUserOrRespondNotFound(userId, res);
    if (!updater) return;

    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'isActive must be a boolean value (true or false)');
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return core.notFoundItem(res, 'Doctor is not found');
    }

    doctor.isActive = isActive;
    doctor.lastUpdatedBy = {
      _id: updater._id,
      firstName: updater.firstName,
      lastName: updater.lastName,
      role: updater.role,
    };
    await doctor.save();

    const updatedDoctor = await Doctor.findById(doctor._id)
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'specialization',
        select: 'name description',
      });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Doctor has been ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedDoctor,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    if (!mongoValid.isValidObjectId(doctorId, res, 'doctor ID')) return;

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId)
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'specialization',
        select: 'name description',
      });

    if (!deletedDoctor) {
      return core.notFoundItem(res, 'Doctor not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Doctor information deleted successfully',
      data: deletedDoctor,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createDoctor,
  listDoctors,
  getDoctorDetails,
  updateDoctor,
  toggleDoctorStatus,
  deleteDoctor,
};
