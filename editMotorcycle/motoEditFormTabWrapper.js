import React, {Component} from 'react';
import { Formik } from 'formik';
import { compose } from 'recompose'
import { Dimmer, Loader } from 'semantic-ui-react'
import BannerFeedback from '../../../common/bannerFeedback.js' //not included in examples
import { VALIDATION_SCHEMA } from '../steps/validationSchema.js' //not included in examples
import { cleanValuesForValidation } from '../utils/listMotoUtils.js' //not included in examples
import { withWizard } from '../../../account/infoWizard/callUserWizard.js' //not included in examples
import { withListingCalls } from '../runMotoListing.js' 

class ListingTabWrapper extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            showBannerFeedback : false,
            bannerMessage : '',
            bannerType : null,
            loading : false,
        }
    }
  
    handleSubmit = (values, setFieldError, setSubmitting ) => {
        
        let beforeHandlerTest = this.props.beforeHandleSubmit(values, setFieldError)

        if(!beforeHandlerTest) { return false }

        this.setState({ loading : true })
        
        setSubmitting(true)
        
        let validationSchema = this.props.augmentValidation ? this.props.augmentValidation(VALIDATION_SCHEMA[this.props.tabName]) : VALIDATION_SCHEMA[this.props.tabName]
        
        validationSchema.validate(cleanValuesForValidation(values, this.props.tabName), 
          { abortEarly: false }
        ).then(function(valid) {
          this.handleUpdateListing(values, setSubmitting)      
        }.bind(this)).catch(function(responseData) {

          this.setState({ loading : false })

          setSubmitting(false)

          for(let i=0; i<responseData.inner.length; i++) {
            setFieldError(responseData.inner[i]['path'], responseData.inner[i]['message'])
          }

        }.bind(this));     
    }



  handleUpdateListing = (values, setSubmitting) => {

    let valuesObject = JSON.parse(JSON.stringify(values))

    this.setState({ loading : true })

    valuesObject = this.props.massageData(valuesObject)

    this.props.updateListing(valuesObject, this.props.bikeID, 'Update from Edit Bike Page - ' + this.props.description + " - " + this.props.bikePrettyID , true)
    .then(function(responseData) {

      setSubmitting()

      this.props.onSuccess(values) //we pass the updated values back up

      this.setState({
          showBannerFeedback : true,
          bannerMessage : 'Motorcycle Successfully Updated.',
          bannerType : 'success',
          loading : false 
        })
        setTimeout(() => this.setState({
          showBannerFeedback : false,
        }), 3500);        

      }.bind(this)).catch(function(responseData) {

        setSubmitting(false)    

        this.setState({
          showBannerFeedback : true,
          bannerMessage : 'Sorry, we are having issues right now.',
          bannerType : 'error',
          loading : false,
        })
        
        setTimeout(() => this.setState({
          showBannerFeedback : false,
        }), 3500);
    
      }.bind(this))
  }

  render() {
      
  const { showBannerFeedback, bannerType, bannerMessage, loading } = this.state  
  const { hideSaveButton, motorcycleState } = this.props
  
  return (
    <React.Fragment>
        
        <Dimmer active={loading} inverted>
          <Loader size='large'>Saving...</Loader>
        </Dimmer>
        
        <BannerFeedback
          showMessage={showBannerFeedback}
          messageContent={bannerMessage}
          messageType={bannerType}
        />  

        <Formik        
          key={this.props.tabName}
          initialValues={this.props.defaultValues}
          onSubmit={(values, actions) => {
            this.handleSubmit(values, actions.setFieldError, actions.setSubmitting)
          }}
          render={({ errors, setFieldValue, values, setTouched, isSubmitting, handleSubmit }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}> 
                {this.props.render({
                  errors: errors,
                  values : values,
                  setFieldValue : setFieldValue,
                  setTouched : setTouched,
                  loading : isSubmitting,
                })} 
                {!hideSaveButton && (
                  <button className="ui button primary large" id="save" type="submit">Save</button>
                )}
              </form>
          </React.Fragment>
          )}
        />    
      </React.Fragment>
    )
  }
}

export default compose(
  withWizard,
  withListingCalls,
)(ListingTabWrapper)

ListingTabWrapper.defaultProps = {
    tabName : 'Missing Tab Name',
    motorcycle_state : null,
    defaultValues : {},
    description : "Missing Description",
    massageData : function(values) { return values },
    augmentValidation: function(values) { return values },
    bikeID : null,
    bikePrettyID : null,
    hideSaveButton : false,
    onSuccess : function() {},
    beforeHandleSubmit: function() { return true }
}