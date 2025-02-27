import mongoose from "mongoose";
const userSchema =  new mongoose.Schema(
    {
 fullname: {
    type: String,
    required: true
 },
 email: { 
    type: String, 
    required: true,
    unique: true
},
phoneNumber: {
    type: String,
    required: true,
    unique: true
},
password: { 
    type: String,
    required: true
},
role: {
    type: String,
    enum: ["Student", "Recruiter"],
    default: "Student",
    required  :true
},
profile: {
 bio:{
    type: String,
 },
 skills: [{
type: String,
}],
resume:{
    type: String, //url to resume file
},
resumeOriginal:{
    type: String, //original name of resume file
},
Company : {
    type:mongoose.Schema.Types.ObjectId,
    ref: "company",
},
profilePhoto: {
    type: String, //url to profile photo file
    default: "",
},
},
}, {timestamps: true});

export const User = mongoose.model("user", userSchema);