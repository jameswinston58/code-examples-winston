import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { motoPhotoID, motoPhotoURL, userPhotoID, userPhotoURL } from '../../../common/imageHelpersAndConstants.js' //not included in examples

export const getInsuranceNameFromID = (insuranceOptions, uuid) => {
  let insuranceName = 'Insurance Name Missing'
  insuranceOptions.forEach((option, i) => { 
    if(option.uuid === uuid) {
        insuranceName = option.name
    }
  })
  return insuranceName  
}

export const getPaymentTransformer = (data) => {

  let getPaymentCleanData = {
    "pricing" : data.pricing,
    "reservation_id": data.request.id,
    "showFreeDaysCredits" : data.rider.financials.free_days > 0 || data.rider.financials.twisted_road_credit.amount_cents > 0 ? true : false,
    "free_days_amount" : data.rider.financials.free_days,
    "credits_amount_cents" : data.rider.financials.twisted_road_credit.amount_cents, 
    "credits_amount_currency" : data.rider.financials.twisted_road_credit.amount_curency,
    "reservation_start_date": data.request.start_at,
    "reservation_end_date": data.request.end_at,
    "bike_id": data.motorcycle.pretty_id,
    "bike_make": data.motorcycle.make,
    "bike_timezone" : data.motorcycle.timezone,
    "bike_model": data.motorcycle.model,
    "bike_location": {
      "location_region_abbr": data.motorcycle.location.region_abbreviation,
      "location_city" : data.motorcycle.location.city,
      "location_country" : data.motorcycle.location.country,
      "location_country_abbr" : data.motorcycle.location.country_abbreviation
    },
    "bike_year": data.motorcycle.year,
    "bike_nickname": data.motorcycle.nickname,
    "bike_daily_price_cents": data.motorcycle.financials.daily_rental_price_cents,
    "bike_daily_price_currency" : data.motorcycle.financials.daily_rental_price_currency,
    "bike_gear_available": [],
    "bike_owner_name": data.owner.name,
    "bike_owner_id": data.owner.pretty_id,
    "bike_owner_avatar": userPhotoURL(data.owner.avatar.url),
    "bike_owner_avatar_cloudinary_public_id": userPhotoID(data.owner.avatar.cloudinary_public_id),
    "bike_image_url": motoPhotoURL(data.motorcycle.avatar_image.url),
    "bike_image_cloudinary_public_id": motoPhotoID(data.motorcycle.avatar_image.cloudinary_public_id),
    
    "daily_roadside_price_cents" : data.pricing.available_services.road_side_assistance_fee.daily_road_side_assistance_cents,
    "daily_roadside_price_currency" : data.pricing.available_services.road_side_assistance_fee.daily_road_side_assistance_currency,

    "tire_protection_price_cents" : data.pricing.available_services.tire_protection_fee.daily_tire_protection_cents,
    "tire_protection_price_currency" : data.pricing.available_services.tire_protection_fee.daily_tire_protection_currency,
    
    "insurance_options" : data.pricing.available_services.rider_insurance_options,
    "default_insurance" : data.pricing.request_details.rider_insurance,        
    "default_insurance_name" : getInsuranceNameFromID(data.pricing.available_services.rider_insurance_options, data.pricing.request_details.rider_insurance),       
    "payment_methods" : [],
    "is_partner" : data.owner.is_partner,
    "partner_type" : null,
    "default_payment_method" : data.rider.financials.stored_payment_cards.length > 0 ? data.rider.financials.stored_payment_cards[0].uuid : ''
  }    

  for(let i=0; i<data.rider.financials.stored_payment_cards.length; i++) {
    getPaymentCleanData.payment_methods.push({
      "card_type" : data.rider.financials.stored_payment_cards[i].brand,
      "card_digits" : data.rider.financials.stored_payment_cards[i].last_4,
      "card_exp_date" : data.rider.financials.stored_payment_cards[i].expiration_month + "/" + data.rider.financials.stored_payment_cards[i].expiration_year,
      "payment_method_id" : data.rider.financials.stored_payment_cards[i].uuid
    })
  }     

  //set a default for this bit
  getPaymentCleanData['is_same_day_pickup'] = false

  let startMoment =  moment(data.request.start_at).tz(data.motorcycle.timezone).format('MM-DD-YYYY')
  let today =  moment().tz(data.motorcycle.timezone).format('MM-DD-YYYY')

  //here we make some dealer modifications
  if(data.owner.is_partner) {
    getPaymentCleanData['bike_owner_name'] = data.owner.partner_info.partner_name
    getPaymentCleanData['is_same_day_pickup'] = startMoment === today ? true : false
    getPaymentCleanData['partner_type'] = data.owner.partner_info.partner_type
  }
      
  getPaymentCleanData['has_multiday_discount'] = data.pricing.motorcycle.pricing.multi_day_discounts
  getPaymentCleanData['multiday_discount_applied'] = data.pricing.request_details.multi_day_discount_applied

  getPaymentCleanData['start_time_list'] = data.request.pickup_timings ? data.request.pickup_timings : null
  getPaymentCleanData['end_time_list'] = data.request.dropoff_timings ? data.request.dropoff_timings : null

  return getPaymentCleanData

}