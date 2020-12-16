const expect        = require('chai').expect
const fs            = require('fs')
const jobs          = require('../../src/scrape/jobs/process')

describe('#job_runner',function(){
    describe('#kickoff', function(){
        it('should submit jobs to redis for later processing',function() {
             return jobs.kickoff()
            // return jobs.process()
        })
    })
    
})