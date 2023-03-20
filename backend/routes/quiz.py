import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

quiz = Blueprint('quiz', __name__)


@quiz.route('', methods=['GET'])
def get_quizzes():
    success = True
    message = "Quiz récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor()
        cursor.execute(''' SELECT * FROM quiz;''')

        rows = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des quiz."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }


@quiz.route('/<id_theme>', methods=['GET'])
def get_quizzes_by_theme(id_theme):
    success = True
    message = "Quiz récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor()
        cursor.execute(''' SELECT * FROM quiz WHERE quiz.id_theme = %s;''', (id_theme,))

        rows = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des quiz."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
