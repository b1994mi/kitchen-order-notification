# Kitchen Order Notification
An example NestJS app monorepo using Rabbit MQ

## How to Run
1. Install `docker` and `docker-compose`
2. Run `docker network create resolute` to create a docker network
3. Run `docker-compose up`

Note: you probably need to use sudo for all the command above, assuming that you did not setup a new user group (like I do).

TODO: create a diagram of how the messages are emitted and consumed

## Endpoints Documentation

### 👉 Get a list of all foods

```json
// GET localhost:3000/food

// content-type: application/json
// response: 200 OK
[
  {
    "id": 1,
    "name": "Ketoprak",
    "price": "15000"
  },
  // other foods...
  {
    "id": 6,
    "name": "Pecel Ayam",
    "price": "25000"
  }
]
```

### 👉 Get detail of an order

```json
// GET localhost:3000/order/:id

// content-type: application/json
// response: 200 OK
{
  "id": 1,
  "custEmail": "aaa@aaa.com",
  "name": "aaa aaa",
  "status": "Processed"
}
```

### 👉 Create an order

```json
// POST localhost:3000/order

// content-type: application/json
// request body:
{
  "name": "bbb",
  "custEmail": "bbb@bbb.com",
  "foods": [
    1, 2, 3
  ]
}

// content-type: application/json
// response body: 200 OK
{
  "name": "bbb",
  "custEmail": "bbb@bbb.com",
  "foods": [
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    }
  ],
  "id": 2,
  "status": "Pending"
}
```