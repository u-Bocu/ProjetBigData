import mysql.connector
from flask import Blueprint, request
from config import DB_CONFIG

auth = Blueprint('auth', __name__)


# On a POST request, ajoute un utilisateur à la bdd.
@auth.route("/sign-up", methods=['POST'])
def signup():
    userdata = request.get_json()

    err = add_user_to_db(userdata.get('username'), userdata.get('password'), userdata.get('mail'),
                         userdata.get('age'), userdata.get('sexe'))
    message = "Le nom d'utilisateur n'est plus disponible."

    if err:  # True mean no error
        message = "Inscription effectuée avec succès."

    res = {
        "success": err,
        "message": message,
        "data": None
    }

    return res


@auth.route("/login", methods=['POST'])
def login():
    userdata = request.get_json()

    err = check_user_password_in_db(userdata.get('username'), userdata.get('password'))
    message = "Vérifiez votre identifiant ou votre mot de passe."

    if err:
        message = "Connexion réussie avec succès."

    res = {
        "success": err,
        "message": message,
        "data": get_user_with_username(userdata.get('username'))
    }

    return res


# Tries to add a user to DB and returns 0 if succeeded, 1 otherwise.
def add_user_to_db(username, password, mail, age, sexe):
    err = False
    if not does_user_exist(username):
        try:
            mysqldb = mysql.connector.connect(**DB_CONFIG)
            cursor = mysqldb.cursor()

            cursor.execute(f''' INSERT INTO users (login, password, mail, age, sexe, id_role) 
                        VALUES ('{username}', '{password}', '{mail}', '{age}', '{sexe}', 1);''')
            mysqldb.commit()

            err = True
            cursor.close()

        except Exception as e:
            print(e)

    return err


def does_user_exist(username):
    err = True
    try:
        mysqldb = mysql.connector.connect(**DB_CONFIG)
        cursor = mysqldb.cursor()
        cursor.execute(f''' SELECT login FROM users WHERE login = '{username}' ''')

        if cursor.fetchone() is None:
            err = False
        cursor.close()

    except Exception as e:
        print(e)

    return err


def check_user_password_in_db(username, password):
    err = False
    if does_user_exist(username):
        try:
            mysqldb = mysql.connector.connect(**DB_CONFIG)
            cursor = mysqldb.cursor()
            cursor.execute(f''' SELECT password FROM users WHERE login='{username}'  ''')

            if password == cursor.fetchone()[0]:
                err = True

            cursor.close()

        except Exception as e:
            print(e)

    return err


def get_user_with_username(username):
    user = None
    if does_user_exist(username):
        try:
            mysqldb = mysql.connector.connect(**DB_CONFIG)
            cursor = mysqldb.cursor()
            cursor.execute(f''' SELECT id, login FROM users WHERE login='{username}'  ''')

            user = cursor.fetchone()
            cursor.close()

        except Exception as e:
            print(e)

    return user
