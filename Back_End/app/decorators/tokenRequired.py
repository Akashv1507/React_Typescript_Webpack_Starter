from app.auth.models import User
import jwt
from functools import wraps
from flask import request,jsonify
from app.appConfig import getAppConfigDict

configDict = getAppConfigDict()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        
        if not token:
            print("token is missing")
            return f(current_user=None, message= "Token is Missing",*args, **kwargs)
        try: 
            # expiration time will be taken care by jwt automatically
            data = jwt.decode(token, configDict['flaskSecret'], algorithms=["HS256"])
           
            current_user = User.query.filter_by(public_id=data['public_id']).first()
            
        except jwt.ExpiredSignatureError:
            print("Token expired. Get new one")
            return f(current_user=None,message= "Token expired. Get new one",*args, **kwargs)
        except jwt.InvalidTokenError:
            print("Invalid Token")
            return f(current_user=None,message= "Invalid Token",*args, **kwargs)

        return f(current_user, message= "Token is valid",*args, **kwargs)

    return decorated