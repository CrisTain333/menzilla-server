exports.handleGetUser = async (req, res) => {
  return {
    status: 200,
    message: "ok",
    user: {
      name: "sukan",
    },
  };
};
