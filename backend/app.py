# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import routes  # Import routes from routes.py

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db.init_app(app)
jwt = JWTManager(app)

# Register routes from routes.py
app.add_url_rule('/createaccount', 'register', routes.register, methods=['POST'])
app.add_url_rule('/deleteaccount', 'delete_account', routes.delete_account, methods=['DELETE'])
app.add_url_rule('/login', 'login', routes.login, methods=['POST'])
app.add_url_rule('/protected', 'protected', routes.protected, methods=['GET'])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # creates database and tables
    app.run(debug=True)
