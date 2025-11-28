const { StatusCodes } = require('http-status-codes');
const Locations = require('../models/common/location.model');
const { core, userVal, mongoValid } = require('../utils');

/*
 * endpoint: /location/new
 * method: POST
 * access: private access
 * desc: add new location
 * payload: locationName, locationCode, locationAddress, locationPincode
 */
const createLocation = async (req, res) => {
  try {
    // const decoded = req.user;

    // /** validate user by ID */
    // const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    // if (!user) return;

    const { locationName, locationCode, locationAddress, locationPincode } = req.body;

    /** validate existing loacation name */
    const existingLocationName = await Locations.findOne({
      locationName: locationName.trim(),
    });
    if (existingLocationName) {
      return core.validateFields(res, 'Requested location name already exists.');
    }

    /** validate existing loacation code */
    const existingLocationCode = await Locations.findOne({
      locationCode: locationCode.trim(),
    });
    if (existingLocationCode) {
      return core.validateFields(res, 'Requested location code already exists.');
    }

    /** build new loacation object */
    const newLocation = new Locations({
      locationName: locationName.trim(),
      locationCode: locationCode.trim(),
      locationAddress: locationAddress.trim(),
      locationPincode: locationPincode?.trim(),
      // createdBy: user._id,
    });

    /** save new loacation */
    await newLocation.save();

    /** final response */
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newLocation,
      message: 'New location created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /location/list?page=2&limit=5
 * method: GET
 * access: public access
 * desc: list of lab locations public service, so anyone can check
 */
const listOflocations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [locations, totalCount] = await Promise.all([
      Locations.find()
        // .populate('createdBy', '_id firstName lastName')
        // .populate('updatedBy', '_id firstName lastName')
        // .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Locations.countDocuments(),
    ]);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: locations,
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
 * endpoint: /location/:id
 * method: GET
 * access: private access
 * desc: get the location details
 */
const getLoaction = async (req, res) => {
  try {
    const locId = req.params.id;
    if (!mongoValid.isValidObjectId(locId, res, 'location ID')) return;

    const location = await Locations.findById(locId)
      .populate('createdBy', '_id firstName lastName email phone role profileImage')
      .populate('updatedBy', '_id firstName lastName email phone role profileImage');
    if (!location) {
      return core.notFoundItem(res, 'Requested location not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: location,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /location/:id
 * method: PATCH
 * access: private access
 * desc: update the location details
 * payload: locationName, locationCode, locationAddress, locationPincode
 */
const updateLocation = async (req, res) => {
  try {
    const locId = req.params.id;

    /** validate location id */
    if (!mongoValid.isValidObjectId(locId, res, 'location ID')) return;

    const { locationName, locationCode, locationAddress, locationPincode } = req.body;

    /** modified location name and code */
    const trimmedName = locationName?.trim();
    const trimmedCode = locationCode?.trim();

    /** build a new loaction obj */
    const decoded = req.user;
    const updateFields = {
      ...(trimmedName && { locationName: trimmedName }),
      ...(trimmedCode && { locationCode: trimmedCode }),
      ...(locationAddress && {
        locationAddress: locationAddress.trim(),
      }),
      ...(locationPincode && {
        locationPincode: locationPincode.trim(),
      }),
      updatedBy: decoded.id,
    };

    /** update the location information */
    const updatedLocation = await Locations.findByIdAndUpdate(locId, updateFields, {
      new: true,
      runValidators: true,
    });

    /** validate the location found or not */
    if (!updatedLocation) {
      return core.notFoundItem(res, 'Requested location not found.');
    }

    /** final response */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updatedLocation,
      message: 'Location updated successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /location/:id/status
 * method: PATCH
 * access: private access
 * desc: update the status of the location
 * payload: isActive
 */
const updateLocationStatus = async (req, res) => {
  try {
    const locId = req.params.id;
    const { isActive } = req.body;

    if (!mongoValid.isValidObjectId(locId, res, 'location ID')) return;

    const updatedLocation = await Locations.findByIdAndUpdate(
      locId,
      { isActive },
      { new: true, runValidators: true },
    ).select('isActive');
    if (!updatedLocation) {
      return core.notFoundItem(res, 'Requested location not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Location status updated successfully.',
      isActive: updatedLocation.isActive,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * endpoint: /location/:id
 * method: DELETE
 * access: private access
 * desc: remove the location from the table
 */
const deleteLoaction = async (req, res) => {
  try {
    const locId = req.params.id;
    if (!mongoValid.isValidObjectId(locId, res, 'location ID')) return;

    const deletedLocation = await Locations.findByIdAndDelete(locId);
    if (!deletedLocation) {
      return core.notFoundItem(res, 'Requested location not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Location deleted successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createLocation,
  listOflocations,
  getLoaction,
  updateLocation,
  updateLocationStatus,
  deleteLoaction,
};
