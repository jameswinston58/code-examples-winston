import moment from 'moment-timezone'
export const prepStartAndEndTimeForBackend = (inputTime) => {

    let startTime = ('start_time' in inputTime ? inputTime.start_time : null)
    let endTime = ('end_time' in inputTime ? inputTime.end_time : null)
    let startDate = ('start_date' in inputTime ? inputTime.start_date : null)
    let endDate = ('end_date' in inputTime ? inputTime.end_date : null)
    let timezone = ('timezone' in inputTime ? inputTime.timezone : null)

    if(!timezone) { return false } //if we don't have a timezone then this is useless. 
    if(startDate == null && endDate == null) { return false }

    let startDateTime = null
    let endDateTime = null

    if(startTime == null || endTime == null) {     
        //check if it's the same day        
        if(moment(startDate).tz(timezone).isSame(moment(endDate).tz(timezone), 'day')) {
           startDateTime = moment(startDate).clone().tz(timezone).startOf('day')
           endDateTime = moment(endDate).clone().tz(timezone).startOf('day').add(1, 'hours')
        }
        else {
            startDateTime = moment(startDate).clone().tz(timezone).startOf('day')
            endDateTime = moment(endDate).clone().tz(timezone).startOf('day')           
        }        
    }
   
    else {
        startDateTime = moment(startDate).clone().tz(timezone).set('hours', Number(startTime))
        endDateTime = moment(endDate).clone().tz(timezone).set('hours', Number(endTime))
    }

    return {
        start_at : startDateTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        end_at : endDateTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    }

}


export const createReservationTimeStamp = (momentObject, hour, timezone) => {
    return moment(momentObject)
    .tz(timezone)
    .set('hour', hour)
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
}
