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

@users.route('/graph_avg_score_by_theme/<id_user>', methods=['GET'])
def getGraphAvgScoreByTheme(id_user):
    success = True
    message = "Moyenne des quiz par thème avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT t.label as Theme, avg(r.score) as Score_moyen
                            FROM big_data_project.resultats r
                                JOIN big_data_project.quiz q on q.id = r.id_quiz
                                JOIN big_data_project.themes t on q.id_theme = t.id
                            WHERE r.id_user = %s
                            GROUP BY t.label; 
                        ''', (id_user,))

        rows = cursor.fetchall()
        count = cursor.rowcount

        cursor.close()

    except:
        success = False
        message = "Erreur lors de la récupération moyenne des quiz par thème."

    return {
        "success": success,
        "message": message,
        "data": {
            'count': count,
            'rows': rows
        }
    }
