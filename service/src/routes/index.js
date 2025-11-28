const express = require('express');
const router = express.Router();

const { role } = require('../constant');
const {
  authValidation,
  specializationValidation,
  categoryValidation,
  subcategoryValidation,
  doctorValidation,
  patientValidation,
  locationValidation,
  sampleTypeValidation,
  labtestValidation,
} = require('../validation');
const {
  authenticateController,
  profileController,
  specializationController,
  categoryController,
  subcategoryController,
  doctorController,
  labDoctorController,
  patientController,
  locationController,
  sampleTypeController,
  labtestController,
} = require('../controllers');
const {
  authToken,
  authRole,
  authValid,
  checkLocation,
  uploadMedia,
} = require('../middleware');
const { SUPER, ADMIN, STAFF } = role.userRole;

/* Authentication */
router.post(
  '/auth/signin',
  authValid(authValidation.userLoginSchema),
  authenticateController.userSignin,
);
router.post(
  '/auth/signup',
  uploadMedia.single('profileImage'),
  authValid(authValidation.userInfoSchema),
  authenticateController.userSignup,
);
router.post('/auth/signout', authenticateController.userSignout);
router.post('/auth/refresh-token', authenticateController.refreshToken);

/* Locations */
router.post(
  '/location/new',
  authValid(locationValidation.locationSchema),
  locationController.createLocation,
);
router.get('/location/list', locationController.listOflocations);
router.get(
  '/location/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  locationController.getLoaction,
);
router.patch(
  '/location/:id',
  authToken,
  authRole([SUPER]),
  authValid(locationValidation.locationSchema),
  locationController.updateLocation,
);
router.patch(
  '/location/:id/status',
  authToken,
  authRole([SUPER]),
  locationController.updateLocationStatus,
);
router.delete(
  '/location/:id',
  authToken,
  authRole([SUPER]),
  locationController.deleteLoaction,
);

/* Profile */
router.get(
  '/:locationId/profile/me',
  authToken,
  checkLocation,
  profileController.userProfile,
);
router.get(
  '/:locationId/profile/sessions',
  authToken,
  profileController.getActiveSessions,
);
router.get(
  '/:locationId/profile/list',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  profileController.userAllProfile,
);
router.patch(
  '/:locationId/profile/update-password',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  authValid(authValidation.passwordSchema),
  profileController.updatePassword,
);
router.patch(
  '/:locationId/profile/update-profile-image',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  uploadMedia.single('profileImage'),
  profileController.updateProfileImage,
);

/* Specialization */
router.post(
  '/specialization/new',
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(specializationValidation.specializationSchema),
  specializationController.createSpclService,
);
router.get(
  '/specialization/list',
  authToken,
  authRole([SUPER, ADMIN]),
  specializationController.listsSpclService,
);
router.get(
  '/specialization/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  specializationController.getSpclService,
);
router.patch(
  '/specialization/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(specializationValidation.specializationSchema),
  specializationController.updateSpclService,
);
router.patch(
  '/specialization/:id/status',
  authToken,
  authRole([SUPER, ADMIN]),
  specializationController.updateSpclStatusService,
);
router.delete(
  '/specialization/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  specializationController.deleteSpclService,
);

/* category */
router.post(
  '/category/new',
  authToken,
  authRole([SUPER, ADMIN]),
  uploadMedia.single('image'),
  authValid(categoryValidation.categoryInfoSchema),
  categoryController.createCategory,
);
router.get(
  '/category/list',
  authToken,
  authRole([SUPER, ADMIN]),
  categoryController.listCategory,
);
router.get(
  '/category/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  categoryController.getCategory,
);
router.patch(
  '/category/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  uploadMedia.single('image'),
  categoryController.updateCategory,
);
router.patch(
  '/category/:id/status',
  authToken,
  authRole([SUPER, ADMIN]),
  categoryController.updateCategoryStatus,
);
router.delete(
  '/category/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  categoryController.deleteCategory,
);

/* subcategory */
router.post(
  '/subcategory/new',
  authToken,
  authRole([SUPER, ADMIN]),
  uploadMedia.single('image'),
  authValid(subcategoryValidation.subcategoryInfoSchema),
  subcategoryController.createSubCategory,
);
router.get(
  '/subcategory/list',
  authToken,
  authRole([SUPER, ADMIN]),
  subcategoryController.listSubCategory,
);
router.get(
  '/subcategory/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  subcategoryController.getSubCategory,
);
router.patch(
  '/subcategory/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  uploadMedia.single('image'),
  subcategoryController.updateSubCategory,
);
router.patch(
  '/subcategory/:id/status',
  authToken,
  authRole([SUPER, ADMIN]),
  subcategoryController.updateSubCategoryStatus,
);
router.delete(
  '/subcategory/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  subcategoryController.deleteSubCategory,
);

/* sampletype */
router.post(
  '/sampleType/new',
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(sampleTypeValidation.sampleTypeSchema),
  sampleTypeController.createTypeService,
);
router.get(
  '/sampleType/list',
  authToken,
  authRole([SUPER, ADMIN]),
  sampleTypeController.listsTypeService,
);
router.get(
  '/sampleType/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  sampleTypeController.getTypeService,
);
router.patch(
  '/sampleType/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  sampleTypeController.updateTypeService,
);
router.patch(
  '/sampleType/:id/status',
  authToken,
  authRole([SUPER, ADMIN]),
  sampleTypeController.updateTypeStatusService,
);
router.delete(
  '/sampleType/:id',
  authToken,
  authRole([SUPER, ADMIN]),
  sampleTypeController.deleteTypeService,
);

/* doctor */
router.post(
  '/:locationId/doctor/new',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  authValid(doctorValidation.doctorSchema),
  doctorController.createDoctor,
);
router.get(
  '/:locationId/doctor/list',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  doctorController.listDoctors,
);
router.get(
  '/:locationId/doctor/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  doctorController.getDoctorDetails,
);
router.patch(
  '/:locationId/doctor/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  authValid(doctorValidation.doctorUpdateSchema),
  doctorController.updateDoctor,
);
router.patch(
  '/:locationId/doctor/details/:id/status',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  doctorController.toggleDoctorStatus,
);
router.delete(
  '/:locationId/doctor/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  doctorController.deleteDoctor,
);

/* lab-doctor */
router.post(
  '/:locationId/lab-doctor/new',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  authValid(doctorValidation.labDoctorSchema),
  labDoctorController.createLabDoctor,
);
router.get(
  '/:locationId/lab-doctor/list',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  labDoctorController.listLabDoctors,
);

/* patient */
router.post(
  '/:locationId/patient/new',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  authValid(patientValidation.patientSchema),
  patientController.createPatient,
);
router.get(
  '/:locationId/patient/list',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  patientController.listPatients,
);
router.get(
  '/:locationId/patient/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  patientController.getPatientDetails,
);
router.patch(
  '/:locationId/patient/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  patientController.updatePatient,
);
router.delete(
  '/:locationId/patient/details/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  patientController.deletePatient,
);

/* lab test */
router.post(
  '/:locationId/labtest/new',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  authValid(labtestValidation.labTestSchema),
  labtestController.createLabTestItem,
);
router.get(
  '/:locationId/labtest/list',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  labtestController.listLabTests,
);
router.get(
  '/:locationId/labtest/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN, STAFF]),
  labtestController.getLabTestDetails,
);
router.delete(
  '/:locationId/labtest/:id',
  authToken,
  checkLocation,
  authRole([SUPER, ADMIN]),
  labtestController.deleteLabTest,
);

module.exports = {
  rootApiRouter: router,
};
