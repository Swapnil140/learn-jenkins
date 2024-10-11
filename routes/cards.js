const express = require("express");
const router = express.Router()
const squareClient = require("../common/square");


/**
 * @api {get} /cards/:id
 * @apiDescription This API is used to get card details
 * @apiVersion 1.0.0
 * @apiGroup Cards
 * @apiName Det card details
 *
 * @apiParam (Parameters) {string}  id : cards's id
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully fetched card details.",
 *     "status": 200,
 *     "data": {
 *         "id": "ccof:CA4SENtqzwkrV0zFx7qLEYQ5gLcoAg",
 *         "cardBrand": "VISA",
 *         "last4": "5858",
 *         "expMonth": 9,
 *         "expYear": 2026,
 *         "cardholderName": "Swapnil G4",
 *         "billingAddress": {
 *             "postalCode": "94103"
 *         },
 *         "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *         "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *         "merchantId": "MLNVS88XVXNAS",
 *         "enabled": false,
 *         "cardType": "CREDIT",
 *         "prepaidType": "NOT_PREPAID",
 *         "bin": "453275",
 *         "version": 2
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
 *     "message": "Error while fetching card details.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "category": "INVALID_REQUEST_ERROR",
 *             "code": "NOT_FOUND",
 *             "detail": "Card with ID ccof:CA4SENtqzwkrV0zFx7qLEYQ5gLcoA not found",
 *             "field": "card_id"
 *         }
 *     ]
 * }
 */
router.get("/:id", async function (req, res, next) {
	try {
		const cardsId = req.params.id;
		const cardsDetail = await squareClient.getCardDetails(cardsId);
		res.status(200).json({
			"message": "Successfully fetched card details.",
			"status" : 200,
			"data" : cardsDetail,
		});
	} catch (error) {
		res.status(error.statusCode).json({
			"message": "Error while fetching card details.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

/**
 * @api {put} /cards/:id
 * @apiDescription This API is used to disable card
 * @apiVersion 1.0.0
 * @apiGroup Cars
 * @apiName Disable card
 *
 * @apiParam (Parameters) {string}  id : card's id
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully card disabled.",
 * 	   "status": 200,
 *     "data": {
 *         "id": "ccof:CA4SENtqzwkrV0zFx7qLEYQ5gLcoAg",
 *         "cardBrand": "VISA",
 *         "last4": "5858",
 *         "expMonth": 9,
 *         "expYear": 2026,
 *         "cardholderName": "Swapnil G4",
 *         "billingAddress": {
 *             "postalCode": "94103"
 *         },
 *         "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *         "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *         "merchantId": "MLNVS88XVXNAS",
 *         "enabled": false,
 *         "cardType": "CREDIT",
 *         "prepaidType": "NOT_PREPAID",
 *         "bin": "453275",
 *         "version": 2
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
 *     "message": "Error while disabling card.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "category": "INVALID_REQUEST_ERROR",
 *             "code": "NOT_FOUND",
 *             "detail": "Card with ID ccof:CA4SENtqzwkrV0zFx7qLEYQ5gLco not found",
 *             "field": "card_id"
 *         }
 *     ]
 * }
 */
router.put("/:id", async function (req, res, next) {
	try {
		const cardsId = req.params.id;
		const cardsDetail = await squareClient.disableCard(cardsId);
		res.status(200).json({
			"message": "Successfully card disabled.",
			"status" : 200,
			"data" : cardsDetail,
		});
	} catch (error) {
		res.status(error.statusCode).json({
			"message": "Error while disabling card.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

/**
 * @api {post} /cards
 * @apiDescription This API is used to get cards for a customer
 * @apiVersion 1.0.0
 * @apiGroup Cards
 * @apiName Customer cards
 *
 * @apiParam (Parameters) {ObjectId}  id : customer's id
 * 
 * @apiParamExample {application/json} Request-Example:
 * {
 *     "cursor" : "",
 *     "customerId":"XXX5F1WGVPC4YE2775SNM2WZG4",
 *     "IncludeDisabledCard":false,
 *     "referenceId":"", 
 *     "sortOrder":"DESC"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully fetched card list for customer.",
 *     "status": 200,
 *     "data": [
 *         {
 *             "id": "ccof:CA4SELwoT5Xignn_WwHYySAaxzsoAg",
 *             "cardBrand": "VISA",
 *             "last4": "5858",
 *             "expMonth": 9,
 *             "expYear": 2026,
 *             "cardholderName": "Swapnil G4",
 *             "billingAddress": {
 *                 "postalCode": "94103"
 *             },
 *             "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *             "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *             "merchantId": "MLNVS88XVXNAS",
 *             "enabled": true,
 *             "cardType": "CREDIT",
 *             "prepaidType": "NOT_PREPAID",
 *             "bin": "453275",
 *             "version": 1
 *         },...
 *     ]
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
 * @apiErrorExample Error-Response: Customer has no cards
 * {
 *     "message": "Successfully fetched card list for customer.",
 *     "status": 200,
 *     "data": []
 * }
 */
router.post("/", async function (req, res, next) {
	try {
		// filter by data in body
		const postDataPagination = req.body;
		const cardsDetailsList = await squareClient.getCardList(postDataPagination);
		res.status(200).json({
			"message": "Successfully fetched card list for customer.",
			"status": 200,
			"data" : cardsDetailsList,
		});
	} catch (error) {
		console.log(error);
		
		res.status(error.statusCode).json({
			"message": "Error while fetching card list for customer.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

/**
 * @api {post} /cards/create
 * @apiDescription This API is used to create card for customer
 * @apiVersion 1.0.0
 * @apiGroup Cards
 * @apiName Add card
 *
 * @apiParamExample {application/json} Request-Example:
 * Card details in request body is optional by sourceId ( card token provided by front ) also used to create card
 * {
 * "sourceId": "cnon:card-nonce-ok",
 *     "card": {
 *     		"expMonth": 12, ( Optional )
 *     		"expYear": 2029, ( Optional )
 *     		"cardholderName": "Swapnil G4", ( Optional )
 *       "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4"
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully card added.",
 *     "status": 200,
 *     "data": {
 *         "id": "ccof:CA4SEDDlLRUxCD-3p3MaYkSfNr8oAg",
 *         "cardBrand": "VISA",
 *         "last4": "5858",
 *         "expMonth": 9,
 *         "expYear": 2026,
 *         "billingAddress": {
 *             "postalCode": "94103"
 *         },
 *         "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *         "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *         "merchantId": "MLNVS88XVXNAS",
 *         "enabled": true,
 *         "cardType": "CREDIT",
 *         "prepaidType": "NOT_PREPAID",
 *         "bin": "453275",
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
 *     "message": "Error while add card.",
 *     "error": [
 *         {
 *             "category": "INVALID_REQUEST_ERROR",
 *             "code": "CUSTOMER_NOT_FOUND",
 *             "detail": "Customer with ID `XXX5F1WGVPC475SNM2WZG4` not found.",
 *             "field": "card.customer_id"
 *         }
 *     ]
 * }
 */
router.post("/create", async function (req, res, next) {
	try {
		const postData = req.body;
		const createdCardDetails = await squareClient.createCard(postData);
		res.status(200).json({
			"message": "Successfully card added.",
			"status": 200,
			"data" : createdCardDetails,
		});
	} catch (error) {
		console.log(error);
		res.status(error.statusCode).json({
			"message": "Error while add card.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

module.exports = router;

