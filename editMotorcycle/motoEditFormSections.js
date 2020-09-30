import React from 'react';
import { //Import step shortnames
    BASIC_ADDRESS_STEP, 
    BASIC_SPECS_STEP, 
    BASIC_STEP, 
    SETTINGS_PRICE_STEP, 
    SPRUCE_DETAILS_STEP, 
    SPRUCE_HELMET_STEP, 
    SPRUCE_PHOTOS_STEP 
} from '../steps/stepInfo';

//Import Values Setup Objects
import { DEFAULT_HELMET_VALUES } from '../steps/helmet/helmetFieldInfo';
import { DEFAULT_BIKE_DETAILS_VALUES } from '../steps/aboutDetails/aboutDetailsFieldInfo';
import { DEFAULT_PRICE_VALUES } from '../steps/price/priceFieldInfo';
import { DEFAULT_SPECS_VALUES } from '../steps/specifications/specsFieldInfo';
import { DEFAULT_BASIC_VALUES, ISSUING_COUNTRY, ISSUING_STATE, MAKE, MODEL, YEAR } from '../steps/basicDetails/basicFieldInfo';
import { DEFAULT_PHOTO_VALUES } from '../steps/uploadPhotos/photoFieldInfo';
import { DEFAULT_ADDRESS_VALUES, ADDRESS_CITY, ADDRESS_REGION } from '../steps/address/addressFieldInfo';

//Screens and UI
import BasicScreen from '../steps/basicDetails/basicScreen';
import HelmetScreen from '../steps/helmet/helmetScreen';
import BikeDetailsScreen from '../steps/aboutDetails/aboutDetailsScreen';
import PriceScreen from '../steps/price/priceScreen';
import PhotoScreen from '../steps/uploadPhotos/photoScreen';
import AddressScreen from '../steps/address/addressScreen';
import SpecsScreen from '../steps/specifications/specsScreen';
import DeleteMotorcycle from './deleteMotorcycle.js'
import DelistMotorcycle from './delistMotorcycle';
import ShareButton from '../../../bikes/share/bikeShareButton.js'



//Want to add analytics and trip history pages later.
//Even though the "sub_items" are listed below and we could have easily grabbed the keys,
//We do it this way because we can more easily control the menu item order w/o having to copy and paste objects over and over
//so for it to show on the page you need to place it in the object AND in this sub_items key below

export const editMotorcycleSectionInfo = [
    {
        "section_name" : "listing",
        "section_header" : "Listing",
        "pages" : [
            BASIC_STEP,
            SPRUCE_DETAILS_STEP,
            BASIC_SPECS_STEP,
            SPRUCE_HELMET_STEP,
            BASIC_ADDRESS_STEP,
            SPRUCE_PHOTOS_STEP
        ]
    },
    {
        "section_name" : "booking",
        "section_header" : "Booking",
        "pages" : [
            SETTINGS_PRICE_STEP
        ]
    },
    {
        "section_name" : "manage",
        "section_header" : "Manage",
        "pages" : [
            "view_listing",
            "share_listing",
            "manage_listing"
        ]
    }
]

//This function slams all the sub sections together
//We split them out to subsections just for readibility
export const masterMotoEditSection = (listingData) => {
    return {
        ...bookingSection(listingData),
        ...listingSection(listingData),
        ...manageSection(listingData)
    }
}

/*The Section Functions Below Work Like This:

    page_name : {
        tab_name : string,
        menu_name : string,
        mobile_menu_name : string,
        menu_content : string,
        menu_classname : string,
        menu_link_type : string, options: tab, link, component
        menu_link_config : {
            "url" : null or string, 
            Note: This is an object. Eventually we could do new_window : boolean, etc; if needed
        },
        description : string,
        massage_edit_data : function; Use this if the data needs some tweaking before sending through validation,
        default_edit_values : function; Use this if you want to format data differently for whatever reason,
        augment_edit_validation : function, pass a function here if you need to drop or add fields to the validation of the edit form,
        before_submit : function, morph data data directly before the data hits the api call
        edit_tab_header : string,
        edit_tab_contents : open field, typically a component
    }

*/

export const bookingSection = (listingData, isMobile) => {
    
    const ld = listingData 
    
    let bookingSection = {}

    bookingSection[SETTINGS_PRICE_STEP] = {
        "tab_name" : SETTINGS_PRICE_STEP,
        "menu_name" : "edit-pricing-desktop",
        "mobile_menu_name" : "edit-pricing-mobile",
        "menu_content" : "Pricing",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Price Info Tab",
        "massage_edit_data" : prepPriceTermsListingData,
        "default_fresh_values" : DEFAULT_PRICE_VALUES({}),
        "default_edit_values" : DEFAULT_PRICE_VALUES(listingData),
        "augment_edit_validation" : dropTermsFromValidation,
        "edit_tab_header" : 'Basic Information',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <PriceScreen 
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}
                        hideTerms={true}
                        isMobile={isMobile}
                    />
        }
    }
    return bookingSection
}

export const listingSection = (listingData) => {
    
    const ld = listingData 
    
    let listingSection = {}

    listingSection[BASIC_STEP] = {
        "tab_name" : BASIC_STEP,
        "menu_name" : "edit-basic-desktop",
        "mobile_menu_name" : "edit-basic-mobile",
        "menu_content" : "Basic",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Basic Info Tab",
        "massage_edit_data" : cleanBasicInfo,
        "default_fresh_values" : DEFAULT_BASIC_VALUES({}),
        "default_edit_values" : DEFAULT_BASIC_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Basic Information',
        "before_submit" : function(values, setError) {
            if(values[ISSUING_STATE] === 'NY' && values[ISSUING_COUNTRY] === 'US') {
                setError('ny_error', true)
                return false
            }
            return true
        },
        "edit_tab_contents" : function(values, errors, setFieldValue, setTouched) {
                return <>
                    {errors.ny_error && (
                        <NewYorkPopUp newYorkSelected={true} />
                    )}
                    <BasicScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}
                        updateSpecsOnModelChange={false}    
                    />
                    </>
        }    
    }

    listingSection[SPRUCE_DETAILS_STEP] = {
        "tab_name" : SPRUCE_DETAILS_STEP,
        "menu_name" : "edit-details-desktop",
        "mobile_menu_name" : "edit-details-mobile",
        "menu_content" : "Details",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Details Tab",
        "massage_edit_data" : prepDetailsListingData,
        "default_fresh_values" : DEFAULT_BIKE_DETAILS_VALUES({}),
        "default_edit_values" : DEFAULT_BIKE_DETAILS_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Motorcycle Details',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <BikeDetailsScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}
                        updateSpecsOnModelChange={false}    
                    />
        }     
    }

    listingSection[BASIC_SPECS_STEP] = {
        "tab_name" : BASIC_SPECS_STEP,
        "menu_name" : "edit-specifications-desktop",
        "mobile_menu_name" : "edit-specifications-mobile",
        "menu_content" : "Specifications",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Specs Tab",
        "massage_edit_data" : prepSpecsListingData,
        "default_fresh_values" : DEFAULT_SPECS_VALUES({}),
        "default_edit_values" : DEFAULT_SPECS_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Specification Details',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <SpecsScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}   
                    />
        }     
    }

    listingSection[SPRUCE_HELMET_STEP] = {
        "tab_name" : SPRUCE_HELMET_STEP,
        "menu_name" : "edit-helmet-desktop",
        "mobile_menu_name" : "edit-helmet-mobile",
        "menu_content" : "Helmet",
        "hide_save_button" : true,
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Helmet",
        "massage_edit_data" : prepHelmetListingData,
        "default_fresh_values" : DEFAULT_HELMET_VALUES({}),
        "default_edit_values" : DEFAULT_HELMET_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Helmet',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <HelmetScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}
                        headerInfo={<div>
                                <h2 style={{ textAlign : 'center' }}>Helmet</h2>
                                <p style={{ textAlign : 'center' }} className="nomrg">You can include your helmet with this listing.<br />Motorcycles with helmets available can get more rentals!</p>
                                </div>}   
                    />
        }       
    }

    listingSection[BASIC_ADDRESS_STEP] = {
        "tab_name" : BASIC_ADDRESS_STEP,
        "menu_name" : "edit-address-desktop",
        "mobile_menu_name" : "edit-address-mobile",
        "menu_content" : "Address",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Address Tab",
        "massage_edit_data" : cleanAddressInfo,
        "default_fresh_values" : DEFAULT_ADDRESS_VALUES({}),
        "default_edit_values" : DEFAULT_ADDRESS_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Address',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <AddressScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}  
                    />
        }  
    }

    listingSection[SPRUCE_PHOTOS_STEP] = {
        "tab_name" : SPRUCE_PHOTOS_STEP,
        "menu_name" : "edit-photos-desktop",
        "mobile_menu_name" : "edit-photos-mobile",
        "menu_content" : "Photos",
        "menu_classname" : null,
        "menu_link_type" : "tab",
        "menu_link_config" : {
            "url" : null, 
        },
        "description" : "Photo Tab",
        "massage_edit_data" : cleanPhotosInfo,
        "default_fresh_values" : DEFAULT_PHOTO_VALUES({}),
        "default_edit_values" : DEFAULT_PHOTO_VALUES(listingData),
        "augment_edit_validation" : null,
        "edit_tab_header" : 'Photos',
        "edit_tab_contents" : (values, errors, setFieldValue, setTouched) => {
            return  <PhotoScreen
                        values={values} 
                        errors={errors} 
                        setFieldValue={setFieldValue} 
                        setTouched={setTouched}  
                        returnType={'string'}
                    />
        }   
        
    }
    
    return listingSection
}



export const manageSection = (listingData) => {
    
    const ld = listingData 

    return { 
        "view_listing" : {
            "tab_name" : 'view_listing',
            "menu_name" : "edit-view-listing-desktop",
            "mobile_menu_name" : "edit-view-listing-mobile",
            "menu_content" : "View Listing",
            "menu_classname" : null,
            "menu_link_type" : "link",
            "menu_link_config" : {
                "url" : listingData.motorcycle_url, 
            }    
        },
        "share_listing" : {
            "tab_name" : 'share_listing',
            "menu_name" : "edit-share-listing-desktop",
            "mobile_menu_name" : "edit-share-listing-mobile",
            "menu_content" : editShareButton(listingData),
            "menu_classname" : "share-edit-menu-item",
            "menu_link_type" : "component",
            "menu_component" : <div></div>   
        },
        "manage_listing" : {
            "tab_name" : 'manage_listing',
            "menu_name" : "edit-manage-listing-desktop",
            "mobile_menu_name" : "edit-manage-listing-mobile",
            "menu_content" : "Manage Listing",
            "menu_classname" : null,
            "menu_link_type" : "tab",
            "menu_link_config" : {
                "url" : null,
            },
            'tab_type' : 'screen',
            'edit_tab_header' : 'Manage Listing',
            "edit_tab_contents" : (onSuccess) => {
                return <div>
                    
                    <DelistMotorcycle 
                        bikeID={listingData.motorcycle_uuid_id}
                        description={"Delist Motorcycle from Edit Page - " + listingData.motorcycle_pretty_id}
                        bikeState={listingData.state}
                        onSuccess={(status) => {
                            onSuccess({
                                'motorcycle_state' : status
                            })
                        }}
                    />
                    <DeleteMotorcycle 
                        bikeID={listingData.motorcycle_uuid_id}
                        description={"Deleted Motorcycle from Edit Page - " + listingData.motorcycle_pretty_id}
                    />
                </div>
            }   
        }
    }
}



export const editShareButton = (listingData) => {

    return <ShareButton 
    url={listingData.motorcycle_url}
    quote={ 
        listingData[YEAR].toString() + " " 
        + listingData[MAKE] + " " 
        +  listingData[MODEL] + 
        " Motorcycle Rental in " 
        + listingData[ADDRESS_CITY] + ", " 
        + listingData[ADDRESS_REGION]
    }
    title={"Share this motorcycle"}
    bikePrettyID={listingData.motorcycle_pretty_id}
    triggerType="text"
    buttonText={'Share'}
    callout={"Let everyone know they can ride the world on this " + listingData[YEAR].toString() + " " 
    + listingData[MAKE] + " " 
    + listingData[MODEL] }
    />


}