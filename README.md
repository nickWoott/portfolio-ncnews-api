# General Info

This is a RESTful api I built for a news web-application.
The code follows a model and controller paradigm to make requests to a PSQL database
Endpoints are written to post patch and delete database entries.

# Links

Link to hosted hosted version with all api endpoints: https://nc-news-app-nw.herokuapp.com/api
Link to deployed front-end app to interact with the api: https://subtle-malabi-2b6365.netlify.app

# Running Locally

If you wish to clone this project and run it locally, please ensure you have created the releavant environment variables.

In the root folder, create a file named .env.development. This file sould contain the text PGDATABASE=nc_news

Create a second file for the test envinronment called .env.test. This file should contain the text PGDATABASE=nc_news_test
