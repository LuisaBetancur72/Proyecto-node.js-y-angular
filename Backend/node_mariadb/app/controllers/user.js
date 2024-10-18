const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const DirectoryModel = require('../models/users');
const directories = new DirectoryModel();

class DirectoryController {

    async createUser(req, res) {
        const { name_user, lastname, document_type, number_document, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalido el formato del correo" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "la contraseña debe tener 8 caracteres, numeros, y caracter especial" });
        }

        const status = await directories.createUser(name_user, lastname, document_type, number_document, email, password);
        if (status) {
            res.json({ success: true, message: "Usuario Regristrado" });
        } else {
            res.status(500).json({ error: "Error al registrar usuario" });
        }
    }
    

    async getUserById(req, res) {
        const { id } = req.query;
        const info = await directories.getUserById(id);
        if (info) {
            res.json(info);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }
    async loginUser(req, res) {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Buscar usuario por email
        const user = await directories.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'mySecretKey',  // Clave secreta (debería estar en un archivo .env)
            { expiresIn: '1h' }
        );

        res.json({ token });
    }


    async getAllUsers(req, res) {
        const info = await directories.getAllUsers();
        res.json(info);
    }
}

module.exports = DirectoryController;
