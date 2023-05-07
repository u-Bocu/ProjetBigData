import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

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
