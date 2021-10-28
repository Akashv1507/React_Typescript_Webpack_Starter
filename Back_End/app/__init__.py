
from flask import Flask
from app.appConfig import loadAppConfig
from flask_sqlalchemy import SQLAlchemy


configDict = loadAppConfig()
db = SQLAlchemy()
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = configDict['flaskSecret']
    app.config['SQLALCHEMY_DATABASE_URI'] = configDict['SQLALCHEMY_DATABASE_URI']
    db.init_app(app)
    
    # from app.auth.models import User, Role,user_role
    from app.auth.routes import authBp
    app.register_blueprint(authBp,url_prefix="/auth/")

    return app 