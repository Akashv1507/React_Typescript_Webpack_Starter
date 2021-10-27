from flask import Blueprint

authBp = Blueprint('authBp', __name__)

@authBp.route('/login')
def login():
    return 'login page'

@authBp.route('/signup')
def signup():
    return 'signup page'