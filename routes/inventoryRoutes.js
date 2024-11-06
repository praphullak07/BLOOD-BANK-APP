const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController,
     getInventoryController,
      getDonorsController,
       getHospitalController,
        getOrganisationController,
        getOrgForHospController,
        getHospBloodController} = require("../controllers/inventoryController"); 

const router = express.Router();

// Add inventory
router.post('/create-inventory', authMiddleware, createInventoryController);

// Get all blood records 
router.get('/get-inventory', authMiddleware, getInventoryController); 

// Get hospital blood records 
router.post('/get-inventory-hospital', authMiddleware, getHospBloodController);

// Get all donors records 
router.get('/get-donors', authMiddleware, getDonorsController);

// Get all hospitals records 
router.get('/get-hospitals', authMiddleware, getHospitalController);


// Get all organisations records 
router.get('/get-organisation', authMiddleware, getOrganisationController);



// Get all organisations records 
router.get('/get-organisation-for-hospital', authMiddleware, getOrgForHospController);


module.exports = router;
 