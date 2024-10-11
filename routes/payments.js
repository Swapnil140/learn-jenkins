const express = require("express");
const router = express.Router()
const squareClient = require("../common/square");

/**
 * @api {post} /payments
 * @apiDescription This API is used to list payments
 * @apiVersion 1.0.0
 * @apiGroup Payments
 * @apiName Payment List
 *
 * @apiParamExample {application/json} Request-Example:
 *  NOTE : All body parameters are optional
 * {
 *     "beginTime":"2024-09-11T11:04:21.956Z",
 *     "endTime":"2024-09-13T11:04:21.956Z",
 *     "sortOrder":"DESC",
 *     "cursor":"",
 *     "locationId":"L3QG0E6KQM1RT",
 *     "total":"100", // in cent
 *     "last4":"1111",
 *     "cardBrand":"VISA",
 *     "limit": "10",
 *     "isOfflinePayment":false,
 *     "offlineBeginTime":"2024-09-13T11:04:21.956Z",
 *     "offlineEndTime":"2024-09-13T11:04:21.956Z"
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "data": [
 *         {
 *             "id": "lKMIIggw54LBdnec2Lvvc9HtqceZY",
 *             "createdAt": "2024-09-13T07:06:29.488Z",
 *             "updatedAt": "2024-09-13T07:06:29.610Z",
 *             "amountMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "totalMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "approvedMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "status": "APPROVED",
 *             "delayDuration": "PT168H",
 *             "delayAction": "CANCEL",
 *             "delayedUntil": "2024-09-20T07:06:29.488Z",
 *             "sourceType": "CARD",
 *             "cardDetails": {
 *                 "status": "AUTHORIZED",
 *                 "card": {
 *                     "cardBrand": "VISA",
 *                     "last4": "5858",
 *                     "expMonth": 9,
 *                     "expYear": 2026,
 *                     "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                     "cardType": "CREDIT",
 *                     "prepaidType": "NOT_PREPAID",
 *                     "bin": "453275"
 *                 },
 *                 "entryMethod": "KEYED",
 *                 "cvvStatus": "CVV_ACCEPTED",
 *                 "avsStatus": "AVS_ACCEPTED",
 *                 "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *                 "cardPaymentTimeline": {
 *                     "authorizedAt": "2024-09-13T07:06:29.610Z"
 *                 }
 *             },
 *             "locationId": "L3QG0E6KQM1RT",
 *             "orderId": "KjVAT21BXPDtAPf11AUuvDNrvd4F",
 *             "riskEvaluation": {
 *                 "createdAt": "2024-09-13T07:06:29.610Z",
 *                 "riskLevel": "NORMAL"
 *             },
 *             "capabilities": [
 *                 "EDIT_AMOUNT_UP",
 *                 "EDIT_AMOUNT_DOWN",
 *                 "EDIT_TIP_AMOUNT_UP",
 *                 "EDIT_TIP_AMOUNT_DOWN",
 *                 "EDIT_DELAY_ACTION"
 *             ],
 *             "receiptNumber": "lKMI",
 *             "applicationDetails": {
 *                 "squareProduct": "ECOMMERCE_API",
 *                 "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *             },
 *             "versionToken": "cOtSUcJXxNC8EAnkjfB1iz2WWgmDFZuZkGtNKAk4xZN6o"
 *         },
 *         {
 *             "id": "PzyOGhUEyB6rlCyJn4R1MTMzgvNZY",
 *             "createdAt": "2024-09-13T06:53:56.457Z",
 *             "updatedAt": "2024-09-13T06:53:56.591Z",
 *             "amountMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "totalMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "approvedMoney": {
 *                 "amount": 500,
 *                 "currency": "CAD"
 *             },
 *             "status": "APPROVED",
 *             "delayDuration": "PT168H",
 *             "delayAction": "CANCEL",
 *             "delayedUntil": "2024-09-20T06:53:56.457Z",
 *             "sourceType": "CARD",
 *             "cardDetails": {
 *                 "status": "AUTHORIZED",
 *                 "card": {
 *                     "cardBrand": "VISA",
 *                     "last4": "5858",
 *                     "expMonth": 9,
 *                     "expYear": 2026,
 *                     "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                     "cardType": "CREDIT",
 *                     "prepaidType": "NOT_PREPAID",
 *                     "bin": "453275"
 *                 },
 *                 "entryMethod": "KEYED",
 *                 "cvvStatus": "CVV_ACCEPTED",
 *                 "avsStatus": "AVS_ACCEPTED",
 *                 "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *                 "cardPaymentTimeline": {
 *                     "authorizedAt": "2024-09-13T06:53:56.591Z"
 *                 }
 *             },
 *             "locationId": "L3QG0E6KQM1RT",
 *             "orderId": "0myFWF1akmT1c3wTyCTglLgzbb4F",
 *             "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *             "riskEvaluation": {
 *                 "createdAt": "2024-09-13T06:53:56.591Z",
 *                 "riskLevel": "NORMAL"
 *             },
 *             "capabilities": [
 *                 "EDIT_AMOUNT_UP",
 *                 "EDIT_AMOUNT_DOWN",
 *                 "EDIT_TIP_AMOUNT_UP",
 *                 "EDIT_TIP_AMOUNT_DOWN",
 *                 "EDIT_DELAY_ACTION"
 *             ],
 *             "receiptNumber": "PzyO",
 *             "applicationDetails": {
 *                 "squareProduct": "ECOMMERCE_API",
 *                 "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *             },
 *             "versionToken": "ZRpVjUY8tDPKl50dD0xetdRUsGj0MEQbTscG5qQoE8R6o"
 *         },...
 *     ],
 *     "status": 200,
 *     "message": "Successfully fetched payment list"
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
 * @apiErrorExample Error-Response: Resource not found
 * {
 *         "message": "Successfully fetched payment list"
 *         "status": 200,
 *         "data" : []
 * }
 */
router.post('/', async function (req, res, next) {
    try {
		const postDataPagination = req.body;
        const cardCreatedPayment = await squareClient.getPaymentList(postDataPagination);
		res.status(200).json({
			"message": "Successfully fetched payment list",
			"status": 200,
			"data": cardCreatedPayment,
		});
    } catch (error) {
        console.log("=>>>>>>>>>>.. errrrrrrrrrrrrrrr",error );
        
        res.status(error.statusCode).json({
            "message": "Error while fetching payment list",
            "status": error.statusCode,
            "error" : error.errors
		});
	}
});

/**
 * @api {post} /payments/create
 * @apiDescription This API is used to create payment
 * @apiVersion 1.0.0
 * @apiGroup payment
 * @apiName Create payment
 *
 * @apiParamExample {application/json} Request-Example:
 * NOTE : customerId is optional
 * NOTE : if wrong customerId provided it create payment from card
 * {
 *     "sourceId":"cnon:card-nonce-ok",
 *     "amount": 500, // Amount in dollar ( $ )
 *     // "customerId": "XXX5F1WGVPC4YE2775SNM2WZG4",
 *     "autocomplete": false
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "data": {
 *         "id": "bLb8j46Ms5mgT1FYtC1I5MgSuh9YY",
 *         "createdAt": "2024-09-13T12:21:13.897Z",
 *         "updatedAt": "2024-09-13T12:21:14.020Z",
 *         "amountMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "totalMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "approvedMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "status": "APPROVED",
 *         "delayDuration": "PT168H",
 *         "delayAction": "CANCEL",
 *         "delayedUntil": "2024-09-20T12:21:13.897Z",
 *         "sourceType": "CARD",
 *         "cardDetails": {
 *             "status": "AUTHORIZED",
 *             "card": {
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                 "cardType": "CREDIT",
 *                 "prepaidType": "NOT_PREPAID",
 *                 "bin": "453275"
 *             },
 *             "entryMethod": "KEYED",
 *             "cvvStatus": "CVV_ACCEPTED",
 *             "avsStatus": "AVS_ACCEPTED",
 *             "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *             "cardPaymentTimeline": {
 *                 "authorizedAt": "2024-09-13T12:21:14.020Z"
 *             }
 *         },
 *         "locationId": "L3QG0E6KQM1RT",
 *         "orderId": "uplTl5Lo27N48kUUfNTNwH4aXf4F",
 *         "riskEvaluation": {
 *             "createdAt": "2024-09-13T12:21:14.020Z",
 *             "riskLevel": "NORMAL"
 *         },
 *         "capabilities": [
 *             "EDIT_AMOUNT_UP",
 *             "EDIT_AMOUNT_DOWN",
 *             "EDIT_TIP_AMOUNT_UP",
 *             "EDIT_TIP_AMOUNT_DOWN",
 *             "EDIT_DELAY_ACTION"
 *         ],
 *         "receiptNumber": "bLb8",
 *         "applicationDetails": {
 *             "squareProduct": "ECOMMERCE_API",
 *             "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *         },
 *         "versionToken": "NWtqamsJgVAAKrZwyI2wvmQx39ehsd2n76FqSgfM6kR6o"
 *     },
 *     "status" : 200,
 *     "message": "Successfully created card payment"
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
 * @apiErrorExample Error-Response: card token incorrect
 * {
 *     "message": "Error while create payment.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Card nonce not found",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.post('/create', async function (req, res, next) {
	try {
		const postData = req.body;
		const cardCreatedPayment = await squareClient.createPayment({
			"sourceId": postData.sourceId,
			"amount": postData.amount,
			"customerId":postData.customerId,
			"autocomplete":postData.autocomplete
		});
		res.status(200).json({
			"message": "Successfully created payment.",
			"status": 200,
			"data": cardCreatedPayment,
		});
	} catch (error) {
		res.status(error.statusCode).json({
			"message": "Error while create payment.",
			"status": error.statusCode,
			"error": error.errors
		});
	}
});

/**
 * @api {get} /payments/:id
 * @apiDescription This API is used to get payment details
 * @apiVersion 1.0.0
 * @apiGroup Payment
 * @apiName Get payment detail
 *
 * @apiParam (Parameters) {String}  id : payment's id
 * 
 * @apiSuccessExample {json} Success-Response:  
 * {
 *     "message": "Successfully get payment details.",
 *     "status": 200,
 *     "data": {
 *         "id": "lKMIIggw54LBdnec2Lvvc9HtqceZY",
 *         "createdAt": "2024-09-13T07:06:29.488Z",
 *         "updatedAt": "2024-09-13T07:06:29.610Z",
 *         "amountMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "totalMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "approvedMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "status": "APPROVED",
 *         "delayDuration": "PT168H",
 *         "delayAction": "CANCEL",
 *         "delayedUntil": "2024-09-20T07:06:29.488Z",
 *         "sourceType": "CARD",
 *         "cardDetails": {
 *             "status": "AUTHORIZED",
 *             "card": {
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                 "cardType": "CREDIT",
 *                 "prepaidType": "NOT_PREPAID",
 *                 "bin": "453275"
 *             },
 *             "entryMethod": "KEYED",
 *             "cvvStatus": "CVV_ACCEPTED",
 *             "avsStatus": "AVS_ACCEPTED",
 *             "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *             "cardPaymentTimeline": {
 *                 "authorizedAt": "2024-09-13T07:06:29.610Z"
 *             }
 *         },
 *         "locationId": "L3QG0E6KQM1RT",
 *         "orderId": "KjVAT21BXPDtAPf11AUuvDNrvd4F",
 *         "riskEvaluation": {
 *             "createdAt": "2024-09-13T07:06:29.610Z",
 *             "riskLevel": "NORMAL"
 *         },
 *         "capabilities": [
 *             "EDIT_AMOUNT_UP",
 *             "EDIT_AMOUNT_DOWN",
 *             "EDIT_TIP_AMOUNT_UP",
 *             "EDIT_TIP_AMOUNT_DOWN",
 *             "EDIT_DELAY_ACTION"
 *         ],
 *         "receiptNumber": "lKMI",
 *         "applicationDetails": {
 *             "squareProduct": "ECOMMERCE_API",
 *             "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *         },
 *         "versionToken": "cOtSUcJXxNC8EAnkjfB1iz2WWgmDFZuZkGtNKAk4xZN6o"
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
 *     "message": "Error while fetching payment details.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Could not find payment with id: lKMIIggw54LBdnec2Lvvc9HtqceZYsdf",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.get('/:id', async function (req, res, next) {
    try {
        const paymentDetailsResponse = await squareClient.getPayment(req.params.id);
        res.status(200).json({
            "message": "Successfully get payment details.",
            "status": 200,
            "data": paymentDetailsResponse,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": "Error while fetching payment details.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {put} /payments/idempotencyKey/:id
 * @apiDescription This API is used to cancel payment by idempotencyKey
 * @apiVersion 1.0.0
 * @apiGroup Payment
 * @apiName Cancel payment by idempotencyKey
 *
 * @apiParam (Parameters) {String}  id : payments's idempotency key ( unique key )
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully cancelled payment.",
 *     "status": 200
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
 * @apiErrorExample Error-Response: Completed payment can not be cancelled error
 * {
 *     "message": "Error while update payment by idempotency key.",
 *     "error": [
 *         {
 *             "code": "BAD_REQUEST",
 *             "detail": "Payment jnpTwTvuz9XPfKqrwG6zhFCpSr6YY is in inflight state COMPLETED, which is invalid for the requested operation",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 */
router.put('/idempotencyKey/:id', async function (req, res, next) {
	try {
        await squareClient.cancelPaymentByIdempotencyKey(req.params.id);
        res.status(200).json({
            "message": "Successfully cancelled payment.",
            "status": 200,
        });
	} catch (error) {
		console.log(error);
        res.status(error.statusCode).json({
            "message": "Error while cancelling payment by idempotency key.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {put} /payments/:id
 * @apiDescription This API is used to update payment details like amount money with status approve by paymentId
 * @apiVersion 1.0.0
 * @apiGroup Payments
 * @apiName Update payment
 *
 * @apiParam (Parameters) {String}  id : payment's id
 * 
 * @apiParamExample {application/json} Request-Example:
 * // You can update tipAmount same as amount money and accordingly totalAmount updated
 * {
 *     "payment": {
 *       "amountMoney": {
 *         "amount": 200,  // amount in dollar
 *         "currency": "CAD"
 *       }
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully payment Updated.",
 *     "status": 200,
 *     "data": {
 *         "id": "RS9uxwu1LBWYk3OTPKUCIOFMYzKZY",
 *         "createdAt": "2024-09-16T04:22:21.935Z",
 *         "updatedAt": "2024-09-16T04:22:22.057Z",
 *         "amountMoney": {
 *             "amount": 200,
 *             "currency": "CAD"
 *         },
 *         "totalMoney": {
 *             "amount": 200,
 *             "currency": "CAD"
 *         },
 *         "approvedMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "status": "APPROVED",
 *         "delayDuration": "PT168H",
 *         "delayAction": "CANCEL",
 *         "delayedUntil": "2024-09-23T04:22:21.935Z",
 *         "sourceType": "CARD",
 *         "cardDetails": {
 *             "status": "AUTHORIZED",
 *             "card": {
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                 "cardType": "CREDIT",
 *                 "prepaidType": "NOT_PREPAID",
 *                 "bin": "453275"
 *             },
 *             "entryMethod": "KEYED",
 *             "cvvStatus": "CVV_ACCEPTED",
 *             "avsStatus": "AVS_ACCEPTED",
 *             "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *             "cardPaymentTimeline": {
 *                 "authorizedAt": "2024-09-16T04:22:22.057Z"
 *             }
 *         },
 *         "locationId": "L3QG0E6KQM1RT",
 *         "orderId": "kABMwyAbyMPVGagAH3ZJGHDJCf4F",
 *         "customerId": "XXX5F1WGVPC775SNM2WZG4",
 *         "riskEvaluation": {
 *             "createdAt": "2024-09-16T04:22:22.057Z",
 *             "riskLevel": "NORMAL"
 *         },
 *         "capabilities": [
 *             "EDIT_AMOUNT_UP",
 *             "EDIT_AMOUNT_DOWN",
 *             "EDIT_TIP_AMOUNT_UP",
 *             "EDIT_TIP_AMOUNT_DOWN",
 *             "EDIT_DELAY_ACTION"
 *         ],
 *         "receiptNumber": "RS9u",
 *         "applicationDetails": {
 *             "squareProduct": "ECOMMERCE_API",
 *             "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *         },
 *         "versionToken": "X5ESf5LS365SrHETIfgtA9qFi80HC8esemTICMvXYGP6o"
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
 *
 * @apiErrorExample Error-Response: Error while update completed payment
 * {
 *     "message": "Error while updating payment details by paymentId.",
 *     "status": 400,
 *     "error": [
 *         {
 *             "code": "BAD_REQUEST",
 *             "detail": "Payment xCd27vTqCISDHfcfW8kREA0WmycZY is in inflight state COMPLETED, which is invalid for the requested operation",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Payment not found
 * {
 *     "message": "Error while updating payment details by paymentId.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Could not find payment with id: xCd27vTqCISDHfcfW8kREA0Wmy",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.put('/:id', async function (req, res, next) {
	try {
		const postData = req.body;
        const paymentDetailsResponse = await squareClient.updatePayment(req.params.id, postData);
        res.status(200).json({
            "message": "Successfully payment Updated.",
            "status": 200,
            "data": paymentDetailsResponse,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": "Error while updating payment details by paymentId.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {post} /payments/refund
 * @apiDescription This API is used to refund completed payment
 * @apiVersion 1.0.0
 * @apiGroup Payment
 * @apiName Refund payment
 *
 * @apiParamExample {application/json} Request-Example:
 * NOTE : idempotency-key added to body as uuidv4 from API side
 * {
 *     "amountMoney": {
 * 		"amount": 10, // amount in dollar ( $ )
 * 		"currency": "CAD"
 * 	},
 * 	"paymentId": "x8khyZbWHu2xgIzgOSwbws8bwECZY",
 * 	"paymentVersionToken": "xvT4N0fHIfi4z1PZsh4og49qZC6T8Uu6mgY9OcsqMTC6o"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully payment refunded.",
 *     "status": 200,
 *     "data": {
 *         "id": "xCd27vTqCISDHfcfW8kREA0WmycZY_5ly6jLs4kripKQAz1xdUCfFl4CiXmSy21MLwFbOlWTT",
 *         "status": "PENDING",
 *         "locationId": "L3QG0E6KQM1RT",
 *         "destinationType": "CARD",
 *         "amountMoney": {
 *             "amount": 100,
 *             "currency": "CAD"
 *         },
 *         "paymentId": "xCd27vTqCISDHfcfW8kREA0WmycZY",
 *         "orderId": "ooKvUGccfaACXqdlIgC2D7RPLf4F",
 *         "createdAt": "2024-09-16T04:06:43.946Z",
 *         "updatedAt": "2024-09-16T04:06:44.109Z"
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
 * @apiErrorExample Error-Response: File upload error
 * {
 *         "status" : 413,
 *         "expose" : true,
 *         "message" : "Error on uploaded attachments of customer",
 *         "messageCode" : "2012"
 * }
 *
 * @apiErrorExample Error-Response: Payment version not match error
 * {
 *     "message": "Error while refund payment.",
 *     "status": 400,
 *     "error": [
 *         {
 *             "code": "VERSION_MISMATCH",
 *             "detail": "Version mismatch: The specified version_token in the request does not match the current version_token.",
 *             "field": "version_token",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Payment details not found
 * {
 *     "message": "Error while refund payment.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Could not find payment with id: xCd27vTqCISDHfcfW8kREA0Wmyc",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.post("/refund", async function (req, res, next) {
	try {
		const postData = req.body;
        const paymentDetailsResponse = await squareClient.refundPayment(postData);
        res.status(200).json({
            "message": "Successfully payment refunded.",
            "status": 200,
            "data": paymentDetailsResponse,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": "Error while refund payment.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {post} /payments/refund/:refundId
 * @apiDescription This API is used to get refund detail for refunded transaction
 * @apiVersion 1.0.0
 * @apiGroup Payment
 * @apiName Payment refund's refund details
 *
 * @apiParam (Parameters) {String}  refundId : refund's id
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully fetched refunded payment details.",
 *     "status": 200,
 *     "data": {
 *         "id": "x8khyZbWHu2xgIzgOSwbws8bwECZY_tjVCHuZS5A1SxYCbOMYcDyDZhSaOLN70sCZxSbUPKjQ",
 *         "status": "COMPLETED",
 *         "locationId": "L3QG0E6KQM1RT",
 *         "destinationType": "CARD",
 *         "amountMoney": {
 *             "amount": 10,
 *             "currency": "CAD"
 *         },
 *         "processingFee": [
 *             {
 *                 "effectiveAt": "2024-09-13T08:10:27.000Z",
 *                 "type": "INITIAL",
 *                 "amountMoney": {
 *                     "amount": 0,
 *                     "currency": "CAD"
 *                 }
 *             }
 *         ],
 *         "paymentId": "x8khyZbWHu2xgIzgOSwbws8bwECZY",
 *         "orderId": "CBGOGIHEpeGWjowp2xhjTSZxcg4F",
 *         "createdAt": "2024-09-13T06:11:05.865Z",
 *         "updatedAt": "2024-09-13T06:11:08.873Z"
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
 *     "message": "Error while refund fetching refund payment details.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Could not find refund with id: x8khyZbWHu2xgIzgOSwbws8bwECZY_tjVCHuZS5A1SxYCbOMYcDyDZhSaOLN70sCZxSbU",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.get("/refund/:refundId", async function (req, res, next) {
	try {
		const refundId = req.params.refundId;
        const refundDetails = await squareClient.getRefundPayment(refundId);
        res.status(200).json({
            "message": "Successfully fetched refunded payment details.",
            "status": 200,
            "data": refundDetails,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": "Error while refund fetching refund payment details.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});

/**
 * @api {put} /payment/complete/:id
 * @apiDescription This API is used to mark payment as complete
 * @apiVersion 1.0.0
 * @apiGroup Payment
 * @apiName Complete payment
 *
 * @apiParam (Parameters) {String}  id : payment's id
 * 
 * @apiParam (Parameters)
 * {
 *     "versionToken":"Wj0dnrwNeNrimBVqpyO3jZhxsaIqf5mhwPYTFUMuwYO6o"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Successfully payment marked completed.",
 *     "status": 200,
 *     "data": {
 *         "id": "DHxNvydIEgJnU4F8OT0r0AxJ9AcZY",
 *         "createdAt": "2024-09-13T13:13:05.366Z",
 *         "updatedAt": "2024-09-13T13:13:19.626Z",
 *         "amountMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "totalMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "approvedMoney": {
 *             "amount": 500,
 *             "currency": "CAD"
 *         },
 *         "status": "COMPLETED",
 *         "delayDuration": "PT168H",
 *         "delayAction": "CANCEL",
 *         "delayedUntil": "2024-09-20T13:13:05.366Z",
 *         "sourceType": "CARD",
 *         "cardDetails": {
 *             "status": "CAPTURED",
 *             "card": {
 *                 "cardBrand": "VISA",
 *                 "last4": "5858",
 *                 "expMonth": 9,
 *                 "expYear": 2026,
 *                 "fingerprint": "sq-1-y0rzA0f9hAhln-gOM_GejWZpJ8kTcUwbFuMnkSUxlDT8g1GBFPivsemVVFQcGPjjkg",
 *                 "cardType": "CREDIT",
 *                 "prepaidType": "NOT_PREPAID",
 *                 "bin": "453275"
 *             },
 *             "entryMethod": "KEYED",
 *             "cvvStatus": "CVV_ACCEPTED",
 *             "avsStatus": "AVS_ACCEPTED",
 *             "statementDescription": "SQ *MARIO TOWING GOSQ.CO",
 *             "cardPaymentTimeline": {
 *                 "authorizedAt": "2024-09-13T13:13:05.487Z",
 *                 "capturedAt": "2024-09-13T13:13:19.627Z"
 *             }
 *         },
 *         "locationId": "L3QG0E6KQM1RT",
 *         "orderId": "2tPSyhpKGmx6cbGXIgScqdKgQh4F",
 *         "customerId": "XXX5F1WGVPC775SNM2WZG4",
 *         "riskEvaluation": {
 *             "createdAt": "2024-09-13T13:13:05.488Z",
 *             "riskLevel": "NORMAL"
 *         },
 *         "receiptNumber": "DHxN",
 *         "receiptUrl": "https://squareupsandbox.com/receipt/preview/DHxNvydIEgJnU4F8OT0r0AxJ9AcZY",
 *         "applicationDetails": {
 *             "squareProduct": "ECOMMERCE_API",
 *             "applicationId": "sandbox-sq0idb-SLk3iH6v8L5yRJJf63H8XQ"
 *         },
 *         "versionToken": "MvcMWiNlxuXGgcumripo7Ya7NeFYDNqCJDDXIRF1gvy6o"
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
 * @apiErrorExample Error-Response: payment version token mismatch
 * {
 *     "message": "Error while update payment to complete.",
 *     "status": 400,
 *     "error": [
 *         {
 *             "code": "VERSION_MISMATCH",
 *             "detail": "Version mismatch: The specified version_token in the request does not match the current version_token.",
 *             "field": "version_token",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 *
 * @apiErrorExample Error-Response: Resource not found
 * {
 *     "message": "Error while update payment to complete.",
 *     "status": 404,
 *     "error": [
 *         {
 *             "code": "NOT_FOUND",
 *             "detail": "Could not find payment with id: DHxNvydIEgJnU4F8OT0r0AxJ9Ac",
 *             "category": "INVALID_REQUEST_ERROR"
 *         }
 *     ]
 * }
 */
router.put("/complete/:id", async function (req, res, next) {
	try {
		const postData = req.body;
        const paymentDetails = await squareClient.completePayment(req.params.id, postData);
        res.status(200).json({
            "message": "Successfully payment marked completed.",
            "status": 200,
            "data": paymentDetails,
        });
	} catch (error) {
        res.status(error.statusCode).json({
            "message": "Error while update payment to complete.",
            "status": error.statusCode,
            "error": error.errors
        });
    }
});


module.exports = router;

