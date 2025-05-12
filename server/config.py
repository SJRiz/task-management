from dotenv import load_dotenv
load_dotenv()

import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Create the app and enable cross referencing for API calls
app = Flask(__name__)
CORS(app)

# Configurations to set up the database (using sqlite)
app.config["JWT_SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///taskdatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
jwt = JWTManager(app)

db = SQLAlchemy(app)