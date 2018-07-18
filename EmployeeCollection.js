var Employee = require("./Employee.js")

class EmployeeCollection {
    constructor () {
        this.employees = []
    }

    createEmployee(name, location, cv) {
        var newEmployee = new Employee(name, location, cv)
        this.employees.push(newEmployee)
    }

    addEmployee (employee) {
        this.employees.push(employee)
    }

    sendToJson (file) {
        var fs = require('fs')
        var employeesStringified = JSON.stringify(this.employees)
        fs.writeFile(file, employeesStringified, 'utf-8')
    }

    readEmployeesJson (file) {
        var fs = require('fs')
        var fileContents = fs.readFileSync(file, 'utf-8')
        var data = JSON.parse(fileContents);
        if (data.length > 0) {
            for (var employee of data) {
                this.createEmployee(employee.name, employee.location, employee.cv)
            }
        }
    }
}

module.exports = EmployeeCollection