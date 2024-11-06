const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, 'Inventory type is required'],
      enum: ['in', 'out'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
    },
    email:{
      type:String,
      required:[true,'donor email is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Blood quantity is required']
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required : function(){
        return this.inventoryType==='in';
      }
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
        return this.inventoryType === 'out';
      },
    },
    donor: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'users',
         required: function () {
         return this.inventoryType === 'in';
        }, 
     },
    },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
