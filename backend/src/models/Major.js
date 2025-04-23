const mongoose = require('mongoose');

const majorDetailSchema = new mongoose.Schema({
  major_id: String,
  major_code: String,
  major_name: String,
  description: String
});

const majorSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
    unique: true
  },
  group_name: {
    type: String,
    required: true
  },
  majors: [majorDetailSchema]
});

module.exports = mongoose.model('Major', majorSchema);
