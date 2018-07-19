var Job = require("./Job.js")

class JobCollection {
    constructor() {
        this.jobs = []
    }

    addJob(job) {
        this.jobs.push(job)

    }

    createJob(employerUrlSlug, description, jobType, salary) {
        var newJob = new Job(employerUrlSlug, description, jobType, salary)
        this.jobs.push(newJob)
    }

    sendToJson (file) {
        var fs = require('fs')
        var jobsStringified = JSON.stringify(this.jobs)
        fs.writeFile(file, jobsStringified, 'utf-8')
    }

    readJobsJson (file) {
        var fs = require('fs')
        var fileContents = fs.readFileSync(file, 'utf-8')
        var data = JSON.parse(fileContents);
        if (data.length > 0) {
            for (var job of data) {
                console.log(job.employer)
                this.createJob(job.employer, job.description, job.jobType, job.salary)
            }
        }
    }
}

module.exports = JobCollection