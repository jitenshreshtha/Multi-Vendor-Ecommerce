const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    shopName:{type:String,required:true},
    shopDescription:{type:String},
    logoUrl: {type:String},
    status:{type:String,enum:["pending","approved","rejected"],default:"pending"},

},{timestamps:true});

module.exports = mongoose.model("Vendor",vendorSchema);