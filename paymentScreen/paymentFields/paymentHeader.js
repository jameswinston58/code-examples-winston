import React, { Component } from 'react'
import cloudinary from 'cloudinary-core'
import { 
    CLOUDINARY_API_KEY,  
    CLOUDINARY_NAME, 
    CLOUDINARY_VEHICLE_PRESET, 
    SEARCH_IMAGE_PARAMS
} from '../../../common/imageHelpersAndConstants.js' //not included in examples
const cl = new cloudinary.Cloudinary({
    cloud_name: CLOUDINARY_NAME,
    secure: true,
    upload_preset: CLOUDINARY_VEHICLE_PRESET,
    api_key: CLOUDINARY_API_KEY,
})

 
class PaymentHeader extends Component {

render() {
        const { resData } = this.props
        return (
            <React.Fragment>
                <div className="box payment-block">
                    <div className="row">
                        <div className="col-xs">
                            <h1 className="nomrg">Confirm and Pay</h1>
                            <p className="subheader">You're almost there!</p>
                        </div>
                    </div>
                </div>
                <div className="payment-mobile-details">
                    <div className="box payment-block">
                        <div className="row">
                            <div className="col-xs-7">
                                <h5 className="nomrg">{resData.bike_year} {resData.bike_make} {resData.bike_model}</h5>
                                {resData.bike_location.location_city}, {resData.bike_location.location_region_abbr}
                                {resData.location}
                            </div>
                            <div className="col-xs-5">
                                <img 
                                    src={cl.url(
                                        resData.bike_image_cloudinary_public_id,
                                        SEARCH_IMAGE_PARAMS
                                    )} 
                                    alt="motorcycle"
                                    className="bike-listing-hero"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PaymentHeader