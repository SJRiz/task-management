from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Create the app and enable cross referencing for API calls
app = Flask(__name__)
CORS(app)

# Configurations to set up the database (using sqlite)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///taskdatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)