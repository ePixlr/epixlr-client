const { templateSchema } = require("./schema");

const validateTemplate = (data) => {
  const { error } = templateSchema.validate(data);
  if (error) {
    return {
      error: error.details[0].message,
      path: error.details[0].path[0],
      status: false,
    };
  } else {
    return { error: null, path: null, status: true };
  }
};

module.exports = { validateTemplate };
