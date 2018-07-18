var Employee = require("./Employee.js")
var Employer = require("./Employer.js")
var Job = require("./Job.js")
var EmployeeCollection = require("./EmployeeCollection.js")
var EmployerCollection = require("./EmployerCollection.js")
const bodyParser = require('body-parser');
const repl = require("repl")
const express = require('express')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var employerCollection = new EmployerCollection()
var employeeCollection = new EmployeeCollection()
employerCollection.readEmployersJson("employers.json")
employeeCollection.readEmployeesJson("employees.json")

// gets all employers
app.get('/employers', (req, res) => {
    res.statusCode = 200
    res.send(employerCollection.employers)
});

// gets all employees
app.get('/employees', (req, res) => {
    res.statusCode = 200
    res.send(employeeCollection.employees)
});

// gets all jobs
app.get('/jobs', (req, res) => {
    res.statusCode = 200
    res.send(employerCollection.getAllJobs())
})

// creates new employer
app.post('/employers', (req, res) => {
    var name = req.query.name
    var address = req.query.address
    var businessType = req.query.businessType

    if (name == undefined || address == undefined || businessType == undefined) {
        res.statusCode = 400
        res.send("Bad request")
    } else {
        var newEmployer = new Employer(name, address, businessType)
        employerCollection.addEmployer(newEmployer)
        employerCollection.sendToJson("employers.json")
        res.statusCode = 200
        res.send(employerCollection)
    }
})

// creates new employee
app.post('/employees', (req, res) => {
    var name = req.query.name
    var location = req.query.location
    var cv = req.query.cv

    if (name == undefined || location == undefined || cv == undefined) {
        res.statusCode = 400
        res.send("Bad request")
    } else {
        var newEmployee = new Employee(name, location, cv)
        employeeCollection.addEmployee(newEmployee)
        employeeCollection.sendToJson("employees.json")
        res.statusCode = 200
        res.send(employeeCollection)
    }
})

// gets all jobs posted by specific employer
app.get('/employers/:slug/jobs', (req, res) => {
    res.statusCode = 200
    res.send(employerCollection.findByUrlSlug(req.params.slug).postedJobs)
})

// creates new job asscociated to specific employer
app.post('/employers/:slug/jobs', (req, res) => {
    var employer = employerCollection.findByUrlSlug(req.params.slug.toLowerCase())
    var employerUrlSlug = employer.urlSlug()
    console.log(employer)
    var description = req.query.description
    var jobType = req.query.jobType
    var salary = req.query.salary

    var newJob = new Job(employerUrlSlug, description, jobType, salary)
    console.log(newJob)
    employer.addJob(newJob)
    res.statusCode = 200
    res.send(newJob)
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});

const replServer = repl.start("> ")
replServer.context.EmployerCollection = EmployerCollection
replServer.context.EmployeeCollection = EmployeeCollection
replServer.context.Job = Job
replServer.context.Employer = Employer
replServer.context.Employee = Employee

replServer.context.employerCollection = employerCollection
replServer.context.employeeCollection = employeeCollection