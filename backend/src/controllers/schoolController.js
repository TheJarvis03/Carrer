const School = require('../models/School');

const schoolController = {
    // Get all schools
    getAllSchools: async (req, res) => {
        try {
            const schools = await School.find();
            res.json(schools);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get school by ID
    getSchoolById: async (req, res) => {
        try {
            const school = await School.findOne({ school_id: req.params.id });
            if (!school) {
                return res.status(404).json({ message: 'School not found' });
            }
            res.json(school);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create new school
    createSchool: async (req, res) => {
        try {
            const { school_id, school_name, location, school_type, ownership } = req.body;

            // Validate required fields
            if (!school_id || !school_name || !location || !school_type || !ownership) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check duplicate school_id
            const existingSchool = await School.findOne({ school_id });
            if (existingSchool) {
                return res.status(400).json({ message: 'School ID already exists' });
            }

            const school = new School({
                school_id,
                school_name,
                location,
                school_type,
                ownership
            });
            const savedSchool = await school.save();
            res.status(201).json(savedSchool);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update school
    updateSchool: async (req, res) => {
        try {
            const { school_id } = req.body;
            if (school_id) {
                // Check if new school_id already exists
                const existingSchool = await School.findOne({ 
                    school_id, 
                    _id: { $ne: req.params.id } 
                });
                if (existingSchool) {
                    return res.status(400).json({ message: 'School ID already exists' });
                }
            }

            const updatedSchool = await School.findOneAndUpdate(
                { school_id: req.params.id },
                { ...req.body, updatedAt: Date.now() },
                { new: true }
            );
            if (!updatedSchool) {
                return res.status(404).json({ message: 'School not found' });
            }
            res.json(updatedSchool);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete school
    deleteSchool: async (req, res) => {
        try {
            const deletedSchool = await School.findOneAndDelete({ school_id: req.params.id });
            if (!deletedSchool) {
                return res.status(404).json({ message: 'School not found' });
            }
            res.json({ message: 'School deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = schoolController;
