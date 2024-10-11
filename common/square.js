const uuidV4 = require("uuid4");
var fs = require('fs');

// Require square npm package 
const { Client, Environment, ApiError } = require("square");
// Create client with credentials
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Directly pass access token here
  environment: Environment.Sandbox, // Ensure Sandbox environment is correct
  squareVersion: "2023-09-15", // Latest API version in correct date format
  httpClientOptions: {
    timeout: 100000, // Timeout settings (adjust as needed)
    // retryConfig: {
    //   maxNumberOfRetries: 2, // Retry configuration
    //   maximumRetryWaitTime: 1000000, // Retry wait time
    // },
  },
});

// Destructure client's process
const { locationsApi, customersApi, cardsApi, paymentsApi, refundsApi} = client;
// Square payment gateway payment APIs
// 1. Create payment by card
const createPayment = async function(paymentDetails) {	
	try {
		const uuid = uuidV4();
		console.log(">>>>>>>>>>>>. uuid while create payment as idempotencyKey >>>>>>.",uuid);
		const createPaymentResponse = await paymentsApi.createPayment({
			"sourceId": paymentDetails.sourceId,
			"idempotencyKey": uuid,
			"amountMoney": {
				// Square payment gateway accepts in cents not in dollars($)
				"amount": Number(parseFloat((paymentDetails.amount)*100).toFixed(2)),
				"currency": "CAD"
			},
			"customerId" : paymentDetails.customerId,
			"autocomplete": paymentDetails?.autocomplete ? paymentDetails?.autocomplete : false,
		});
		return common.normalizeBigInt(createPaymentResponse.result.payment, "payment");
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// Square payment gateway refund APIs
// 2. Refund amount from payment 
const refundPayment = async function(postData) {	
	try {
		// convert dollar to cent
		postData.amountMoney.amount = Number(parseFloat((postData.amountMoney.amount) * 100).toFixed(2));
		const uuid = uuidV4();
		const refundPaymentResponse = await refundsApi.refundPayment({
			"idempotencyKey": uuid,
			...postData
		});
		return common.normalizeBigInt(refundPaymentResponse.result.refund, "refund");
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// 3. Get refund transaction details by refundId
const getRefundPayment = async function(refundId) {	
	try {
		// convert dollar to cent
		const refundPaymentDetailResponse = await refundsApi.getPaymentRefund(refundId);
		return common.normalizeBigInt(refundPaymentDetailResponse.result.refund, "refund-detail");
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// 4. Get payment details by paymentId
const getPayment = async function(paymentId) {	
	try {
		const paymentDetailResponse = await paymentsApi.getPayment(paymentId);
		return common.normalizeBigInt(paymentDetailResponse.result.payment, "payment");
	} catch (error) {
		throw error;
	}
}
// 5. Mark payment as complete by paymentId and versionId
const completePayment = async function(paymentId, postData) {	
	try {
		const paymentUpdateResponse = await paymentsApi.completePayment(paymentId, postData);
		return common.normalizeBigInt(paymentUpdateResponse.result.payment, "payment");
	} catch (error) {
		throw error;
	}
}
// 6. Update payment which is not mark as completed by paymentId
const updatePayment = async function(paymentId, postData) {	
	try {
		const uuid = uuidV4();
		const paymentUpdateResponse = await paymentsApi.updatePayment(paymentId, {
			"idempotencyKey": uuid,
			"payment": {
				"amountMoney": {
					"amount": BigInt(Number(postData.payment.amountMoney.amount)*100),
					"currency": "CAD"
				}
			}
		});
		return common.normalizeBigInt(paymentUpdateResponse.result.payment, "payment");
	} catch (error) {
		throw error;
	}
}
// 7. Cancel payment by idempotncyId which is not complete 
const cancelPaymentByIdempotencyKey = async function(IdempotencyKey) {	
	try {
		await paymentsApi.cancelPaymentByIdempotencyKey({
			"idempotencyKey": IdempotencyKey
		});
	} catch (error) {
		throw error;
	}
}
// 8. Get payment details list
const getPaymentList = async function(postDataPagination) {	
	try {
		const paymentPaginationParameter = ["beginTime","endTime","sortOrder","cursor","locationId","total","last4","cardBrand","limit","isOfflinePayment","offlineBeginTime","offlineEndTime"];
		// Payment list API taking parameter for pagination prepare parameters
		const paymentListResponse = await paymentsApi.listPayments(...common.preparePaginationParameters(paymentPaginationParameter, postDataPagination));
		return common.normalizeBigInt(paymentListResponse.result.payments, "payment");
	} catch (error) {
		throw error;
	}
}
// Square payment gateway customer APIs
// 1. Create customer
const createCustomer = async function(customerDetails) {
	try {
		const uuid = uuidV4();
		const response = await customersApi.createCustomer({ "idempotencyKey": uuid, ...customerDetails });
		console.log("=.>>>>>> response >>>>>>>.");
		console.log(response);
		console.log("=.>>>>>> response >>>>>>>.");
		
		delete response.result.customer.version;
		return response.result.customer;		
	} catch (error) {
		throw error;
	}
}
// 2. Retrieve customer details
const getCustomer = async function(customerId) {
	try {
		const response = await customersApi.retrieveCustomer(customerId);
		// Removing version field from customer details as not required and creating error while sending into json response
		return common.normalizeBigInt(response.result.customer, "customer");
	} catch (error) {
		throw error;
	}
}
// 3. Update customer details
const updateCustomer = async function(customerId,postData) {
	try {
		const response = await customersApi.updateCustomer(customerId,postData);
		// Removing version field from customer details as not required and creating error while sending into json response
		delete response.result.customer.version;
		return common.normalizeBigInt(response.result.customer, "customer");
	} catch (error) {
		throw error;
	}
}
// 4. Delete customer
const deleteCustomer = async function(customerId, customerVersion) {
	try {
		const response = await customersApi.deleteCustomer(customerId, customerVersion);
		return response.result.customer;
	} catch (error) {
		throw error;
	}
}
// 5. Get customer list
const getCustomerList = async function(postDataPagination) {
	try {
		const customerPaginationParameter = ["cursor", "limit", "sortField", "sortOrder", "count"];
		// Customer List API taking parameter for pagination prepare parameters
		const response = await customersApi.listCustomers(...common.preparePaginationParameters(customerPaginationParameter, postDataPagination));
		return common.normalizeBigInt(response.result.customers, "customer");
	} catch (error) {
		throw error;
	}
}
// Square payment gateway cards APIs
// 1. Get card details list for a customer
const getCardList = async function(postDataPagination) {
	try {
		const cardPaginationParameter = ["cursor", "customerId", "IncludeDisabledCard", "referenceId", "sortOrder"];
		// Card List API taking parameter for pagination prepare parameters
		const response = await cardsApi.listCards(...common.preparePaginationParameters(cardPaginationParameter, postDataPagination));
		return response?.result?.cards?.length ? common.normalizeBigInt(response.result.cards, "card") : [];
	} catch (error) {
		throw error;
	}
}
// 2. Get card details by cardId
const getCardDetails = async function(cardId) {
	try {
		const cardDetailResponse = await cardsApi.retrieveCard(cardId);
		return common.normalizeBigInt(cardDetailResponse.result.card, "card");
	} catch (error) {
		throw error;
	}
}
// 3. Disable card by cardId
const disableCard = async function(cardId) {
	try {
		const cardDetailResponse = await cardsApi.disableCard(cardId);
		return common.normalizeBigInt(cardDetailResponse.result.card, "card");
	} catch (error) {
		throw error;
	}
}
// 4. Create card with customerId
const createCard = async function (cardDetails) {
	try {
		const uuid = uuidV4();
		const createCardResponse = await cardsApi.createCard({
			"idempotencyKey": uuid,
			...cardDetails,
		});
		return common.normalizeBigInt(createCardResponse.result.card, "card");
	} catch (error) {
		// throw new Error("");
		throw error
	}
}
// Square payment gateway location APIs
// 1. Get account locations
const getLocations = async function () {
	try {
		let listLocationsResponse = await locationsApi.listLocations();

		let locations = listLocationsResponse.result.locations;
		return locations;
	} catch (error) {
		if (error instanceof ApiError) {
			error.result.errors.forEach(function (e) {
				console.log(e.category);
				console.log(e.code);
				console.log(e.detail);
			});
		} else {
			console.log("Unexpected error occurred: ", error);
		}
		throw error;
	}
};

module.exports = {
	// Customer
	createCustomer,getCustomer,getCustomerList,updateCustomer,deleteCustomer,
	// Payment
	createPayment,getPayment,getPaymentList,cancelPaymentByIdempotencyKey,updatePayment,refundPayment,getRefundPayment,completePayment,
	// Card
	getCardList,createCard,getCardDetails,disableCard,
	// getCards,
	getLocations,
}
