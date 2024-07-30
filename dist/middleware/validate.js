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
//# sourceMappingURL=validate.js.map