const authWrapper = (auth) => {
  const func = async (req, res, next) => {
    try {
      const result = await auth(req, res, next);
      if (auth.name === "logout") {
        return res.status(204).json();
      } else {
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = authWrapper;