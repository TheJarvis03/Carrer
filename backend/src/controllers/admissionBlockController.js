const AdmissionBlock = require('../models/AdmissionBlock');
const { handleAsync } = require('../utils/crudOperations');

exports.getAllBlocks = handleAsync(async (req, res) => {
  const blocks = await AdmissionBlock.find({})
    .populate('universityId')
    .populate('admissionMethodId');
  
  res.json({
    success: true,
    count: blocks.length,
    data: blocks
  });
});

exports.getBlockById = handleAsync(async (req, res) => {
  const block = await AdmissionBlock.findById(req.params.id)
    .populate('universityId')
    .populate('admissionMethodId');

  if (!block) {
    return res.status(404).json({
      success: false,
      message: 'Admission block not found'
    });
  }

  res.json({
    success: true,
    data: block
  });
});

exports.createBlock = handleAsync(async (req, res) => {
  const block = await AdmissionBlock.create(req.body);
  res.status(201).json({
    success: true,
    data: block
  });
});

exports.updateBlock = handleAsync(async (req, res) => {
  const block = await AdmissionBlock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!block) {
    return res.status(404).json({
      success: false,
      message: 'Admission block not found'
    });
  }

  res.json({
    success: true,
    data: block
  });
});

exports.deleteBlock = handleAsync(async (req, res) => {
  const block = await AdmissionBlock.findByIdAndDelete(req.params.id);

  if (!block) {
    return res.status(404).json({
      success: false,
      message: 'Admission block not found'
    });
  }

  res.json({
    success: true,
    data: {}
  });
});

exports.getBlocksByUniversity = handleAsync(async (req, res) => {
  const blocks = await AdmissionBlock.find({ 
    universityId: req.params.universityId 
  }).populate('admissionMethodId');

  res.json({
    success: true,
    count: blocks.length,
    data: blocks
  });
});

exports.getActiveBlocks = handleAsync(async (req, res) => {
  const blocks = await AdmissionBlock.find({ 
    status: 'active',
    year: new Date().getFullYear()
  }).populate(['universityId', 'admissionMethodId']);

  res.json({
    success: true,
    count: blocks.length,
    data: blocks
  });
});
