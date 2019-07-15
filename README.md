# Mailer

This is a toy NodeJS web service that provides an HTTP API for sending emails. It offers both a graphical web
interace and a JSON API.

## Development

To run the application locally:
* Ensure NodeJS is installed on your machine.
* Clone this repo and `cd` into the project directory.
* Run `npm install` to install dependencies.
* Create a `.env` file at the project root and ensure it contains the environment variables
  as demonstrated in `.env.example`.
* `npm start` will serve the application at [localhost:3000](http://localhost:3000).
* `npm run test` will run the tests.
* The web GUI is at [localhost:3000/](http://localhost:3000), and should be self-explanatory.
* The JSON API is explained below.

## JSON API

To send an email using the JSON API, make a JSON POST request to
[/api/v1/emails/send](localhost:3000/api/v1/emails/send). The JSON request body
must contain the keys `"from"`, `"to"`, `"subject"` and `"message"` fields, all of which must
be non-empty strings. In addition, `"to"` must be a valid email address (this is validated very liberally), and
`"from"` must be a comma-separated list of such addresses.

`"cc"` and `"bcc"` fields are also supported, and are optional. If provided, they must
also be a comma-separated list of valid email addresses.

For example, if you were running the application in your local development environment, a valid
request to be made to the service using `curl`, as follows:

```
curl --header "Content-Type: application/json" --request POST --data '{ "from": "example@example.net", "to": "someone@example.com, someoneelse@example.com", "subject": "Testing mailer", "message": "Hi, I am testing this mailer" }' localhost:3000/api/v1/emails/send
```

Note the service supports plain text emails only.

## TODO

* Write more tests
* Use a proper logger
* Dockerize it
