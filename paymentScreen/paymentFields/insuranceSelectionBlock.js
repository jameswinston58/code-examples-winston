import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import getSymbolFromCurrency from 'currency-symbol-map'
import { ErrorMessage } from 'formik'
import { convertCents, findInsuranceInfo } from '../../../../common/util.js' //not included in examples
import InsuranceWarningModal from './insuranceWarningModal.js'; //not included in examples

class InsuranceOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedInsurance: this.props.defaultInsurance,
            declineInsuranceModalDisplay: false,
            minInsUUID : null,
            minInsTitle: '',
            minInsPrice: 0,
            declineInsUUID : null,
            hideDeclineTrigger : false,
        }
    }

    componentDidMount() {

        let minimumInsuranceInfo = findInsuranceInfo(this.props.insuranceOptions, "minimum")
        let declineInsuranceInfo = findInsuranceInfo(this.props.insuranceOptions, "decline")
        let hideDeclineTrigger = !declineInsuranceInfo.uuid ? true : false
        
        this.setState({
            minInsUUID : minimumInsuranceInfo.uuid,
            declineInsUUID : declineInsuranceInfo.uuid,
            minInsTitle: minimumInsuranceInfo.name, 
            minInsPrice: <NumberFormat value={convertCents(minimumInsuranceInfo.price)} displayType={'text'} thousandSeparator={true} prefix={getSymbolFromCurrency(minimumInsuranceInfo.currency)} />,
            hideDeclineTrigger : hideDeclineTrigger
        })    

    }

    changeInsurance = (insUUID, name) => {
        
        this.setState({ 
            selectedInsurance : insUUID, 
            declineInsuranceModalDisplay: false,
        })
        
        this.props.onChange(insUUID, name)
        
        if(insUUID == this.state.declineInsUUID) {
            this.props.declinedInsurance(true)
            return false
        }
        
        this.props.declinedInsurance(false)
        return false
    }

    buildInsuranceBlockClass = (currBlockUUID, selectedBlockUUID, insuranceType) => {
        //eventually pull this out and use the classNames library
        if(currBlockUUID === selectedBlockUUID) {
            return "insurance-block selected " + insuranceType 
        }
        else {
            return "insurance-block " + insuranceType
        }
    }
    render() {
        const {  
            selectedInsurance,
            declineInsuranceModalDisplay,
            minInsUUID,
            minInsTitle,
            minInsPrice,
            declineInsUUID,
            hideDeclineTrigger
        } = this.state

        const { insuranceOptions, defaultInsurance }  = this.props

        return (
            <React.Fragment>
                <div className="payment-block">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3 className="nomrg">Twisted Protection</h3>
                            {insuranceOptions.length > 1 && (
                                <p>Choose a protection package to cover your trip.</p>
                            )}
                            <ErrorMessage className="field-error" component="div" name="rider_insurance" />
                            {insuranceOptions.length > 1 && insuranceOptions.map((insurance, insno) => (
                                <div
                                    className={this.buildInsuranceBlockClass(selectedInsurance, insurance.uuid, insurance.package_type)}
                                    onClick={() => {this.changeInsurance(insurance.uuid, insurance.name)}}
                                >
                                    {defaultInsurance === insurance.uuid && insuranceOptions.length > 1 && (
                                        <div className="insurance-popular-badge">
                                            <div className="insurance-popular-badge-inner">
                                                <div className="insurance-popular-badge-circle-inner"></div>
                                                <div className="insurance-popular-badge-text-inner">Most Popular</div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="row">
                                        <div className="col-xs-12 col-md-3 insurance-left-column">
                                            <div className="insurance-name">{insurance.name}</div>
                                            <div className="insurance-price">
                                                <NumberFormat value={convertCents(insurance.daily_price_cents)} displayType={'text'} thousandSeparator={true} prefix={getSymbolFromCurrency(insurance.daily_price_currency)} />
                                                <span className="insurance-price-description">day</span>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-md-6 insurance-middle-column">
                                            <div className="insurance-description">
                                                {insurance.description}
                                            </div>
                                            <ul className="insurance-details fa-ul">
                                                {insurance.details.map((detail, dno) => (
                                                    <li><span className="fa-li"><i className="fad fa-check"></i></span>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-xs-12 col-md-3 insurance-right-column">
                                            <div className="callout-badge">
                                                {insurance.call_out}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {insuranceOptions.length === 1 && (
                                <div className="single-insurance-option">
                                    <p>{insuranceOptions[0].description}</p>
                                    <ul className="insurance-details fa-ul">
                                        {insuranceOptions[0].details.map((detail, dno) => (
                                            <li><span className="fa-li"><i className="fad fa-check"></i></span>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {selectedInsurance !== declineInsUUID && !hideDeclineTrigger && (
                                <a
                                    href="#"
                                    className="decline-insurance-protection"
                                    onClick={() => {
                                        this.setState({
                                            declineInsuranceModalDisplay: true
                                        })
                                    }
                                    }>No thanks. I'd like to decline liability and damage protection.
                                </a>
                            )}
                            <InsuranceWarningModal 
                                declineInsUUID={declineInsUUID}
                                minInsUUID={minInsUUID}
                                minInsTitle={minInsTitle}
                                minInsPrice={minInsPrice}
                                onChange={this.changeInsurance}
                                showModal={declineInsuranceModalDisplay}            
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

InsuranceOptions.defaultProps = {
    insuranceOptions: [],
    onChange: function() {},
    defaultInsurance : '',
    declinedInsurance : function () {}
}
export default InsuranceOptions