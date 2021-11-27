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
            return jsonify({'message' : 'Token is missing!'}), 401
        try: 
            data = jwt.decode(token, configDict['flaskSecret'], algorithms=["HS256"])
           
            current_user = User.query.filter_by(public_id=data['public_id']).first()
            
        except jwt.ExpiredSignatureError:
            print("Token expired. Get new one")
        except jwt.InvalidTokenError:
            print("Invalid Token")

        return f(current_user,*args, **kwargs)

    return decorated