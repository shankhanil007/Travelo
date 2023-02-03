# Flask Server Template

The README is to document how flask server will be set up. And some API documentation around it.

## Environment Setup

- Create a ViretualEnv with, ```python3 -m venv env```.

- Activate virtual env, ```source env/bin/activate```.

- ```pip install -r requirements.txt```, for installing the dependencies.

- Download spacy language model, ```python -m spacy download en_core_web_sm```.

- To export development environment, ```export FLASK_ENV=development```.

- To start the flask server, ```flask run```.

## API Routes

Send a get request with routes ```/entities-recognition``` and have a data `city-name` as compulsory and `blog-link` optional.
