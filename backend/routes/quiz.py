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
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM quiz;''')

        rows = cursor.fetchall()
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
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM quiz WHERE quiz.id_theme = %s;''', (id_theme,))

        rows = cursor.fetchall()
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

@quiz.route('/best_quiz/<id_user>', methods=['GET'])
def getBestQuiz(id_user):
    success = True
    message = "Meilleur score aux quiz récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT MAX(resultats.score) AS score, q.label AS label
                            FROM resultats
                                INNER JOIN quiz q ON resultats.id_quiz = q.id
                            WHERE resultats.id_user = %s
                            GROUP BY label
                            ORDER BY score DESC
                            LIMIT 1;   ''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération du meilleur score des quiz."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }

@quiz.route('/worse_quiz/<id_user>', methods=['GET'])
def getWorseQuiz(id_user):
    success = True
    message = "Pire score aux quiz récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT MIN(resultats.score) AS score, q.label AS label
                            FROM resultats
                                INNER JOIN quiz q ON resultats.id_quiz = q.id
                            WHERE resultats.id_user = %s
                            GROUP BY label
                            ORDER BY score ASC
                            LIMIT 1;   ''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération du pire score des quiz."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
