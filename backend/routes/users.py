import mysql.connector
import datetime
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

@users.route('/avg_score/<id_user>', methods=['GET'])
def getAvgScore(id_user):
    success = True
    message = "Score moyen récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT AVG(r.score) AS score_moyen
                            FROM big_data_project.resultats r
                            WHERE r.id_user = %s
                            ;''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération du score moyen."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }

@users.route('/quiz_created/<id_user>', methods=['GET'])
def getQuizCreated(id_user):
    success = True
    message = "Nombre de quiz créés récupéré avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT COUNT(q.id) AS nb_quiz_cree
                            FROM big_data_project.quiz q
                            WHERE q.id_user = 1 AND q.id_statut = %s
                            ;''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération du nombre de quiz créés."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }

@users.route('/history_result/<id_user>', methods=['GET'])
def getHistoryResult(id_user):
    success = True
    message = "Résultats récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT t.label as Theme, q.label as Quiz, r.score as Score, r.timestamp as Date, s.label as Note
                            FROM big_data_project.resultats r
                                JOIN big_data_project.quiz q ON r.id_quiz = q.id
                                JOIN big_data_project.themes t ON t.id = q.id_theme
                                JOIN big_data_project.satisfaction s ON r.id_satisfaction = s.id
                            WHERE r.id_user = %s
                            ORDER BY r.timestamp DESC
                            ;''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des résultats."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }

@users.route('/history_quiz_created/<id_user>', methods=['GET'])
def getHistoryQuizCreated(id_user):
    success = True
    message = "Quiz créés récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT t.label as Theme, q.label as Quiz, sq.label as Etat, q.date_creation as Date_creation
                            FROM big_data_project.quiz q
                                JOIN big_data_project.themes t on t.id = q.id_theme
                            JOIN big_data_project.statut_quiz sq on sq.id = q.id_statut
                            WHERE q.id_user =  %s
                            ORDER BY q.date_creation DESC
                            ;''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        #for row in rows:
            # Récupérer la date de la base de données
            #date_creation = row['date_creation']
            # Convertir la date en objet datetime si elle n'est pas déjà au bon format
            #if isinstance(date_creation, str):
            #    date_creation = datetime.datetime.strptime(date_creation, '%Y-%m-%%d')
            # Formater la date dans le format "JJ-MM-AAAA"
            #formatted_date = date_creation.strftime('%%d-%m-%Y')
            # Mettre à jour la valeur de la clé 'date_creation' avec la date formatée
            #row['date_creation'] = formatted_date

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération des quiz créés."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
