const categoryController = {
  categoryList: async (req, res) => {
    // Placeholder for listing categories
    res.send("Placeholder for category list");
  },

  categoryDetail: async (req, res) => {
    const categoryId = req.params.categoryId;
    // Placeholder for category detail
    res.send(`Placeholder for category detail for ID: ${categoryId}`);
  }
};

module.exports = categoryController;
