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
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute(''' SELECT * FROM themes;''')

        rows = cursor.fetchall()
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

@themes.route('/best_theme/<id_user>', methods=['GET'])
def getBestTheme(id_user):
    success = True
    message = "Thèmes récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT t.label AS theme, AVG(r.score) AS score_moyen
                            FROM big_data_project.resultats r
                                JOIN big_data_project.quiz q ON r.id_quiz = q.id
                                JOIN big_data_project.themes t ON q.id_theme = t.id
                            WHERE r.id_user = %s
                            GROUP BY t.label
                            ORDER BY score_moyen DESC
                            LIMIT 1;''', (id_user,))

        rows = cursor.fetchall()
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

@themes.route('/worse_theme/<id_user>', methods=['GET'])
def getWorseTheme(id_user):
    success = True
    message = "Thèmes récupérés avec succès"
    count = 0
    rows = []

    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor(dictionary=True)
        cursor.execute('''  SELECT t.label AS theme, AVG(r.score) AS score_moyen
                            FROM big_data_project.resultats r
                                JOIN big_data_project.quiz q ON r.id_quiz = q.id
                                JOIN big_data_project.themes t ON q.id_theme = t.id
                            WHERE r.id_user = %s
                            GROUP BY t.label
                            ORDER BY score_moyen ASC
                            LIMIT 1;
                            ''', (id_user,))

        rows = cursor.fetchall()
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

