import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

<<<<<<< HEAD
=======
#################################################
# Database Setup
#################################################

#from flask_sqlalchemy import SQLAlchemy
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("://", "ql://", 1) or "postgres://nqqvhqxvzddybx:1483ec840aba43aa829f5571188b1bae3734ef4942df51bd5b647a4001f4ccb0@ec2-54-211-176-156.compute-1.amazonaws.com:5432/d8abuqdu9l72qn"
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
#os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

#engine = create_engine('postgres+psycopg2://postgres:password@localhost:5432/project2_db')

# Remove tracking modifications
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#db = SQLAlchemy(app)

#Website_Analytics = create_classes(db)

>>>>>>> main
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

