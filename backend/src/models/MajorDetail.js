const mongoose = require('mongoose');

const majorDetailSchema = new mongoose.Schema(
  {
    major_code: {
      type: String,
      required: true,
    },
    major_name: {
      type: String,
      required: true 
    },
    description: {
      type: String,
      default: 'Không có nội dung'
    },
    job_opportunities: {
      type: String, 
      default: 'Không có nội dung'
    },
    salary_range: {
      type: String,
      default: 'Không có nội dung'
    }
  },
  {
    collection: 'majordetail', 
    timestamps: true
  }
);

module.exports = mongoose.model('MajorDetail', majorDetailSchema);
