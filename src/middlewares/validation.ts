import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();

}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("Address must be a string and not empty!"),
    body("city").isString().notEmpty().withMessage("City must be a string and not empty!"),
    body("phoneNumber").isString().notEmpty().withMessage("Phone Number must be numeric and not empty!"),
    handleValidationErrors,
]