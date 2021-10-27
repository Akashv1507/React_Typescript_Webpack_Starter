from app import db
from app.auth.models import User
from flask import Flask, Blueprint

authBp = Blueprint("authBp", __name__)
@authBp.route("/")
def insert():
    return "home page"