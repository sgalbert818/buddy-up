# routes.py
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User

# Route for user registration

def register():
    data = request.get_json()
    email = data['email'].lower()
    password = data['password']
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        # If user exists, return an error message
        return jsonify(message="An account with that email address already exists. Please sign in or use a different email address."), 400
    # hashed password before storing it
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify(message="User registration successful"), 201

# Route to delete a user account

def delete_account():
    data = request.get_json()
    email = data['email'].lower()
    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify(message="User deleted successfully"), 200
    else:
        return jsonify(message="User not found"), 404

# Route for user login

def login():
    data = request.get_json()
    email = data['email'].lower()
    password = data['password']
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(message="Email not found"), 401
    if not check_password_hash(user.password, password):
        return jsonify(message="Incorrect password"), 401
    # generate access token for user
    access_token = create_access_token(identity=email)
    name = user.name
    age = user.age
    interests = user.interests
    return jsonify(access_token=access_token, email=email,name=name, age=age, interests=interests), 200

# Protected route for user profile edit

@jwt_required()
def create_profile():
    email = get_jwt_identity()
    data = request.get_json()
    name = data.get('name', None)
    age = data.get('age', None)
    interests = data.get('interests', [])
    # Find the user by ID
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(message="User not found."), 404
    # Update the user details
    if name:
        user.name = name
    if age is not None:  # Make sure age can be updated to None if needed
        user.age = age
    if interests:
        user.interests = interests
    # Commit the changes
    db.session.commit()
    print('success')
    return jsonify(message="User profile updated successfully."), 200

# Protected test route to check user edits

@jwt_required()
def test():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:  # Check if a user with the provided email exists
        # Access the name, age, and interests properties from the user object
        name = user.name
        age = user.age
        interests = user.interests
    return jsonify(message='success', name=name, age=age, interests=interests), 200