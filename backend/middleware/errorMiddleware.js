//this will be called when no other middleware have handled the request and set the code to 404
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  //set the status to 404
  res.status(404);
  //pass the error to the next middleware
  next(error);
};
// this overwrites the default error handler of express
const errorHandler = (err, req, res, next) => {
  //set the status to 500 if the status is 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //set the status to the status code
  res.status(statusCode);
  //send the json response
  res.json({
    message: err.message,
    //send the stack trace which can be helpful in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export { notFound, errorHandler };