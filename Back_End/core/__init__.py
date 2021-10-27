
from flask import Flask
# using absolute import
from core.appConfig import loadAppConfig
# using relative import
from .extensions.sqlAlchemy import db
from .blueprints.authBp import authBp

app = Flask(__name__)

configDict = loadAppConfig()
app.config['SECRET_KEY'] = configDict['flaskSecret']
app.config['SQLALCHEMY_DATABASE_URI'] = configDict['SQLALCHEMY_DATABASE_URI']

db.init_app(app)
app.register_blueprint(authBp)

@app.route('/')
def index():
    return "<h1>Welcome</h1>"