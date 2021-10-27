from extensions.sqlAlchemy import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(80))
    
class Role(db.model):
   id = db.Column(db.Integer, primary_key=True)
   role_name = db.Column(db.String(50))
