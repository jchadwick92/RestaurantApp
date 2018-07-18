class Employee {
    constructor (name, location, cv) {
        this.name = name
        this.location = location
        this.cv = cv
        this.previousJobs = []
        this.rating = null
    }

    applyForJob(job) {
        job.applicants.push(this)
    }
}

module.exports = Employee