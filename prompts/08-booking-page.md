On the page of product like `product/[slug]`, there should be a button "Rent This" to get to a new page of new booking.

If the user is not authenticated, that button should lead to Login page.

The new booking page should use the same layout as homepage/products page with same NavBar and should have a form with these fields to submit to the API:

- Submit to `POST /api/bookings` with:
  - `start_date`
  - `end_date`
  - `product_slugs` (array of one slug in this case, to simplify)
  - `customer_name`
  - `customer_email`
  - `customer_phone`
  - `delivery_address`

```
curl --request POST \
  --url /api/bookings \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "start_date": "2019-08-24T14:15:22Z",
  "end_date": "2019-08-24T14:15:22Z",
  "customer_name": "string",
  "customer_email": "user@example.com",
  "customer_phone": "string",
  "delivery_address": "string",
  "notes": "string",
  "product_slugs": [
    "string"
  ]
}'
```

After successful submission, the user should be redirected to the page "My bookings" with the list/table of their bookings.

For that, API endpoint is this:

```
curl --request GET \
  --url http://babygear.test/api/bookings \
  --header 'Accept: application/json'
```

Sample response:

```
{
  "data": [
    {
      "reference": "string",
      "status": "string",
      "start_date": "string",
      "end_date": "string",
      "total_price": 0,
      "customer_name": "string",
      "customer_email": "string",
      "customer_phone": "string",
      "delivery_address": "string",
      "notes": "string",
      "created_at": "string",
      "items": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": "string",
        "label": "string",
        "active": true
      }
    ],
    "path": "string",
    "per_page": 0,
    "to": 1,
    "total": 0
  }
```