const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const createResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data,
    };
};

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json(createResponse(false, error.details[0].message));
        }
        next();
    };
};

module.exports = {
    handleAsync,
    createResponse,
    validateRequest,
};
