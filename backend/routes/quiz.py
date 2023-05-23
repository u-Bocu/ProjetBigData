import mysql.connector
from flask import Blueprint, request
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


@quiz.route('', methods=['POST'])
def post_quiz():
    success = True
    message = "Quiz enregistré avec succès"

    try:
        request_body = request.get_json()
        quiz_obj = request_body.get('quiz')
        questions = request_body.get('questions')
        id_user = request_body.get('id_user')

        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)

        # Création du quiz
        cursor.execute(''' INSERT INTO quiz (label, id_statut, date_creation, id_theme, id_user, lien_image)
                        VALUES (%s, 1, NOW(), 7, %s, %s);''', (quiz_obj['label'], id_user, quiz_obj['lien_image']))
        id_quiz = cursor.lastrowid

        # Création de chaque question avec ses 4 réponses
        for question in questions:
            cursor.execute(''' INSERT INTO questions (id_quiz, question, lien_image, date_creation)
                       VALUES (%s, %s, %s, NOW());''', (id_quiz, question['question'], question['lien_image']))
            id_question = cursor.lastrowid
            for reponse in question['reponses']:
                cursor.execute(''' INSERT INTO reponses (label, is_valid, id_question)
                         VALUES (%s, %s, %s);''', (reponse['label'], reponse['is_valid'], id_question))

        mysqldb.commit()
        cursor.close()

    except Exception as e:
        print(e)
        success = False
        message = "Erreur lors de l'enregistrement du quiz."

    return {
        "success": success,
        "message": message,
        "data": None
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
