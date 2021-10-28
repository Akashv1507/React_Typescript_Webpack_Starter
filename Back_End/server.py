from app.appConfig import getAppConfigDict
from waitress import serve
from app import create_app,db

configDict = getAppConfigDict()
app = create_app()
app.app_context().push()
# execute this 2 lines on terminal to create db
# from app import db, create_app
# db.create_all(app=create_app())

if __name__ == "__main__":
    serverMode: str = configDict['mode']
    if serverMode.lower() == 'd':
        app.run(host="localhost", port=int(configDict['flaskPort']), debug=True)
    else:
        serve(app, host='0.0.0.0', port=int(
            configDict['flaskPort']), threads=1)