const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');


// Find all categories
router.get('/', (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find categories with a specific ID
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(req.body,
      { where: {
        id: req.params.id
      }

    });

    if (!catData) {
      res.status(404).json({message: 'No category found with this id.'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {

  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
