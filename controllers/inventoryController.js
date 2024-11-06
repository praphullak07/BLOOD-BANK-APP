const { mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity, organisation } = req.body; 
    // Validate request body
    if (!email || !inventoryType || !bloodGroup || !quantity) {
      return res.status(400).send({ success: false, msg: "All fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    // Check inventory type and user role
    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(403).send({ success: false, msg: "Only hospital accounts can create 'out' inventory" });
    }
    if (inventoryType === "in" && user.role !== "donor") {
      return res.status(403).send({ success: false, msg: "Only donor accounts can create 'in' inventory" });
    }

    // Use ObjectId for organisation only if provided
    const orgId = new mongoose.Types.ObjectId(organisation)

    if (inventoryType === 'out') {
      const requestedQuantity = quantity;

      // Calculate total 'in' blood quantity for the requested blood group
      const totalInRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation: orgId,
            inventoryType: 'in',
            bloodGroup
          }
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' }
          }
        }
      ]);

      const totalIn = totalInRequestedBlood[0]?.total || 0;

      // Calculate total 'out' blood quantity for the requested blood group
      const totalOutRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation: orgId,
            inventoryType: 'out',
            bloodGroup
          }
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' }
          }
        }
      ]);

      const totalOut = totalOutRequestedBlood[0]?.total || 0;

      // Calculate available quantity
      const availableQuantity = totalIn - totalOut;

      // Quantity validation
      if (availableQuantity < requestedQuantity) {
        return res.status(400).send({
          success: false,
          msg: `Only ${availableQuantity} ml of ${bloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user._id; 
    } else {
      req.body.donor = user._id; // Assign donor ID if inventory type is 'in'
    }

    // Save inventory if quantity validation passes
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      msg: 'New blood record added successfully',
    });
  } catch (error) {
    console.error("Error in createInventoryController:", error);
    

    return res.status(500).send({
      success: false,
      msg: 'Internal server error. Please try again later.',
    });
  }
};


// Get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.user._id }) 
      .populate("donor", "name email") 
      .populate("hospital", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      msg: 'Records successfully retrieved',
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: 'Error in fetching inventory records',
      error: error.message,
    });
  }
};


// Get Hospital blood records
const getHospBloodController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters) 
      .populate("donor", "name email") 
      .populate("hospital", "name email")
      .populate("organisation", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      msg: 'Records of consumer in hospitals  successfully retrieved',
      inventory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: 'Error in fetching consumer records',
      error: error.message,
    });
  }
};


//get donor records

const getDonorsController = async(req,res)=>{
  try{

    const organisation = req.body.userId
    //find donor
    const donorId = await inventoryModel.distinct('donor',{
       organisation
    });
    //console.log(donorId);
    const donors = await userModel.find({_id :{
      $in : donorId
    }})
    return res.status(200).send({
      success : true,
      msg : `donor record successfully fetched`,
      donors
    })
  }
  catch(error)
  {
      console.log(error);
      return res.status(500).send({
        success: false,
        msg : `error in donor records` ,
        error
      })
  }
   
}
 

//get all hospitals records
const getHospitalController = async(req,res)=>{
  try{ 
    const organisation = req.body.userId
    //get hospitalID

    const hospitalId = await inventoryModel.distinct('hospital',{
      organisation
    })

    //find hospital

    const hospitals = await userModel.find({
      _id : {$in : hospitalId}
    })
    return res.status(200).send({
      success :true,
      msg : `hospital data fetched successfully`,
      hospitals
    })

  }
  catch(error)
  {
    console.log(error);
    return res.status(500).send({
      success :false,
      msg : `error in getting hospital API`,
      error
    })
  }
};

//get all organisation records
const getOrganisationController = async (req, res) => {
  try {
      
      const donor = req.body.userId;

      const orgIds = await inventoryModel.distinct('organisation', {donor });

      const organisations = await userModel.find({ 
        _id: { $in: orgIds },
        role: { $in : "organisation"}
      });


      return res.status(200).send({
          success: true,
          msg: 'Organisation data fetched successfully',
          organisations,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).send({
          success: false,
          msg: 'Error in getting the organisation API',
          error,
      });
  }
};

//get all organisations for hospital records
const getOrgForHospController = async (req, res) => {
  try {
      
      const hospital = req.body.userId;

      const orgIds = await inventoryModel.distinct('organisation', {hospital });

      const organisations = await userModel.find({ 
        _id: { $in: orgIds },
        role: { $in : "organisation"}
      });


      return res.status(200).send({
          success: true,
          msg: 'Hospital Organisation data fetched successfully',
          organisations,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).send({
          success: false,
          msg: 'Error in getting the hospital organisation API',
          error,
      });
  }
};


module.exports = { createInventoryController,
   getInventoryController,
   getDonorsController,
   getHospitalController,
   getOrganisationController,
   getOrgForHospController,
   getHospBloodController};



