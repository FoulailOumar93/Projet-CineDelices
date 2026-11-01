export function validate(schema) {
  return async (req, res, next) => {
    try {
      req.body = await schema.validateAsync(req.body, {
        abortEarly: false,
        convert: true,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
}