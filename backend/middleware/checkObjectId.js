import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  // if invalid id is passed in url then throw error
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
