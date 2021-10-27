from app import db

user_role = db.Table('user_role',
 db.Column('user_id', db.Integer, db.ForeignKey('user.public_id')),
 db.Column('role_id', db.Integer, db.ForeignKey('role.id')))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(80))
    roles = db.relationship('Role', secondary=user_role,
                             backref = db.backref('users', lazy='dynamic'))
# lazy will return query , over which we can iterate, otherwise it will return all data

class Role(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   role_name = db.Column(db.String(50))
