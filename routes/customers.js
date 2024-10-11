const express = require('express');
const router = express.Router();
const squareClient = require("../common/square");

/**
 * @api {post} /customers
 * @apiDescription This API is used to get customer list
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName Customer list
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "data": [
 *         {
 *             "id": "3GE2FTN20VJ1NMNGDMJ539VVGC",
 *             "createdAt": "2024-09-13T09:26:23.017Z",
 *             "updatedAt": "2024-09-13T09:26:23Z",
 *             "givenName": "Sodha",
 *             "familyName": "Sept 13",
 *             "nickname": "Swapy",
 *             "companyName": "WCG",
 *             "emailAddress": "swapnil.s@webcodegenie.net",
 *             "address": {
 *                 "addressLine1": "Kargil petrol pump",
 *                 "addressLine2": "Ganesh meredian",
 *                 "addressLine3": "c-904 Webcodegenie technologies",
 *                 "locality": "Indian",
 *                 "sublocality": "Canadian",
 *                 "postalCode": "M3C 0H9",
 *                 "country": "CA"
 *             },
 *             "phoneNumber": "4086577161",
 *             "birthday": "2001-08-11",
 *             "preferences": {
 *                 "emailUnsubscribed": false
 *             },
 *             "creationSource": "THIRD_PARTY",
 *             "version": 0
 *         },
 *         {
 *             "id": "Q3CY3EFTN7NAA8R0JC4TTKG15R",
 *             "createdAt": "2024-09-13T04:24:04.856Z",
 *             "updatedAt": "2024-09-13T04:24:04Z",
 *             "cards": [
 *                 {
 *                     "id": "ccof:CA4SEBlK0p-3LYIA4H4BuWOH7KooAg",
 *                     "cardBrand": "VISA",
 *                     "last4": "5858",
 *                     "expMonth": 9,
 *                     "expYear": 2026,
 *                     "cardholderName": "Swapnil Sodha",
 *                     "billingAddress": {
 *                         "postalCode": "94103"
 *                     }
 *                 }
 *             ],
 *             "givenName": "Sodha",
 *             "familyName": "Swapnil",
 *             "nickname": "Swapy",
 *             "companyName": "WCG",
 *             "emailAddress": "swapnil.s@webcodegenie.net",
 *             "address": {
 *                 "addressLine1": "Kargil petrol pump",
 *                 "addressLine2": "Ganesh meredian",
 *                 "addressLine3": "c-904 Webcodegenie technologies",
 *                 "locality": "Indian",
 *                 "sublocality": "Canadian",
 *                 "postalCode": "M3C 0H9",
 *                 "country": "CA"
 *             },
 *             "phoneNumber": "4086577161",
 *             "birthday": "2001-08-11",
 *             "preferences": {
 *                 "emailUnsubscribed": false
 *             },
 *             "creationSource": "THIRD_PARTY",
 *             "segmentIds": [
 *                 "MLNVS88XVXNAS.CARDS_ON_FILE",
 *                 "gv2:X0FESEC1A96SF12BSVJ2R1MFPG"
 *             ],
 *             "version": 0
 *         },
 *         {
 *             "id": "X56P964BH3B73SKKYECMNBGE20",
 *             "createdAt": "2024-09-12T05:25:31.404Z",
 *             "updatedAt": "2024-09-12T06:10:19Z",
 *             "cards": [
 *                 {
 *                     "id": "ccof:CA4SEOmWQalwzY_tHeLUxCDVAvooAg",
 *                     "cardBrand": "VISA",
 *                     "last4": "5858",
 *                     "expMonth": 9,
 *                     "expYear": 2026,
 *                     "cardholderName": "Swapnil Sodha",
 *                     "billingAddress": {
 *                         "postalCode": "94103"
 *                     }
 *                 }
 *             ],
 *             "givenName": "Sodha updated",
 *             "familyName": "Swapnil updated",
 *             "nickname": "Swapy",
 *             "companyName": "WCG",
 *             "emailAddress": "swapnil.s@webcodegenie.net",
 *             "address": {
 *                 "addressLine1": "Kargil petrol pump",
 *                 "addressLine2": "Ganesh meredian",
 *                 "addressLine3": "c-904 Webcodegenie technologies",
 *                 "locality": "Indian",
 *                 "sublocality": "Canadian",
 *                 "postalCode": "M3C 0H9",
 *                 "country": "CA"
 *             },
 *             "phoneNumber": "4086577161",
 *             "birthday": "2001-08-11",
 *             "preferences": {
 *                 "emailUnsubscribed": false
 *             },
 *             "creationSource": "THIRD_PARTY",
 *             "segmentIds": [
 *                 "MLNVS88XVXNAS.CARDS_ON_FILE",
 *                 "gv2:X0FESEC1A96SF12BSVJ2R1MFPG"
 *             ],
 *             "version": 1
 *         }
 *     ],
 *     "status":200,
 *     "message": "Successfully retrieved customer list."
 * }
 *
 * @apiUse Authentication error
 *
 * @apiErrorExample Error-Response: Not Authorize to access.
 * {
 *     "message": "Error while get customer details",
 *     "status": 401,
 *     "error": [
 *         {
 *             "category": "AUTHENTICATION_ERROR",
 *             "code": "UNAUTHORIZED",
 *             "detail": "This request could not be authorized."
 *         }
 *     ]
 * }
 */
router.post("/", async function (req, res, next) {
	try {
		const postDataPagination = req.body;
		const customerDetailsList = await squareClient.getCustomerList(postDataPagination);
		res.status(200).json({
			"message": "Successfully retrieved customer list.",
            "status":200,
            "data": customerDetailsList,
		});
	} catch (error) {
		res.status(error.statusCode).json({
			"message": "Error while retrieving customer list.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

/**
 * @api {post} /customers/create
 * @apiDescription This API is used add customer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName Create customer
 *
 * @apiParamExample {application/json} Request-Example:
 * {
 *     "customer":{
 *         "idempotencyKey": "16149f03-4c98-4d4e-acb2-6cec3929705a", // Generate uuid every time 
 *          "givenName": "Sodha",
 *          "familyName": "Swapnil",
 *          "companyName": "WCG",
 *          "nickname": "Swapy",
 *          "emailAddress": "swapnil.s@webcodegenie.net",
 *          "address": {
 *              "addressLine1": "Kargil petrol pump",
 *              "addressLine2": "Ganesh meredian",
 *              "addressLine3": "c-904 Webcodegenie technologies",
 *              "locality": "Indian",
 *              "sublocality": "Canadian",
 *              "postalCode": "M3C 0H9",
 *              "country": "CA",
 *              "firstName": "Swapnil",
 *              "lastName": "Sodha"
 *          },
 *      "phoneNumber": "4086577161",
 *     "birthday": "2001-08-11" 
 *     }
 * }
 *
 * @Note You must provide at least one of the following values in your request to this endpoint remaining above mentioned are optional:
 * givenName
 * familyName
 * companyName
 * emailAddress
 * phoneNumber
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Success customer created.",
 *     "status": 200,
 *     "data": {
 *         "id": "3GE2FTN20VJ1NMNGDMJ539VVGC",
 *         "createdAt": "2024-09-13T09:26:23.017Z",
 *         "updatedAt": "2024-09-13T09:26:23Z",
 *         "givenName": "Sodha",
 *         "familyName": "Sept 13",
 *         "nickname": "Swapy",
 *         "companyName": "WCG",
 *         "emailAddress": "swapnil.s@webcodegenie.net",
 *         "address": {
 *             "addressLine1": "Kargil petrol pump",
 *             "addressLine2": "Ganesh meredian",
 *             "addressLine3": "c-904 Webcodegenie technologies",
 *             "locality": "Indian",
 *             "sublocality": "Canadian",
 *             "postalCode": "M3C 0H9",
 *             "country": "CA"
 *         },
 *         "phoneNumber": "4086577161",
 *         "birthday": "2001-08-11",
 *         "preferences": {
 *             "emailUnsubscribed": false
 *         },
 *         "creationSource": "THIRD_PARTY"
 *     }
 * }
 *
 * @apiUse Authentication error
 *
 * @apiErrorExample Error-Response: Not Authorize to access.
 * {
 *     "message": "Error while get customer details",
 *     "status": 401,
 *     "error": [
 *         {
 *             "category": "AUTHENTICATION_ERROR",
 *             "code": "UNAUTHORIZED",
 *             "detail": "This request could not be authorized."
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Required fields for customer
 * {
 *     "message": "Error while create customer with details : {\"test\":\"Swapnil Sodha - 2\"}",
 *     "status": 400,
 *     "error": [
 *         {
 *             "code": "BAD_REQUEST",
 *             "detail": "At least one of `given_name`, `family_name`, `company_name`, `email_address`, or `phone_number` is required for a customer.",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: If idempotencyKey is generated uniqua every time then 
 * {
 *     "message": "Error while create customer with details : {\"idempotencyKey\":\"16149f03-4c98-4d4e-acb2-6cec3929705a\",\"givenName\":\"Sodha\",\"familyName\":\"Sept 13\",\"companyName\":\"WCG\",\"nickname\":\"Swapy\",\"emailAddress\":\"swapnil.s@webcodegenie.net\",\"address\":{\"addressLine1\":\"Kargil petrol pump\",\"addressLine2\":\"Ganesh meredian\",\"addressLine3\":\"c-904 Webcodegenie technologies\",\"locality\":\"Indian\",\"sublocality\":\"Canadian\",\"postalCode\":\"M3C 0H9\",\"country\":\"CA\",\"firstName\":\"Swapnil\",\"lastName\":\"Sodha\"},\"phoneNumber\":\"4086577161\",\"birthday\":\"2001-08-11\"}",
 *     "error": [
 *         {
 *             "code": "IDEMPOTENCY_KEY_REUSED",
 *             "detail": "The idempotency key can only be retried with the same request data.",
 *             "field": "idempotency_key",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.post("/create", async function (req, res, next) {
    try {
        const customerDetails = req.body.customer;
        const createdCustomerDetails = await squareClient.createCustomer(customerDetails);
		res.status(200).json({
            "message": "Success customer created.",
            "status":200,
            "data": createdCustomerDetails,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": `Error while create customer with details : ${JSON.stringify(req.body.customer)}`,
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {get} /customers/:id
 * @apiDescription This API is used get customer details
 * @apiVersion 1.0.0
 * @apiGroup Squareup Customers
 * @apiName Get customer
 *
 * @apiParam (Parameters) {String}  id : customer's id
 * 
 * @apiSuccess (Success 202) {Number} status Response status code.
 * @apiSuccess (Success 202) {JSON/Boolean} data Created data.
 * @apiSuccess (Success 202) {String} message Response message string.
 * @apiSuccess (Success 202) {String} message code.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully retrieved customer details.",
 * 	   "status" : 200,
 *     "data": {
 *         "id": "X56P964BH3B73SKKYECMNBGE20",
 *         "createdAt": "2024-09-12T05:25:31.404Z",
 *         "updatedAt": "2024-09-12T06:10:19Z",
 *         "cards": [
 *             {
 *                 "id": "ccof:CA4SEOmWQalwzY_tHeLUxCDVAvooAg",
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "cardholderName": "Swapnil Sodha",
 *                 "billingAddress": {
 *                     "postalCode": "94103"
 *                 }
 *             },
 *             {
 *                 "id": "ccof:CA4SEN2esQE0To5Q48ptW1NLHxQoAg",
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "cardholderName": "Swapnil Sodha",
 *                 "billingAddress": {
 *                     "postalCode": "94103"
 *                 }
 *             },
 *             {
 *                 "id": "ccof:CA4SEN8tK8HPMPh6OGzTVqQf-r0oAg",
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "cardholderName": "Swapnil Sodha",
 *                 "billingAddress": {
 *                     "postalCode": "94103"
 *                 }
 *             },
 *             {
 *                 "id": "ccof:CA4SELHpX4CYXQhA-lsGnBlNRJMoAg",
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "cardholderName": "Swapnil Sodha",
 *                 "billingAddress": {
 *                     "postalCode": "94103"
 *                 }
 *             }
 *         ],
 *         "givenName": "Sodha updated",
 *         "familyName": "Swapnil updated",
 *         "nickname": "Swapy",
 *         "companyName": "WCG",
 *         "emailAddress": "swapnil.s@webcodegenie.net",
 *         "address": {
 *             "addressLine1": "Kargil petrol pump",
 *             "addressLine2": "Ganesh meredian",
 *             "addressLine3": "c-904 Webcodegenie technologies",
 *             "locality": "Indian",
 *             "sublocality": "Canadian",
 *             "postalCode": "M3C 0H9",
 *             "country": "CA"
 *         },
 *         "phoneNumber": "4086577161",
 *         "birthday": "2001-08-11",
 *         "preferences": {
 *             "emailUnsubscribed": false
 *         },
 *         "creationSource": "THIRD_PARTY",
 *         "segmentIds": [
 *             "MLNVS88XVXNAS.CARDS_ON_FILE",
 *             "gv2:X0FESEC1A96SF12BSVJ2R1MFPG"
 *         ],
 *         "version": 1
 *     }
 * }
 *
 * @apiUse Authentication error
 *
 * @apiErrorExample Error-Response: Not Authorize to access.
 * {
 *     "message": "Error while get customer details",
 *     "status": 401,
 *     "error": [
 *         {
 *             "category": "AUTHENTICATION_ERROR",
 *             "code": "UNAUTHORIZED",
 *             "detail": "This request could not be authorized."
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Resource not found
 * {
 *     "message": "Error while get customer details",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Customer with ID `X56P964BH3B73SKKYECMNBGE2` not found.",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.get("/:id", async function (req, res, next) {
	try {
		const customerId = req.params.id
        const customerDetails =  await squareClient.getCustomer(customerId.toString());
		res.status(200).json({
            "message": "Successfully retrieved customer details.",
            "status":200,
			"data" : customerDetails,
        });
    } catch (error) {
        console.log(error);
        
        res.status(error.statusCode).json({
            "message": "Error while get customer details",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {put} /customers/:id
 * @apiDescription This API is used to update customer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName Update customer
 *
 * @apiParam (Parameters) {String}  id : customer's id
 * 
 * @apiParamExample {application/json} Request-Example:
 * {
 *     "givenName": "Swapnil updated",
 *     "familyName": "Sodha",
 *     "companyName": "Test Company",
 *     "nickname": "Swapnil",
 *     "emailAddress": "swapnil.s@webcodegenie.net",
 *     "address": {
 *       "addressLine1": "address_line_1",
 *       "addressLine2": "address_line_2",
 *       "addressLine3": "address_line_3",
 *       "locality": "locality",
 *       "sublocality": "sublocality",
 *       "sublocality2": "sublocality_2",
 *       "sublocality3": "sublocality_3",
 *       "administrativeDistrictLevel1": "administrative_district_level_1",
 *       "administrativeDistrictLevel2": "administrative_district_level_2",
 *       "administrativeDistrictLevel3": "administrative_district_level_3",
 *       "postalCode": "postal_code",
 *       "country": "CA",
 *       "firstName": "first_name",
 *       "lastName": "last_name",
 *     },
 *     "phoneNumber": "4086577161",
 *     "referenceId": "TEST-REFERENCE-ID",
 *     "note": "Test note",
 *     "birthday": "2024-09-13",
 *     "version": 1
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully updated customer details.",
 *     "status": 200,
 *     "data": {
 *         "id": "X56P964BH3B73SKKYECMNBGE20",
 *         "createdAt": "2024-09-12T05:25:31.404Z",
 *         "updatedAt": "2024-09-13T09:57:27Z",
 *         "cards": [
 *             {
 *                 "id": "ccof:CA4SEOmWQalwzY_tHeLUxCDVAvooAg",
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "cardholderName": "Swapnil Sodha",
 *                 "billingAddress": {
 *                     "postalCode": "94103"
 *                 }
 *             },...
 *         ],
 *         "givenName": "Sodha  sept 13",
 *         "familyName": "Swapnil updated",
 *         "nickname": "Swapy",
 *         "companyName": "WCG",
 *         "emailAddress": "swapnil.s@webcodegenie.net",
 *         "address": {
 *             "addressLine1": "Kargil petrol pump",
 *             "addressLine2": "Ganesh meredian",
 *             "addressLine3": "c-904 Webcodegenie technologies",
 *             "locality": "Indian",
 *             "sublocality": "Canadian",
 *             "postalCode": "M3C 0H9",
 *             "country": "CA"
 *         },
 *         "phoneNumber": "4086577161",
 *         "birthday": "2001-08-11",
 *         "preferences": {
 *             "emailUnsubscribed": false
 *         },
 *         "creationSource": "THIRD_PARTY",
 *         "segmentIds": [
 *             "MLNVS88XVXNAS.CARDS_ON_FILE",
 *             "gv2:X0FESEC1A96SF12BSVJ2R1MFPG"
 *         ]
 *     }
 * }
 *
 * @apiUse Authentication error
 *
 * @apiErrorExample Error-Response: Not Authorize to access.
 * {
 *     "message": "Error while get customer details",
 *     "status": 401,
 *     "error": [
 *         {
 *             "category": "AUTHENTICATION_ERROR",
 *             "code": "UNAUTHORIZED",
 *             "detail": "This request could not be authorized."
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Resource not found error
 * {
 *     "message": "Error while update customer details",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Customer with ID `X56P964BH3B73SKKYECMNBGE2` not found.",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Required field
 * {
 *     "message": "Error while update customer details",
 *     "status": 400,
 *     "error": [
 *         {
 *             "code": "BAD_REQUEST",
 *             "detail": "At least one field must be set to update a customer.",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.put("/:id", async function (req, res, next) {
	try {
		const customerId = req.params.id;
		const postData = req.body;
        const updatedCustomerDetails =  await squareClient.updateCustomer(customerId.toString(),postData);
		res.status(200).json({
            "message": "Successfully updated customer details.",
            "status":200,
			"data" : updatedCustomerDetails,
        });
    } catch (error) {
        console.log(error);
        
        res.status(error.statusCode).json({
            "message": "Error while update customer details",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {delete} /customers/:id/:version
 * @apiDescription This API is used to delete customer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName Delete customer
 *
 * @apiParam (Parameters) {String}  id : customer's id
 * @apiParam (Parameters) {String}  version: customer version
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully deleted customer details.",
 *     "status":200,
 * }
 *
 * @apiUse Authentication error
 *
 * @apiErrorExample Error-Response: Not Authorize to access.
 * {
 *     "message": "Error while get customer details",
 *     "status": 401,
 *     "error": [
 *         {
 *             "category": "AUTHENTICATION_ERROR",
 *             "code": "UNAUTHORIZED",
 *             "detail": "This request could not be authorized."
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Resource not found
 * {
 *     "message": "Error while delete customer details",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Customer with ID `CC7AN1ETJ4HPPFMDDVM2H5V2NC` not found.",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.delete("/:id/:version", async function (req, res, next) {
	try {
		const customerId = req.params.id;
		const customerVersion = req.params.version;
        await squareClient.deleteCustomer(customerId.toString(),customerVersion);
		res.status(200).json({
            "message": "Successfully deleted customer details.",
            "status":200,
        });
    } catch (error) {
        console.log(error);
        
        res.status(error.statusCode).json({
            "message": "Error while delete customer details",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

module.exports = router;
