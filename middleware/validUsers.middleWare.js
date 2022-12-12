import { check, validationResult } from "express-validator";

export const userValidation = [
  check("firstName")
    .escape()
    .trim()
    .isLength({ min: 2 })
    .withMessage("FirstName should be longer than 2 letters.")
    .isLength({ max: 20 })
    .withMessage("Username should not be longer than 20 letters."),
  check("lastName")
    .escape()
    .trim()
    .isLength({ min: 2 })
    .withMessage("LastName should be longer than 2 letters.")
    .isLength({ max: 20 })
    .withMessage("LastName should not be longer than 20 letters."),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide the valid email."),
  check("password")
    .exists()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be more than 5 characters.")
    .isLength({ max: 20 })
    .withMessage("Password should not be too."),
  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else {
      const error = result.errors.reduce((acc, cur) => {
        acc[cur.param] = cur.msg;
        return acc;
      }, {});
      next({ message: error });
    }
  },
];
