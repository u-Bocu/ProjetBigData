import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

themes = Blueprint('themes', __name__)


@themes.route('', methods=['GET'])
def get_themes():
    success = True
    message = "Thèmes récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor()
        cursor.execute(''' SELECT * FROM themes;''')

        rows = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des thèmes."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
