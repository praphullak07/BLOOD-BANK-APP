const { mongoose } = require('mongoose');
const inventoryModel = require("../models/inventoryModel");

const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId); 

        // Get single blood group data
        await Promise.all(bloodGroups.map(async (bloodGroup) => {

            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation 
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' } 
                    }
                }
            ]);

            console.log(`Total In for ${bloodGroup}:`, totalIn); 

            // Count total 'out'
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation 
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' } 
                    }
                }
            ]);

            console.log(`Total Out for ${bloodGroup}:`, totalOut); 

            // Calculate available blood
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // Push data
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood
            });
        }));

        return res.status(200).send({
            success: true,
            msg: 'Blood group data fetched successfully',
            data: bloodGroupData 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            msg: 'Error in blood group analytical data',
            error: error.message
        });
    }
};

module.exports = { bloodGroupDetailsController };
