const Joi = require("@hapi/joi");

const templateSchema = Joi.object({
  name: Joi.string()
    .required()
    .label("Template Name"),
  fileType: Joi.string()
    .required()
    .label("File Type"),
  fileSize: Joi.string()
    .required()
    .label("File Size"),
  backgroundColor: Joi.string()
    .required()
    .label("Background Color"),
});

module.exports = { templateSchema };
