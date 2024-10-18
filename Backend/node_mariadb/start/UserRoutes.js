const express = require('express');
const router = express.Router();
const User = require('../app/controllers/user');
const verifyToken = require('../middleware/jwt');
const userRoutes = new User;


router.post('/create', (req, res) => userRoutes.createUser(req, res));
router.get('/getById', (req, res) => userRoutes.getUserById(req, res));
router.get('/getAll', (req, res) => userRoutes.getAllUsers(req, res));

router.post('/login', (req, res) => userRoutes.loginUser(req, res));
router.get('/getAll', verifyToken, (req, res) => userRoutes.getAllUsers(req, res));


module.exports = router;
