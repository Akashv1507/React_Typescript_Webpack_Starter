from app.appConfig import getAppConfigDict
from waitress import serve
from app import create_app,db

configDict = getAppConfigDict()
app = create_app()

# execute createdb function to create tables
def createdb():
    db.create_all()

if __name__ == "__main__":
    serverMode: str = configDict['mode']
    if serverMode.lower() == 'd':
        app.run(host="localhost", port=int(configDict['flaskPort']), debug=True)
    else:
        serve(app, host='0.0.0.0', port=int(
            configDict['flaskPort']), threads=1)