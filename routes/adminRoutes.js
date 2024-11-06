const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { getDonorsListController, getHospitalsListController, getOrgListController, deleteFieldsController } = require('../controllers/adminController');

const routers = express.Router();
//routes
routers.get('/donor-list',authMiddleware,adminMiddleware ,getDonorsListController);
routers.get('/hospital-list',authMiddleware,adminMiddleware ,getHospitalsListController );
routers.get('/organisation-list',authMiddleware,adminMiddleware ,getOrgListController );

//delete donor
routers.delete('/delete-fields/:id',authMiddleware,adminMiddleware ,deleteFieldsController );

module.exports = routers;