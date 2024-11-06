/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role:{
        type : String,
        require : [true,`what's the role`],
        enum : [`admin`,`organisation`,`user`,`hospital`]
    },
    name : {
        type:String,
        require : function(){
            if(this.role===`user` || this.role===`admin`)
            {
                return true;
            }
            return false;
        }
    },
    organisationName :{
        type: String,
        require : function(){
            if(this.role === `organisation`)
            {
                return true;
            }
            return false;
        }

    },
    hospitalName :{
        type : String,
        require : function(){
            if(this.role === `hospital`)
            {
                return true;
            }
            return false;
        }
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [10, 'Password must be at least 10 characters long'],
    },
    website :{
        type : String

    },
    address : {
        type : String,
        require : [true, `address is required`]
    },
    phone_number : {
        type : String,
        require :[true, 'phone number containing 10 digits']
    }
},{timestamps:true});

module.exports = mongoose.model('users', userSchema);
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, `What's the role`],
        enum: ['donor','admin', 'organisation', 'user', 'hospital']
    },
    name: {
        type: String,
        required: function() {
            return this.role === 'user' || this.role === 'admin';
        },
    },
    organisationName: {
        type: String,
        required: function() {
            return this.role === 'organisation';
        }
    },
    hospitalName: {
        type: String,
        required: function() {
            return this.role === 'hospital';
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
       
    },
    website: {
        type: String,
       
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    phone: {  
        type: String,
        required: [true, 'Phone number is required'],
        
    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
