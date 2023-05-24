import mysql.connector
from flask import Blueprint, request
from config import DB_CONFIG

resultats = Blueprint('resultats', __name__)


@resultats.route('', methods=['POST'])
def post_resultat():
    success = True
    message = "Résultat enregistré avec succès"

    try:
        request_body = request.get_json()
        id_quiz = request_body.get('id_quiz')
        id_user = request_body.get('id_user')
        score = request_body.get('score')
        satisfaction = request_body.get('satisfaction')

        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' INSERT INTO resultats (id_quiz, id_user, score, timestamp, id_satisfaction)
                           VALUES (%s, %s, %s, NOW(), %s);''', (id_quiz, id_user, score, satisfaction))

        mysqldb.commit()
        cursor.close()

    except:
        success = False
        message = "Erreur lors de l'enregistrement du résultat."

    return {
        "success": success,
        "message": message,
        "data": None
    }

@resultats.route('/resultats', methods=['GET'])
def getParticipants():
    success = True
    message = "Nombre de participants récupérées avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT t.label as Theme, COUNT(r.id) as Participant
                            FROM big_data_project.resultats r
                                JOIN big_data_project.quiz q ON q.id = r.id_quiz
                                JOIN big_data_project.themes t ON q.id_theme = t.id
                            GROUP BY t.label; ''')

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des participants."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
