var Job = require("./Job.js")

class Employer {
    constructor(name, address, businessType) {
        this.name = name
        this.address = address
        this.businessType = businessType
    }

    postJob(description, jobType, salary) {
        var newJob = new Job(this, description, jobType, salary)
    }

    acceptApplicant(job, applicant) {
        job.accepted = true // set job accepted to true
        job.givenTo = applicant // show who the job has been assigned to
        applicant.previousJobs.push(job) // add the job to the successful applicant's previous jobs
        var jobIndex = this.postedJobs.indexOf(job)
        this.postedJobs.pop(jobIndex, 1) // remove job from posted jobs
    }

    getPostedJobs(jobCollection) {
        var postedJobs = []
        for (var job of jobCollection.jobs) {
            if (job.employer == this.urlSlug()) {
                postedJobs.push(job)
            }
        }
        return postedJobs
    }

    urlSlug() {
        return this.name.toLowerCase().replace(' ', '_')
    }
}

module.exports = Employer