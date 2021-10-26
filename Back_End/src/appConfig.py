'''
return apllication config dictionary 
'''
import json

# initialize the app config global variable
appConf = {}

def loadAppConfig(fName="secret/config.json"):
    # load config json into the global variable
    with open(fName) as f:
        global appConf
        appConf = json.load(f)
        return appConf

def getAppConfigDict():
    # get the cached application config object
    global appConf
    return appConf