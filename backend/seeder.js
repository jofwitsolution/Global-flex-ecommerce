require('dotenv').config({ path: 'config/.env' });
const mongoose = require('mongoose');
const colors = require('colors');
const Category = require('./model/category');
const categories = require('./data/categories');
const { connectDatabase } = require('./db/Database');

connectDatabase();

// import data to mongodb
const importData = async () => {
  try {
    await Category.deleteMany();

    const category = await Category.insertMany(categories);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// if -d argument is passed from the console
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
