const yup = require('yup');
const mongoose = require('mongoose');

async function validateProductCreate(data) {
  // Define the validation schema for the create product request body
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Product name is required')
      .label('Product name'),
    briefDescription: yup
      .string()
      .required('Brief description is required')
      .label('Brief description'),
    fullDescription: yup
      .string()
      .required('Full description is required')
      .label('Full description'),
    category: yup
      .string()
      .test('Category', 'Invalid Category', function (value) {
        if (!value) {
          return false;
        }
        return mongoose.Types.ObjectId.isValid(value);
      })
      .required('Select Category')
      .label('Category'),
    tags: yup.string().max(100).label('Tags'),
    brand: yup.string().max(50).label('Brand'),
    originalPrice: yup
      .number()
      .min(1, 'You must provide a valid price')
      .required('Product price is required')
      .label('Original Price'),
    discountPrice: yup
      .number()
      .min(1, 'You must provide a valid discount price')
      .required('Discount price is required')
      .label('Discount Price'),
    numberInStock: yup
      .number()
      .min(0)
      .required('Number in stock is required')
      .label('Number in Stock'),
  });

  try {
    const validationData = await schema.validate(data);
    return null;
  } catch (error) {
    console.log(error.errors[0]);
    return error?.errors[0];
  }
}

async function validateProductUpdate(data) {
  // Define the validation schema for the update product request body
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Product name is required')
      .label('Product name'),
    briefDescription: yup
      .string()
      .required('Brief description is required')
      .label('Brief description'),
    fullDescription: yup
      .string()
      .required('Full description is required')
      .label('Full description'),
    category: yup
      .string()
      .test('Category', 'Invalid Category', function (value) {
        if (!value) {
          return false;
        }
        return mongoose.Types.ObjectId.isValid(value);
      })
      .required('Select Category')
      .label('Category'),
    tags: yup.string().max(100).label('Tags'),
    brand: yup.string().max(50).label('Brand'),
    originalPrice: yup
      .number()
      .min(1, 'You must provide a valid price')
      .required('Product price is required')
      .label('Original Price'),
    discountPrice: yup
      .number()
      .min(1, 'You must provide a valid discount price')
      .required('Discount price is required')
      .label('Discount Price'),
    numberInStock: yup
      .number()
      .min(0)
      .required('Number in stock is required')
      .label('Number in Stock'),
  });

  try {
    const validationData = await schema.validate(data);
    return null;
  } catch (error) {
    console.log(error.errors[0]);
    return error?.errors[0];
  }
}

async function validateShopLogin(data) {
  // Define the validation schema for the login request body
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Provide a valid email')
      .required('Email is required')
      .label('Email'),
    password: yup.string().required('Password is required').label('Password'),
  });

  try {
    const validationData = await schema.validate(data);
    // console.log(validationData);
    return null;
  } catch (error) {
    console.log(error.errors[0]);
    return error?.errors[0];
  }
}

module.exports.validateProductCreate = validateProductCreate;
module.exports.validateProductUpdate = validateProductUpdate;
module.exports.validateShopLogin = validateShopLogin;
