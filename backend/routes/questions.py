import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

questions = Blueprint('questions', __name__)


@questions.route('/<id_quiz>', methods=['GET'])
def get_question_by_quiz(id_quiz):
    success = True
    message = "Questions récupérées avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM questions WHERE questions.id_quiz = %s;''', (id_quiz,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des questions."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
