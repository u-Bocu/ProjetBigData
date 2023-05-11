import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

roles = Blueprint('roles', __name__)


@roles.route('/<id_role>', methods=['GET'])
def get_role_by_id(id_role):
    success = True
    message = "Role récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM roles WHERE id = %s;''', (id_role,))

        rows = cursor.fetchone()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération du rôle."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }


@roles.route('', methods=['GET'])
def get_roles():
    success = True
    message = "Roles récupérées avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM roles;''')

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des rôles."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
