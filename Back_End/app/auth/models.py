from enum import unique
from app import db

user_role = db.Table('user_role',
 db.Column('user_id', db.Integer, db.ForeignKey('user.public_id')),
 db.Column('role_id', db.Integer, db.ForeignKey('role.id')))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))
    roles = db.relationship('Role', secondary=user_role,
                             backref = db.backref('users', lazy='dynamic'))
# lazy will return query , over which we can iterate, otherwise it will return all data

class Role(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   role_name = db.Column(db.String(50))


#  from app.auth.models import User, Role, user_role
#  import uuid
#  from werkzeug.security import generate_password_hash, check_password_hash
# from app import create_app,db

# pushing app to app_context neccessary
# app = create_app()
# app.app_context().push()
#  hashed_password = generate_password_hash("wrldc@123", method='sha256')

#  user1 = User(public_id =str(uuid.uuid4()), name = "akash verma", email="akashverma@posoco.in", password= hashed_password)
#  user2 = User(public_id =str(uuid.uuid4()), name = "shekhar gupta", email="shekhar.gupta@posoco.in", password= hashed_password)
#  role_admin = Role(role_name = "admin")
#  role_sadmin = Role(role_name = "superadmin")
#  role_guest = Role(role_name = "guest")

# adding role and user
# db.session.add(role_admin)
# db.session.add(role_sadmin)
# db.session.add(role_guest)
# db.session.add(user1)
# db.session.add(user2)
#  db.session.commit()

# adding association table user_role
# role_sadmin.users.append(user1)
# role_guest.users.append(user2)
# db.session.commit()