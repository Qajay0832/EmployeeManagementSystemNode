import mongoose from "mongoose"
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    active:{
        type:Boolean,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    role: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    expertise: {
        type:String,
        required:true
    },
    experience: {
        type:Number,
        required:true
    },
    images: {
        type: "String"
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    linkedin: {
        type:String,
        required:true
    },
    github: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    projects: [
      {
        projectName: {
            type:String,
            required:true
        },
        projectDetails:{
            type:String,
            required:true
        },
        projectUsed:{
            type:String,
            required:true
        },
        projectYear:{
            type:String,
            required:true
        },
        projectUrl: {
            type:String,
            required:true
        },
        role: {
            type:String,
            required:true
        }
      }
    ],
    skills: {
        type:[String],
        required:true
    },
    availability:  {
        type:String
    },
    achievements:  {
        type:String
    },
    languages: {
        type:[String],
        required:true
    },
    education: [
      {
        degree: {
            type:String,
            required:true
        },
        field: {
            type:String,
            required:true
        },
        institution: {
            type:String,
            required:true
        },
        year: {
            type:String,
            required:true
        },
      },
    ],
    interests: {
        type:[String],
        required:true
    },
    latestId:{
        type:Number,
        required:false
    }
  }, { timestamps: true })


const Employee = mongoose.model('Employee', employeeSchema)
export default Employee