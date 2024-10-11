# Customers
## 1. Create customer
## 2. Get customer details
## 3. Get customer list
## 4. Update customer
## 5. Delete customer

# Cards
## 1. Create card for customer
## 2. Get card details
## 3. Get card list
## 4. Disable card

# Payments
## 1. Get payment list
## 2. Create payment
## 3. Get payment details
## 4. Cancel payment by idempotency key
## 5. Update payment amount
## 6. Approve payment status to approve

# Refund Payment ( In payment route )
## 1. Refund payment
## 2. Get refund payment details 


# From squareup Site
## Manage customer profiles : https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#delete-customer-profile


# Problem with square-up
- No method or things for customer's payments


# Experimental conclusions:
- Disabled card can not do payment.
- Payment with status completed can not be canceled or updated. [ only status approved ]
- 