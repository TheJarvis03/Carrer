const Career = require('../models/Career');
const { handleAsync } = require('../utils/crudOperations');

exports.getAllCareers = handleAsync(async (req, res) => {
  const careers = await Career.findAll();
  res.json(careers);
});

exports.getCareerById = handleAsync(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) return res.status(404).json({ message: 'Career not found' });
  res.json(career);
});

exports.createCareer = handleAsync(async (req, res) => {
  const career = await Career.create(req.body);
  res.status(201).json(career);
});

exports.updateCareer = handleAsync(async (req, res) => {
  const career = await Career.update(req.params.id, req.body);
  if (!career) return res.status(404).json({ message: 'Career not found' });
  res.json(career);
});

exports.deleteCareer = handleAsync(async (req, res) => {
  const result = await Career.delete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Career not found' });
  res.status(204).send();
});
