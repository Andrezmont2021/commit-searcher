# Commit-Searcher-Back

App to search commits for this specific repository backend-end side

## Installation
If we want to install and run the back-end side, first we need to install the dependencies using `npm install` command (node js its important to have installed in our system).

Optional: Its recommended to use a .env file to keep some sensible properties here, so i recommend to rename the `example.env` file to `.env` in the project and modify this file writting the port that we want to use to run the back-end side (i recommend put the `3000 PORT` because its configured in the front-end side, we need check that this port its available on our system).

The next step is to execute the following command to run the back-end side: `npm run start`. 

Its important to run back-end and front-end side at the same time.

Note: the backend side project will run on the following route: `http://localhost:3000/`, `http://localhost:3000/v1/commits?owner=[OWNER]&repositoryName=[REPOSITORY_NAME]` for the complete route to get the commits (changing the values of OWNER and REPOSITORY_NAME) and `http://localhost:3000/api-documentation` to see the API documentation for the back-end side.

Note: If we want to run the unit tests, we need to execute the following command: `npm run test`

That's it in the back-end side

## Author

Andrés Montilla Orozco -- Systems Engineer -- Full Stack Developer

LinkedIn: https://co.linkedin.com/in/andres-felipe-montilla-orozco

