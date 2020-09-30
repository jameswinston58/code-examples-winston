//Tests for the creation of start and end times, taking into account DST, 
//Motorcycle Timezone and Rider Timezone
import { createReservationTimeStamp, prepStartAndEndTimeForBackend } from '../paymentUtils.js'
import moment from 'moment-timezone'



test('Standard Time converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        "2019-05-25T06:00:00.000Z",
        6, 
        'America/Chicago'
    )).toBe('2019-05-25T11:00:00.000Z') //we subtract an hour here.
})

test('DST converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        "2019-12-25T06:00:00.000Z",
        6, 
        'America/Chicago'
    )).toBe('2019-12-25T12:00:00.000Z')
})

test('Standard Time - USING MOMENT OBJECT converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        moment("2019-12-25T06:00:00.000Z", "YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        6, 
        'America/Chicago'
    )).toBe('2019-12-25T12:00:00.000Z')
})

test('DST Time - USING MOMENT OBJECT converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        moment("2019-05-25T06:00:00.000Z", "YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        6, 
        'America/Chicago'
    )).toBe('2019-05-25T11:00:00.000Z')
})

test('Standard Time - USING MOMENT OBJECT converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        moment("2019-12-25T06:00:00.000Z", "YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        6, 
        'America/Los_Angeles'
    )).toBe('2019-12-25T14:00:00.000Z')
})

test('DST Time - USING MOMENT OBJECT converts a timestamp with a timezone and hours attached', () => {
    expect(createReservationTimeStamp(
        moment("2019-05-25T06:00:00.000Z", "YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        6, 
        'America/Los_Angeles'
    )).toBe('2019-05-25T13:00:00.000Z')
}) 

test('Pricing - Time Creation - Same Day - DST', () => {
    expect(prepStartAndEndTimeForBackend(
        {
            start_date :  '2019-05-28T08:00:00.000Z',
            start_time : 10, //10am
            end_date : '2019-05-28T08:00:00.000Z',
            end_time : 22,
            timezone : 'America/Los_Angeles'
        }        
    )).toEqual({
        start_at :  '2019-05-28T17:00:00.000Z',
        end_at : '2019-05-29T05:00:00.000Z'
    })
}) 

test('Pricing - Time Creation - Different Days - DST', () => {
    expect(prepStartAndEndTimeForBackend(
        {
            start_date :  '2019-05-27T08:00:00.000Z',
            start_time : 14, //10am
            end_date : '2019-05-28T08:00:00.000Z',
            end_time : 14,
            timezone : 'America/Los_Angeles'
        }        
    )).toEqual({
        start_at :  '2019-05-27T21:00:00.000Z',
        end_at : '2019-05-28T21:00:00.000Z'
    })
}) 

test('Pricing - Time Creation - NULL StartTime - SameDay - DST', () => {
    expect(prepStartAndEndTimeForBackend(
        {
            start_date :  '2019-05-28T07:00:00.000Z',
            start_time : null, //10am
            end_date : '2019-05-28T08:00:00.000Z',
            end_time : 14,
            timezone : 'America/Los_Angeles'
        }        
    )).toEqual({
        start_at :  '2019-05-28T07:00:00.000Z',
        end_at : '2019-05-28T08:00:00.000Z'
    })
}) 

test('Pricing - Time Creation - NULL StartTime - Diff Days - DST', () => {
    expect(prepStartAndEndTimeForBackend(
        {
            start_date :  '2019-05-28T07:00:00.000Z',
            start_time : null, //10am
            end_date : '2019-05-30T07:00:00.000Z',
            end_time : 14,
            timezone : 'America/Los_Angeles'
        }        
    )).toEqual({
        start_at :  '2019-05-28T07:00:00.000Z',
        end_at : '2019-05-30T07:00:00.000Z'
    })
}) 

test('Pricing - Time Creation - NULL StartTime - Diff Days - Stan.Time', () => {
    expect(prepStartAndEndTimeForBackend(
        {
            start_date :  '2019-11-28T08:00:00.000Z',
            start_time : null, //10am
            end_date : '2019-11-30T08:00:00.000Z',
            end_time : 14,
            timezone : 'America/Los_Angeles'
        }        
    )).toEqual({
        start_at :  '2019-11-28T08:00:00.000Z',
        end_at : '2019-11-30T08:00:00.000Z'
    })
}) 
