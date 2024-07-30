const validateResource = (resourceSchema) => async (req, res, next) => {
    try {
        await resourceSchema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (e) {
        console.error("Validation error:", e);
        return res.status(400).json({ errors: e.errors });
    }
};
export default validateResource;
// import { AnyObjectSchema } from "yup";
// import { Request, Response, NextFunction } from "express";
// const validateResource =
//   (resourceSchema: AnyObjectSchema) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//    try {
//     await resourceSchema.validate({
//       body:req.body
//     })
//     next();
//    } catch (e) {
//     console.error("Validation error:", e);
//     return res.status(400).json({ errors: e.errors });
//    }
//   };
//   export default validateResource;
//# sourceMappingURL=validate.js.map