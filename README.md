# Kitchen Order Notification
An example NestJS app monorepo using Rabbit MQ

## How to Run
1. Install `docker` and `docker-compose`
2. Run `docker network create resolute` to create a docker network
3. Copy file `.env-example` to a new file `.env`
4. Run `docker-compose up`

Note: you probably need to use sudo for all the command above, assuming that you did not setup a new user group (like I do).

TODO: create a diagram of how the messages are emitted and consumed