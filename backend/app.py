from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

# current users
# sarah 123
# daniel 456
# jamey 789

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db.init_app(app)
jwt = JWTManager(app)

@app.route('/createaccount', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    # hashed password before storing it
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify(message="User registration successful"), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(message="Email not found"), 401
    if not check_password_hash(user.password, password):
        return jsonify(message="Incorrect password"), 401
    
    # generate access token for user
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    email = get_jwt_identity()
    return jsonify(message=f"{email}"), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # creates database and tables
    app.run(debug=True)