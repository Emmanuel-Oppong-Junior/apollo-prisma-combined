//write customize error here
const errorHandler = (err) => {
  //check if error is a prisma error
  if (err.message.includes("prisma")) {
    err.message = "Invalid Database Query";
  }
  //check if error is a validation error
  if (err.message.includes("validation")) {
    err.message = "Input Validation Error";
  }
  return err;
};

module.exports = errorHandler;
