const Logger = require("smart-logs");
/**
 * Function is used to normalize response , because in response number's type is Bigint this function convert into Number and in cent to dollar
 * @param {Object or Array} data Data to normalize 
 * @param {String} normalizeType Type of data to normalize accordingly
 * @returns {Object or Array} Depends on parameter data 
 */
const normalizeBigInt = function (data, normalizeType) {
	try {
		switch (normalizeType) {
			case "card":
				if (Array.isArray(data)) {
					for (const card of data) {
						if (card?.expMonth) {
							card.expMonth = Number(card.expMonth.toString());
						}
						if (card?.expYear) {
							card.expYear = Number(card.expYear.toString());
						}
						if (card?.version) {
							card.version = Number(card.version.toString());
						}
					}
				} else {
					if (data?.expMonth) {
						data.expMonth = Number(data.expMonth.toString());
					}
					if (data?.expYear) {
						data.expYear = Number(data.expYear.toString());
					}
					if (data?.version) {
						data.version = Number(data.version.toString());
					}
				}
				break;
			case "payment":
				if (Array.isArray(data)) {
					let i = 0;
					for (const payment of data) {
						payment.amountMoney.amount = (Number(payment.amountMoney.amount.toString())) / 100;
						payment.totalMoney.amount = (Number(payment.totalMoney.amount.toString())) / 100;
						payment.approvedMoney.amount = (Number(payment.approvedMoney.amount.toString())) / 100;
						if (payment?.refundedMoney?.amount) {
							payment.refundedMoney.amount = (Number(payment.refundedMoney.amount.toString())) / 100;
						}
						if (payment?.cardDetails?.card) {
							payment.cardDetails.card.expMonth = Number(payment.cardDetails.card.expMonth.toString());
							payment.cardDetails.card.expYear = Number(payment.cardDetails.card.expYear.toString());
						}
						if (payment?.processingFee?.length) {
							for (const feeObj of payment.processingFee) {
								feeObj.amountMoney.amount = (Number(feeObj.amountMoney.amount)) / 100;
							}
						}
					}
				} else {
					data.amountMoney.amount = (Number(data.amountMoney.amount.toString())) / 100;
					data.totalMoney.amount = (Number(data.totalMoney.amount.toString())) / 100;
					data.approvedMoney.amount = (Number(data.approvedMoney.amount.toString())) / 100;
					if (data?.refundedMoney?.amount) {
						data.refundedMoney.amount = (Number(data.refundedMoney.amount.toString())) / 100;
					}
					if (data?.cardDetails?.card) {
						data.cardDetails.card.expMonth = Number(data.cardDetails.card.expMonth.toString());
						data.cardDetails.card.expYear = Number(data.cardDetails.card.expYear.toString());
					}
					if (data?.processingFee?.length) {
						for (const feeObj of data.processingFee) {
							feeObj.amountMoney.amount = (Number(feeObj.amountMoney.amount)) / 100;
						}
					}
				}
				break;
			case "customer":
				if (Array.isArray(data)) {
					for (const customer of data) {
						customer.version = Number(customer.version.toString());
						if (customer?.cards?.length) {
							for (const card of customer.cards) {
								card.expMonth = Number(card.expMonth.toString());
								card.expYear = Number(card.expYear.toString());
							}
						}
					}
				} else {
					data.version = Number(data.version.toString());
					if (data?.cards?.length) {
						for (const card of data.cards) {
							card.expMonth = Number(card.expMonth.toString());
							card.expYear = Number(card.expYear.toString());
						}
					}
				}
				break;
			case "refund":
				if (data?.amountMoney?.amount) {
					data.amountMoney.amount = Number(data.amountMoney.amount.toString())/100;
				}
				break;
			case "refund-detail":
				if (data?.amountMoney?.amount) {
					data.amountMoney.amount = Number(data.amountMoney.amount.toString())/100;
				}
				if (data?.processingFee?.length) {
					for (const fee of data.processingFee) {
						fee.amountMoney.amount = Number(fee.amountMoney.amount.toString()) / 100;
					}
				}
				break;
			default:
				break;
		}
		return data;
	} catch (error) {
		console.log(error);		
		throw error;
		
	}
}

/**
 * Function to prepare parameters as squareup server accept in APIs
 * @param {ArrayOfStrings} params parameters 
 * @param {Object} postDataPagination , parameters in form of object from request body 
 * @returns Array of Strings
 * E.g : 
 * params : ["cursor","sort","customerId","cardId"]
 * 
 * postDataPagination : {
 * 		"customerId" : "X56P964BH3B73SKKYECMNBGE20"
 * 		"sort" : "ASC",
 * 		"cursor" : "jhfgjikshfjsnflkj",
 * }
 * 
 * Output : [ "jhfgjikshfjsnflkj", ASC", "X56P964BH3B73SKKYECMNBGE20", undefined ]
 */
const preparePaginationParameters = function (params, postDataPagination) {
	try {
		console.log("=>>>>. un-prepared params >>>>>>.",params);
		for (const key of params) {
			if (postDataPagination.hasOwnProperty(key) && ( postDataPagination[key] !== "" && postDataPagination[key] !== null && postDataPagination[key] !== undefined)) {
				params[params.indexOf(key)] = postDataPagination[key];
			} else {
				params[params.indexOf(key)] = undefined;
			}
		}
		console.log("=>>>>. prepared params >>>>>>.",params);
		return params;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	normalizeBigInt,
	preparePaginationParameters,
}