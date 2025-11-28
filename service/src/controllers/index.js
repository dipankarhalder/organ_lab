const {
  userSignup,
  userSignin,
  userSignout,
  refreshToken,
} = require('./auth.controller');
const {
  userProfile,
  userAllProfile,
  updatePassword,
  updateProfileImage,
  getActiveSessions,
} = require('./profile.controller');
const {
  createSpclService,
  listsSpclService,
  getSpclService,
  updateSpclService,
  updateSpclStatusService,
  deleteSpclService,
} = require('./specialization.controller');
const {
  createCategory,
  listCategory,
  getCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} = require('./category.controller');
const {
  createSubCategory,
  listSubCategory,
  getSubCategory,
  updateSubCategory,
  updateSubCategoryStatus,
  deleteSubCategory,
} = require('./subcategory.controller');
const {
  createDoctor,
  listDoctors,
  getDoctorDetails,
  updateDoctor,
  toggleDoctorStatus,
  deleteDoctor,
} = require('./doctor.controller');
const { createLabDoctor, listLabDoctors } = require('./labdoctor.controller');
const {
  createPatient,
  listPatients,
  getPatientDetails,
  updatePatient,
  deletePatient,
} = require('./patient.controller');
const {
  createLocation,
  listOflocations,
  getLoaction,
  updateLocation,
  updateLocationStatus,
  deleteLoaction,
} = require('./location.controller');
const {
  createTypeService,
  listsTypeService,
  getTypeService,
  updateTypeService,
  updateTypeStatusService,
  deleteTypeService,
} = require('./sampleType.controller');
const {
  createLabTestItem,
  listLabTests,
  getLabTestDetails,
  deleteLabTest,
} = require('./labtest.controller');

module.exports = {
  authenticateController: {
    userSignup,
    userSignin,
    userSignout,
    refreshToken,
  },
  profileController: {
    userProfile,
    userAllProfile,
    updatePassword,
    updateProfileImage,
    getActiveSessions,
  },
  specializationController: {
    createSpclService,
    listsSpclService,
    getSpclService,
    updateSpclService,
    updateSpclStatusService,
    deleteSpclService,
  },
  doctorController: {
    createDoctor,
    listDoctors,
    getDoctorDetails,
    updateDoctor,
    toggleDoctorStatus,
    deleteDoctor,
  },
  labDoctorController: {
    createLabDoctor,
    listLabDoctors,
  },
  patientController: {
    createPatient,
    listPatients,
    getPatientDetails,
    updatePatient,
    deletePatient,
  },
  categoryController: {
    createCategory,
    listCategory,
    getCategory,
    updateCategory,
    updateCategoryStatus,
    deleteCategory,
  },
  subcategoryController: {
    createSubCategory,
    listSubCategory,
    getSubCategory,
    updateSubCategory,
    updateSubCategoryStatus,
    deleteSubCategory,
  },
  locationController: {
    createLocation,
    listOflocations,
    getLoaction,
    updateLocation,
    updateLocationStatus,
    deleteLoaction,
  },
  sampleTypeController: {
    createTypeService,
    listsTypeService,
    getTypeService,
    updateTypeService,
    updateTypeStatusService,
    deleteTypeService,
  },
  labtestController: {
    createLabTestItem,
    listLabTests,
    getLabTestDetails,
    deleteLabTest,
  },
};
