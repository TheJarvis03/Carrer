const AdmissionMethod = require('../models/AdmissionMethod');
const { handleAsync } = require('../utils/crudOperations');

exports.getAllMethods = handleAsync(async (req, res) => {
  const methods = await AdmissionMethod.find({});
  res.json({
    success: true,
    count: methods.length,
    data: methods
  });
});

exports.getMethodById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const method = await AdmissionMethod.findById(id);
  if (!method) {
    return res.status(404).json({
      success: false,
      message: 'Admission method not found'
    });
  }
  res.json({
    success: true,
    data: method
  });
});

exports.createMethod = handleAsync(async (req, res) => {
  const method = await AdmissionMethod.create(req.body);
  res.status(201).json({
    success: true,
    data: method
  });
});

exports.updateMethod = handleAsync(async (req, res) => {
  const { id } = req.params;
  const method = await AdmissionMethod.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!method) {
    return res.status(404).json({
      success: false,
      message: 'Admission method not found'
    });
  }
  res.json({
    success: true,
    data: method
  });
});

exports.deleteMethod = handleAsync(async (req, res) => {
  const { id } = req.params;
  const method = await AdmissionMethod.findByIdAndDelete(id);
  if (!method) {
    return res.status(404).json({
      success: false,
      message: 'Admission method not found'
    });
  }
  res.json({
    success: true,
    data: {}
  });
});
