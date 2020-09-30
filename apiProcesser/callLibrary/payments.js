import { getPaymentTransformer } from '../../../payments/booking/calls/getPaymentTransformer.js'

export const PAYMENTS_CALLS = {
    "payment-screen": {
        "use_mock": false,
        "mock_endpoint": "payments/uuid",
        "api_type": 'GET',
        "requires_auth" : true,
        transFormData(data) {
            return getPaymentTransformer(data)
        }
    },
    "process-payment": {
        "use_mock": false,
        "mock_endpoint": "payments/book/process",
        "api_type": 'POST',
        "requires_auth" : true
    }
}
