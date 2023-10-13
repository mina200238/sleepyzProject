const { Router } = require('express');
const ViewService = require('../services/viewService');
const axios = require('axios');
const router = Router();

router.use('/Admin-Categories', ViewService.serveStatic('Admin-Categories'));
router.use('/Admin-Products', ViewService.serveStatic('Admin-Products'));
router.use('/Admin-Orders', ViewService.serveStatic('Admin-Orders'));
router.use('/Cart', ViewService.serveStatic('Cart'));
router.use('/ImageUpload', ViewService.serveStatic('ImageUpload'));
router.use('/Login', ViewService.serveStatic('Login'));
router.use('/SignUp', ViewService.serveStatic('SignUp'));
router.use('/', ViewService.serveStatic('Main'));
router.use('/My-Info', ViewService.serveStatic('My-Info'));
router.use('/Order', ViewService.serveStatic('Order'));
router.use('/Order-History', ViewService.serveStatic('Order-History'));
router.use('/Non-Member-Order-History', ViewService.serveStatic('Non-Member-Order-History'));
router.use('/Order-Completed', ViewService.serveStatic('Order-Completed'));
router.use('/Product', ViewService.serveStatic('Product'));
router.use('/Product-info', ViewService.serveStatic('Product-info'));

module.exports = router;
