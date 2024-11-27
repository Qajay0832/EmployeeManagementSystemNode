import express from "express"
import mongoose from "mongoose"
import Employee from "./employeeSchema.js"
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config(); 
const user=process.env.DB_USER;
const pass=process.env.DB_PASSWORD;

const app = express() //initialized express
app.use(express.json())
app.use(cors());

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.u7kjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then((req, res) => {
        console.log('Connected to mongo');
    })
    .catch(err => {
        console.log(err);

    })
app.get("/employee", async (req, res) => {
    try {
        const employees = await Employee.find()
        if (!employees) {
            res.status(404).end("Employees Cannot be Found");
            
        }
        res.status(200).json(employees);
    }
    catch (error) {
        res.send(500, "Employees Cannot be Found due to Server Issues")
    }
})

app.get('/employee/:active/:id', async (req, res) => {
    try {
        const { active, id } = req.params;
        const ActivatedEmployee = await Employee.findOneAndUpdate({ id: id }, { $set: { active: active } })
        if (!ActivatedEmployee) {
            res.status(404).json({ message: `Employee Cannot be ${active ? "Activated" : "Inactivated"}` })
        }
        res.status(200).json({ message: `Employee is ${active ? "Activated" : "Inactivated"} Successfully` })
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: `Employee Cannot be ${active ? "Activated" : "Inactivated"} due to Server Issue` })
    }
})
app.post('/employee', async (req, res) => {
    try {
        const {
            active,
            role,
            name,
            gender,
            dob,
            maritalStatus,
            address,
            expertise,
            experience,
            images,
            email,
            phone,
            linkedin,
            github,
            country,
            projects,
            skills,
            availability,
            achievements,
            languages,
            education,
            interests
        } = req.body.EmployeeDetails

        const newId = await Employee.findOne({ id: 0 })
        if (!newId) {
            res.status(404).json({ message: "New Id Cannot be Generated" })
        }
        const latestId = newId.latestId + 1;
        const newEmployee = new Employee({
            active:active,
            id: newId.latestId,
            role,
            name,
            gender,
            dob,
            maritalStatus,
            address,
            expertise,
            experience,
            images,
            email,
            phone,
            linkedin,
            github,
            country,
            projects,
            skills,
            availability,
            achievements,
            languages,
            education,
            interests
        })
        const UpdateLatestId = await Employee.findOneAndUpdate({ id: 0 }, { $set: { latestId: latestId } })
        if (!UpdateLatestId) {
            res.send(404, { message: "Latest Id cannot be Updated" })
        }
        const createdNewEmployee = await newEmployee.save()
        if (!createdNewEmployee) {
            res.send(404, { message: "Employee Cannot Be Created" })
        }
        res.send(200, { message: createdNewEmployee })
    }
    catch (error) {
        res.send(500, "EMployee Cannot be Created due to Server Issues")
        console.log(error);
    }
})
app.post('/employee/:id', async (req, res) => {
    try {
        const {
            active,
            role,
            name,
            gender,
            dob,
            maritalStatus,
            address,
            expertise,
            experience,
            // images,
            email,
            phone,
            linkedin,
            github,
            country,
            projects,
            skills,
            availability,
            achievements,
            languages,
            education,
            interests
        } = req.body.EmployeeDetails
        const id = req.params.id;
        console.log(id);

        const updatedEmp = await Employee.findOneAndUpdate({ id: id },
            {
                $set: {
                    active:active,
                    role: role,
                    name: name,
                    gender: gender,
                    dob: dob,
                    maritalStatus: maritalStatus,
                    address: address,
                    expertise: expertise,
                    experience: experience,
                    email: email,
                    phone: phone,
                    linkedin: linkedin,
                    github: github,
                    country: country,
                    projects: projects,
                    skills: skills,
                    availability: availability,
                    achievements: achievements,
                    languages: languages,
                    education: education,
                    interests: interests
                }
            })
        if (!updatedEmp) {
            res.send(404, "Employee Cannot Be Updated!")
        }
        res.send(200, { message: updatedEmp })
    }
    catch (error) {
        res.send(500, "Employee Cannot Be Updated due to Server Issues")
        console.log(error);
    }
})

app.delete("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Employee.findOneAndDelete({ id: id })
        if (!response) {
            res.status(404).json({ message: "Employee Not Found" })
        }
        console.log(response);
        res.status(200).json({ message: "success" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server Issues" })

    }

})

app.get('/employeeProfile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ id });
        if (!employee) {
            res.send(404, "Employee Cannot Be Found")
        }
        res.status(200).json(employee)
    }
    catch (error) {
        res.send(500, "Employee Cannot Be Found due to server issues")
        console.log(error);
    }
})
app.listen(3000, () => {
    console.log("listening at port 3000");
})

