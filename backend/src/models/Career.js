const pool = require('../config/database');

class Career {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM careers');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM careers WHERE id = ?', [
            id,
        ]);
        return rows[0];
    }

    static async create(careerData) {
        const { career_name, career_code, description } = careerData;
        const [result] = await pool.query(
            'INSERT INTO careers (career_name, career_code, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [career_name, career_code, description],
        );
        return { id: result.insertId, ...careerData };
    }

    static async update(id, careerData) {
        const { career_name, career_code, description } = careerData;
        await pool.query(
            'UPDATE careers SET career_name = ?, career_code = ?, description = ?, updated_at = NOW() WHERE id = ?',
            [career_name, career_code, description, id],
        );
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM careers WHERE id = ?', [
            id,
        ]);
        return result.affectedRows > 0;
    }
}

module.exports = Career;
