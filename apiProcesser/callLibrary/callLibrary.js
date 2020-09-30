import { AUTHENTICATION_CALLS } from './authentication.js'  //not included in examples
import { DEALER_CALLS } from './dealer.js'  //not included in examples
import { MARKETING_CALLS } from './marketing.js'  //not included in examples
import { REFERRALS_CALLS } from './referrals.js'  //not included in examples
import { RESERVATION_CALLS } from './reservationRequests.js'  //not included in examples
import { TRIPS_CALLS } from './trips.js'  //not included in examples
import { USERS_CALLS } from './users.js' //not included in examples
import { UTILS_CALLS } from './utils.js' //not included in examples

import { LISTINGS_CALLS } from './listings.js'
import { PAYMENTS_CALLS } from './payments.js'

//This file is split like this for readability and the devs sanity.
//You'll notice transform files in the callLibrary on the GETS. This is so that the frontend can read these files easier

export const CALL_LIBRARY = { 
    ...AUTHENTICATION_CALLS,
    ...DEALER_CALLS,
    ...LISTINGS_CALLS,
    ...MARKETING_CALLS,
    ...PAYMENTS_CALLS,
    ...REFERRALS_CALLS,
    ...RESERVATION_CALLS,
    ...TRIPS_CALLS,
    ...USERS_CALLS,
    ...UTILS_CALLS,
}

