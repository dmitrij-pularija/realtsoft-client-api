const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      const result = await ctrl(req, res, next);
      return res.status(200).json(result);
    } catch (error) {
      if (error.response.status === 404) {
        return res.status(200).json([]);
      } else {
        next(error);
      }
    }
  };
  return func;
};

module.exports = ctrlWrapper;