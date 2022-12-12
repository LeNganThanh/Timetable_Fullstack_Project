export const adminValidation = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    if (req.user._id.toString() === req.params.id) {
      next();
    } else {
      const error = new Error("unauthorized access");
      error.status = 403;
      next(error);
    }
  }
};
