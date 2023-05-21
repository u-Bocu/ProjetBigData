from flask import Flask
from flask_cors import CORS

from routes.reponses import reponses
from routes.roles import roles
from routes.themes import themes
from routes.quiz import quiz
from routes.questions import questions
from routes.auth import auth
from routes.users import users
from routes.resultats import resultats

app = Flask(__name__)
CORS(app)

# Routing
app.register_blueprint(themes, url_prefix='/api/themes')
app.register_blueprint(quiz, url_prefix='/api/quiz')
app.register_blueprint(questions, url_prefix='/api/questions')
app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(roles, url_prefix='/api/roles')
app.register_blueprint(reponses, url_prefix='/api/reponses')
app.register_blueprint(resultats, url_prefix='/api/resultats')

if __name__ == "__main__":
    app.run()
