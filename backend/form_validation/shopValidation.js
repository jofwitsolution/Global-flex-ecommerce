const yup = require('yup');

async function validateShopCreate(data) {
  // Define the validation schema for the create shop request body
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5)
      .max(60)
      .required('Shop name is required')
      .label('Shop name'),
    email: yup
      .string()
      .email('Provide a valid email address')
      .required('Email is required')
      .label('Email'),
    password: yup
      .string()
      .min(10)
      .max(16)
      .required('Password is required')
      .label('Password'),
    address: yup
      .string()
      .min(5)
      .max(100)
      .required('Address is required')
      .label('Address'),
    zipCode: yup
      .string()
      .max(30)
      .required('Zip Code is required')
      .label('Zip Code'),
    phoneNumber: yup
      .string()
      .test('Phone number', 'Invalid phone number', function (value) {
        return /^\+?[0-9]\d{1,14}$/.test(value);
      })
      .required('Phone number is required')
      .label('Phone number'),
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

async function validateShopProfile(data) {
  // Define the validation schema for the update profile request body
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5)
      .max(60)
      .required('Shop name cannot be empty')
      .label('Shop name'),
    phoneNumber: yup
      .string()
      .min(9, 'Phone number cannot be less than 9 characters')
      .required('You must provide a valid phone number')
      .label('Phone number'),
    address: yup
      .string()
      .max(100)
      .required('You must provide an address')
      .label('Address'),
    zipCode: yup
      .string()
      .max(10)
      .required('You must provide a Zip Code')
      .label('Zip Code'),
    description: yup
      .string()
      .max(1000, 'Description should not be more than 1000 characters')
      .required('You must provide a description')
      .label('Description'),
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

module.exports.validateShopCreate = validateShopCreate;
module.exports.validateShopLogin = validateShopLogin;
module.exports.validateShopProfile = validateShopProfile;
