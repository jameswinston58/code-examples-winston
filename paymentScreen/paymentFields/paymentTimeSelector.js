import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Dropdown } from 'semantic-ui-react'
import { ErrorMessage } from 'formik'
import { trackPaymentStartTimeChanged, trackPaymentEndTimeChanged } from '../../../tracking/paymentTracking.js' //not included in examples
import { timeOptions } from '../../../common/constants.js' //not included in examples

class PaymentTimeSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime : null,
            endTime : null
        }
    }

    handleStartTimeChange = (value) => {

        let startTime = value
        
        trackPaymentStartTimeChanged()
        
        if(moment(this.props.startDate).isSame(moment(this.props.endDate), 'day')) {
            if(Number(value) >= Number(this.state.endTime)) {
                this.setState(state => {
                    state.startTime = startTime
                    state.endTime = null
                    return state
                })
                this.updateTime('endTime', this.props.endTimeID, null)
                this.updateTime('startTime', this.props.startTimeID, startTime)
                
            }
            else {
                this.setState(state => {
                    state.startTime = startTime
                    return state
                })
                this.updateTime('startTime', this.props.startTimeID, startTime)
            }
        }   
        else {
            this.setState(state => {
                state.startTime = startTime
                return state
            })
            this.updateTime('startTime', this.props.startTimeID, startTime)
        }
        
    }


    handleEndTimeChange = (value) => {
        
        let endTime = value
        
        trackPaymentEndTimeChanged()
        
        if(moment(this.props.startDate).isSame(moment(this.props.endDate), 'day')) {
            
            if(Number(value) <= Number(this.state.startTime) ) {
                this.setState(state => {
                    state.endTime = endTime
                    state.startTime = null
                    return state
                })
                this.updateTime('startTime', this.props.startTimeID, null)
                this.updateTime('endTime', this.props.endTimeID, endTime)
            }
            else {
                    
                this.setState(state => {
                    state.endTime = endTime
                    return state
                })
                this.updateTime('endTime', this.props.endTimeID, endTime)
            }
        }
        else {
            this.setState(state => {
                state.endTime = endTime
                return state
            })
            this.updateTime('endTime', this.props.endTimeID, endTime)
        }
    }  



    updateTime = (stateParam, fieldID, value) => {

        this.setState(state => {
            state[stateParam] = value
            return state
        })

        this.props.onChange(fieldID, value)    
    }

    augmentStartTimeOptions = () => {
        
        const startTimeList = this.props.startTimeList ? this.props.startTimeList : timeOptions

        if(!this.props.sameDayRental) {
            return startTimeList 
        }
        
        let nextHour = moment().tz(this.props.timezone).add(1, 'hour').format('HH')
        var start = startTimeList.findIndex(x => x.key === nextHour)
        var timeOptionsClone = JSON.parse(JSON.stringify(startTimeList))
        var timeOptionsLength = timeOptionsClone.length
        return timeOptionsClone.slice(start, timeOptionsLength)        
    }



render() {
        const { startDate, endDate, timezone, startError, endError, endTimeList } = this.props
        const { startTime, endTime } = this.state
        return (
            <React.Fragment>
            <div className="box payment-calendar-display-wrap">
            <div className="row">
                <div className="col-xs-6">
                    <div className="box">
                        <div className="row middle-xs">
                            <div className="col-xs-4 col-sm-3">
                                <div className="pay-calendar-display">
                                        {moment(startDate).tz(timezone).format("MMM")}
                                        <span className="pay-calendar-display-day">{moment(startDate).tz(timezone).format("DD")}</span>
                                </div>
                            </div>
                            <div className="col-xs-8 col-sm-9">
                              
                                <div className="box">
                                    <span className="payment-day-week-eyebrow">{moment(startDate).tz(timezone).format("dddd")} Pick Up</span>
                                    {startTime && (
                                    <span>
                                        <br />{moment(startDate).tz(timezone).set('hours', startTime).format("h:mma z")}
                                    </span>
                                    )}
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="box">
                        <div className="row middle-xs">
                            <div className="col-xs-4 col-sm-3">
                                <div className="pay-calendar-display">
                                    {moment(endDate).tz(timezone).format("MMM")}
                                     <span className="pay-calendar-display-day">{moment(endDate).tz(timezone).format("DD")}</span>
                                </div>
                            </div>
                            <div className="col-xs-8 col-sm-9">
                              
                                    <span className="payment-day-week-eyebrow">{moment(endDate).tz(timezone).format("dddd")} Drop Off</span>
                                    {endTime && (
                                    <span>
                                        <br />{moment(endDate).tz(timezone).set('hours', endTime).format("h:mma z")}
                                    </span>
                                    )}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="box payment-block pick-up-drop-off-selectors">
            <div className="row">
                <div className="col-xs-6">
                    Pick Up Time<br />
                    <Dropdown 
                        placeholder='Pick Up Time' 
                        fluid 
                        error={startError} 
                        onChange={(e, data) => this.handleStartTimeChange(data.value)} 
                        value={this.state.startTime} 
                        selection 
                        options={this.augmentStartTimeOptions()} 
                    />
                    <ErrorMessage className="field-error" component="div" name="start_time" />     
                </div>
                <div className="col-xs-6">
                    Drop Off Time<br />
                    <Dropdown 
                        placeholder='Drop Off Time' 
                        fluid 
                        error={endError} 
                        onChange={(e, data) => this.handleEndTimeChange(data.value)} 
                        value={this.state.endTime} 
                        selection 
                        options={endTimeList ? endTimeList : timeOptions} //setting a default in case this is null in data 
                    />
                    <ErrorMessage className="field-error" component="div" name="end_time" />     
                </div>
            </div>
        </div>
        </React.Fragment>
        )
    }
}

export default PaymentTimeSelector

PaymentTimeSelector.defaultProps = {
    onChange : function() {},
    startDate : null,
    endDate : null, 
    timezone : 'America/Chicago',
    startTimeID : 'start_time',
    endTimeID : 'end_time',
    startError : false,
    endError : false,
    sameDayRental : false,
    startTimeList : timeOptions, 
    endTimeList : timeOptions
  }