class Job {
    constructor (employerUrlSlug, description, jobType, salary) {
        this.employer = employerUrlSlug
        this.description = description
        this.jobType = jobType
        this.salary = salary
        this.postedAt = new Date()
        this.accepted = false
        this.givenTo = null
        this.applicants = []
    }
}

module.exports = Job