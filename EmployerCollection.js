var Employer = require("./Employer.js")

class EmployerCollection {
    constructor () {
        this.employers = []
    }

    createEmployer(name, address, businessType) {
        var newEmployer = new Employer(name, address, businessType)
        this.employers.push(newEmployer)
    }

    addEmployer (employer) {
        this.employers.push(employer)
    }

    getAllJobs () {
        var allJobs = []
        for (var employer of this.employers) {
            for (var job of employer.postedJobs) {
                allJobs.push(job)
            }
        }
        return allJobs
    }

    findByUrlSlug (slug) {
        var result;
        for (var employer of this.employers) {
            if (employer.urlSlug() == slug) {
                result = employer
            }
        }
        return result;
    }

    sendToJson (file) {
        var fs = require('fs')
        var employersStringified = JSON.stringify(this.employers, null, 4)
        fs.writeFile(file, employersStringified, 'utf-8')
    }

    readEmployersJson (file) {
        var fs = require('fs')
        var fileContents = fs.readFileSync(file, 'utf-8')
        var data = JSON.parse(fileContents);
        if (data.length > 0) {
            for (var employer of data) {
                this.createEmployer(employer.name, employer.address, employer.businessType)
            }
        }
    }
}

module.exports = EmployerCollection