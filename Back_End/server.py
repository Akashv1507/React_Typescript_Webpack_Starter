# 
# from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
# from waitress import serve

# app = Flask(__name__)

# # get application config
# configDict = loadAppConfig()

# if __name__ == '__main__':
#     serverMode: str = configDict['mode']
#     if serverMode.lower() == 'd':
#         app.run(host="localhost", port=int(configDict['flaskPort']), debug=True)
#     else:
#         serve(app, host='0.0.0.0', port=int(
#             configDict['flaskPort']), threads=1)
from core import app
from core.appConfig import getAppConfigDict
from waitress import serve

configDict = getAppConfigDict()

if __name__ == "__main__":
    serverMode: str = configDict['mode']
    if serverMode.lower() == 'd':
        app.run(host="localhost", port=int(configDict['flaskPort']), debug=True)
    else:
        serve(app, host='0.0.0.0', port=int(
            configDict['flaskPort']), threads=1)