import mysql.connector
from flask import Blueprint, request
from config import DB_CONFIG
from functions.audio import predict_audio

reponses = Blueprint('reponses', __name__)


@reponses.route('/<id_question>', methods=['GET'])
def get_reponses_by_question(id_question):
    success = True
    message = "Réponses récupérées avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM reponses WHERE reponses.id_question = %s;''', (id_question,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des réponses."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }


@reponses.route('/<id_question>', methods=['POST'])
def send_reponse_vocal_by_question(id_question):
    success = True
    message = "Choix analysé avec succès"
    count = 1
    rows = []

    try:
        base64_file = request.get_json().get('base64File')

        # Analyse avec le modèle pour déterminer le chiffre cité (1, 2, 3 ou 4)
        prediction = predict_audio(base64_file)

        rows = {"choix": prediction}

    except:
        success = False
        message = "Erreur lors de l'analyse de la réponse choisie."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }


@reponses.route('/<id_reponse>/isvalid', methods=['POST'])
def is_reponse_valid(id_reponse):
    success = True
    message = "Réponse vérifiée avec succès"
    count = 1
    rows = []

    try:
        id_question = request.get_json().get('id_question')

        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM reponses WHERE reponses.id = %s;''', (id_reponse,))

        rows = cursor.fetchone()
        print(rows)

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la vérification de la réponse."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
