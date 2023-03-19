from flask import Flask
from flask_cors import CORS

from routes.themes import themes


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Routing
    app.register_blueprint(themes, url_prefix='/api/themes')

    if __name__ == "__main__":
        app.run(host="127.0.0.1", port=8080, debug=True)


create_app()
