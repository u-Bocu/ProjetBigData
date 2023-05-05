import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

users = Blueprint('users', __name__)


@users.route('/<id_user>', methods=['GET'])
def get_user_by_id(id_user):
    success = True
    message = "Questions récupérées avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor()
        cursor.execute(''' SELECT * FROM users WHERE id = %s;''', (id_user,))

        rows = cursor.fetchone()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération de l'utilisateur."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
