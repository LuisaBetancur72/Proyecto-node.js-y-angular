const bcrypt = require('bcrypt');
const config = require('../../config/config');
const pool = config.pool;

class DirectoryModel {
    async createUser(name_user, lastname, document_type, number_document, email, password) {
        let status = false;
        try {
            const conn = await pool.getConnection();
            
            const hashedPassword = await bcrypt.hash(password, 8);

            const res = await conn.query(
                "INSERT INTO users (name_user, lastname, document_type, number_document, email, password) VALUES (?,?,?,?,?,?)",
                [name_user, lastname, document_type, number_document, email, hashedPassword]
            );
            if (res.affectedRows == 1) {
                status = true;
            }
        } catch (error) {
            console.log(error);
        }
        return status;
    }

    async getUserByEmail(email) {
        let data = null;
        try {
            const conn = await pool.getConnection();
            const res = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
            data = res.length ? res[0] : null;
        } catch (error) {
            console.log(error);
        }
        return data;
    }
}
module.exports = DirectoryModel;
