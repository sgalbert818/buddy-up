# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import routes  # Import routes from routes.py

# sarah 1
# sam 2

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db.init_app(app)
jwt = JWTManager(app)

# Register routes from routes.py
app.add_url_rule('/createaccount', 'register', routes.register, methods=['POST'])
app.add_url_rule('/deleteaccount', 'delete_account', routes.delete_account, methods=['DELETE'])
app.add_url_rule('/login', 'login', routes.login, methods=['POST'])
app.add_url_rule('/createprofile', 'create_profile', routes.create_profile, methods=['POST'])
app.add_url_rule('/test', 'test', routes.test, methods=['POST'])

if __name__ == '__main__':
    with app.app_context():
        # db.drop_all() # only run when changing model
        db.create_all()
    app.run(debug=True)
