const userModel = require("../models/userModel");

//get donors list
const getDonorsListController = async (req, res) => {
    console.log("Fetching donors list...");
    try {

      const donorData = await userModel.find({ role: 'donor' }).sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        count: donorData.length,
        msg: 'Donor list fetched successfully',
        donorData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        msg: 'Error in donor list API',
        error
      });
    }
  };

  const getHospitalsListController = async (req, res) => {
    console.log("Fetching donors list...");
    try {

      const hospData = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        count: hospData .length,
        msg: 'Hospital list fetched successfully',
        hospData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        msg: 'Error in hospital list API',
        error
      });
    }
  };
   


  //get org list 

  const getOrgListController = async (req, res) => {
    console.log("Fetching donors list...");
    try {

      const orgData = await userModel.find({ role: 'organisation' }).sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        count: orgData.length,
        msg: 'Organisation list fetched successfully',
        orgData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        msg: 'Error in organisation list API',
        error
      });
    }
  };


  //delete donor controller
  const deleteFieldsController = async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            msg:`this record got deleted`
        })


    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send({
            success : false,
            msg : `error while deleting this record`,
            error
        })
    }

  }
  

  module.exports = {getDonorsListController,getHospitalsListController,getOrgListController,deleteFieldsController}
  