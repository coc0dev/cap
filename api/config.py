import os
from dotenv import load_dotenv

basedir = os.path.dirname(__name__)
load_dotenv(os.path.join(basedir, ".env"))

class Config:
    SECRET_KEY=os.getenv('SECRET_KEY')
    FLASK_APP=os.getenv('FLASK_APP')
    FLASK_ENV=os.getenv('FLASK_ENV')
    STRIPE_PUBLISHABLE_KEY=os.getenv('STRIPE_PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY=os.getenv('STRIPE_SECRET_KEY')