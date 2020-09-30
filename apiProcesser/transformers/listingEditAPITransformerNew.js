import { buildBikeURL, convertZeroToEmpty } from '../../../common/util.js'
import { motoPhotoID, motoPhotoURL  } from '../../../common/imageHelpersAndConstants.js'

//CONSTANT SHORT CODE NAMES
import { YEAR, MAKE, MODEL, ISSUING_COUNTRY, ISSUING_STATE, INVENTORY_ID, CATEGORY, LICENSE_PLATE, ODOMETER } from '../steps/basicDetails/basicFieldInfo.js'
import { ENGINE, HEIGHT, WEIGHT, FUEL_TANK_CAPACITY, MILES_BEFORE_REFUEL } from '../steps/specifications/specsFieldInfo.js'
import { BIKE_DESCRIPTION, BIKE_NICKNAME, PRIVATE_BIKE_INFORMATION } from '../steps/aboutDetails/aboutDetailsFieldInfo.js'
import { DAILY_PRICE, TERMS_SERVICE, MULTIDAY_DISCOUNT } from '../steps/price/priceFieldInfo.js'
import { PHOTOS } from '../steps/uploadPhotos/photoFieldInfo.js'
import { ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_CITY, ADDRESS_REGION, ADDRESS_COUNTRY, ADDRESS_POSTAL_CODE, TIMEZONE } from '../steps/address/addressFieldInfo.js'
import { HELMET } from '../steps/helmet/helmetFieldInfo.js'

const parsedState = (state) => {

    //we transfrom some system names to more user friendly frontend names
    //this is a hack as the backend works on this issue so this doesn't hold us up, ticket has been cut
    let parsedState = state
    
    parsedState = state == 'pending' ? 'incomplete' : state
    parsedState = state == 'inactive' ? 'delisted' : state
    
    return parsedState

}

export const listingEditAPITransformerNew = (data) => {
    
    let listingData = {} 

    listingData["user_id"] = data.owner.pretty_id
    listingData["motorcycle_state"] = parsedState(data.state)
    listingData["state"] = parsedState(data.state)
    listingData["motorcycle_pretty_id"] = data.pretty_id
    listingData["motorcycle_uuid_id"] = data.uuid
    
    listingData[YEAR] = data.year.toString()
    listingData[MAKE] = data.make
    listingData[MODEL] = data.model
    listingData[ISSUING_COUNTRY] = data.license_plate_country_abbreviation
    listingData[ISSUING_STATE] = data.license_plate_state_abbreviation
    listingData[LICENSE_PLATE] = data.license_plate
    listingData[CATEGORY] = data.category
    listingData[INVENTORY_ID] = ''
    listingData[ODOMETER] = convertZeroToEmpty(data.odometer_miles)

    listingData[BIKE_NICKNAME] = data.nickname
    listingData[BIKE_DESCRIPTION] = data.description
    listingData[PRIVATE_BIKE_INFORMATION] = data.rental_notes

    listingData[PHOTOS] = []

    listingData[DAILY_PRICE] = convertZeroToEmpty(data.daily_rental_price_cents / 100)
    listingData[MULTIDAY_DISCOUNT] = data.multi_day_discounts
    listingData["bike_daily_rate_currency"] = data.daily_rental_price_currency

    listingData[TIMEZONE] = data.timezone
    listingData[ADDRESS_LINE_1] = data.location.address_street_1
    listingData[ADDRESS_LINE_2] = data.location.address_street_2
    listingData[ADDRESS_CITY] = data.location.city
    listingData[ADDRESS_REGION] = data.location.region_abbreviation
    listingData[ADDRESS_COUNTRY] = data.location.country_abbreviation
    listingData[ADDRESS_POSTAL_CODE] = data.location.postal_code

    listingData[ENGINE] = convertZeroToEmpty(data.displacement_cc)
    listingData[HEIGHT] = convertZeroToEmpty(data.seat_height_in)
    listingData[WEIGHT] = convertZeroToEmpty(data.weight_lbs)
    listingData[FUEL_TANK_CAPACITY] = convertZeroToEmpty(data.fuel_capacity_gal)
    listingData[MILES_BEFORE_REFUEL] = convertZeroToEmpty(data.fuel_capacity_mi)

    listingData[HELMET] = []

    if(data.gear) { 
        if(data.gear.helmets) {
            listingData[HELMET] = data.gear.helmets  
        }
    }

    for(let i=0; i<data.images.length; i++) {
        listingData[PHOTOS].push({
            secure_url : motoPhotoURL(data.images[i].url),
            cloudinary_public_id : motoPhotoID(data.images[i].cloudinary_public_id)
        })
    }
 
 
    listingData["motorcycle_url"] = buildBikeURL({
        country : data.location.country_abbreviation,
        region : data.location.region_abbreviation,
        city : data.location.city,
        year : data.year.toString(),
        make :  data.make,
        model :  data.model,
        bikeID : data.pretty_id
    })
 
    return listingData
}