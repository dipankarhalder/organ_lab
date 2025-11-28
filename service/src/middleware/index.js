module.exports = {
  authToken: require('./auth.middleware'),
  uploadMedia: require('./upload.middleware'),
  authRole: require('./role.middleware'),
  authValid: require('./validate.middleware'),
  checkLocation: require('./location.middleware'),
};
