import os

class Config:
    SECRET_KEY = os.urandom()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'