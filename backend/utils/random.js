module.exports.randomNumber = function () {
  const min = 1000; // Minimum number
  const max = 2000000; // Maximum number
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
};
