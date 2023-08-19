# SwissBorg web challenge

Work sample that displays data fetched from mocked API in two tables:
- list of transactions 
- summary of transactions

## Installation

1. Run `yarn install` command to install dependencies
2. Rename `.env.example` file to `.env` and put URL to the mocked API (i.e. `http://localhost:8080/`) in the `REACT_APP_API_URL` variable.
3. Run `yarn start` command to start the development server.

## Assumptions and decisions

- Assumed that timestamps returned from the API will always contain valid date.
- Assumed that `currency`, `type` and `status` properties will always have only values present in the mocked list of transactions.
- Decided not to use more advanced data fetching libraries to utilize the API, as features like caching, automatic data update etc. are not required for this kind of page.
