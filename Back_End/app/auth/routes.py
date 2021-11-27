from app import db
from app.auth.models import User,Role, user_role
from flask import Flask, Blueprint,request,jsonify,make_response
import uuid
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import datetime as dt
from app.appConfig import getAppConfigDict
from app.decorators.tokenRequired import token_required
authBp = Blueprint("authBp", __name__)

configDict = getAppConfigDict()

@authBp.route("/login", methods=['POST'])
def login():
    
    data = request.get_json()
    
    if not data or ("email" not in data) or ("password" not in data):
        return jsonify({'message':"could not verify"}), 401

    enteredEmail = data["email"]
    enteredPass =data["password"]
     
    user = User.query.filter_by(email=enteredEmail).first()
    userRoles = []

    if not user:
        return jsonify({'message':"could not verify"}), 401
    # appending all user roles to list
    for role in user.roles:
        userRoles.append(role.role_name)
    if check_password_hash(user.password, enteredPass):
        token = jwt.encode({'public_id' : user.public_id, "exp": dt.datetime.now(tz=dt.timezone.utc) + dt.timedelta(seconds=30)}, configDict['flaskSecret'], algorithm="HS256" )

        return jsonify({'token' : token, 'userName':(user.name).upper(), "public_id": user.public_id, "userRoles":userRoles })

    return jsonify({'message':"could not verify"}), 401
    
@authBp.route("/signup")
def signup():
    
    data = request.get_json(silent=True)
    if not data or ("email" not in data) or ("password" not in data) or ("name" not in data) or ("userRole" not in data):
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    enteredName = data["name"]
    enteredEmail = data["email"]
    enteredPass =data["password"]   
    enteredRole = data["userRole"]

    hashed_password = generate_password_hash(enteredPass, method='sha256')

    user = User(public_id =str(uuid.uuid4()), name = enteredName, email=enteredEmail, password= hashed_password)

    role = Role.query.filter_by(role_name= enteredRole).first()
    role.users.append(user)
    db.session.commit()
    return jsonify({'message' : 'New user created!'})

@authBp.route("/verify")
def verifyEmail():
    
    data = request.get_json(silent=True)
    if not data or ("email" not in data) :
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    enteredEmail = data["email"]
    user = User.query.filter_by(email=enteredEmail).first()
    
    if user:
        return jsonify({'message' : 'Email Already Exist', 'isUnique':False})
    else:
        return jsonify({'message' : 'Email is Unique' ,'isUnique':True})
    
@authBp.route("/checkAuthorization")
@token_required
def checkAuthorization(currUser):

    return jsonify({'message': 'Authorization successfull', 'currUser':currUser.name, 'email':currUser.email})