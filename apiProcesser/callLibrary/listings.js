
import { listingEditAPITransformer } from '../transformers/listingEditAPITransformer.js'

export const LISTINGS_CALLS = {
    "update-bike-listing": {
        "use_mock": false,
        "mock_endpoint": "listings/bikes/uuid/update",
        "api_type": 'PUT',
        "requires_auth" : true
    },
    "edit-bike-listing-new": {
        "use_mock": false,
        "mock_endpoint": "listings/bikes/uuid",
        "api_type": 'GET',
        "requires_auth" : true,
        transFormData(data) {
            return listingEditAPITransformer(data)
        }
    }
}

