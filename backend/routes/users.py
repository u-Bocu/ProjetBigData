import mysql.connector
from flask import Blueprint
from config import DB_CONFIG

users = Blueprint('users', __name__)


@users.route('/<id_user>', methods=['GET'])
def get_user_by_id(id_user):
    success = True
    message = "Utilisateur récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM users
                        JOIN roles ON users.id_role = roles.id
                        JOIN themes ON users.id_theme_pref = themes.id
                        WHERE users.id = %s;''', (id_user,))

        rows = cursor.fetchone()
        count = cursor.rowcount

        cursor.close()

        # Format de l'objet role
        rows['role'] = { 'id': rows['id_role'], 'label': rows['label']}

        # Format de l'objet theme
        rows['theme_pref'] = {'id': rows['id_theme_pref'], 'label': rows['label'], 'lien_image': rows['lien_image']}

        # Suppression des champs inutiles
        del rows['id_role']
        del rows['id_theme_pref']
        del rows['label']
        del rows['lien_image']

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
