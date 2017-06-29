from flask import Flask, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
from model import Location, connect_to_db

app = Flask(__name__)
app.jinja_env.undefined = StrictUndefined
app.jinja_env.auto_reload = True

app.secret_key = '\xdd~\x08Ry\x16~|\n\xba\xa5\x86\x9e\xe3AX\xaf@?\xa8\xd9zA\xe9'

@app.route('/heatmap')
def show_heatmap():

    return render_template('heatmap.html')


@app.route('/heatmap.json')
def heatmap_data():

    heatmap_data = {
        loc.location_id: {
            'lat': loc.lat,
            'lng': loc.lng,
            'weight': loc.companies_qty
        }
        for loc in Location.query.all()
    }

    return jsonify(heatmap_data)

if __name__ == '__main__':

    connect_to_db(app)
    app.debug = True
    DebugToolbarExtension(app)

    app.run(host='0.0.0.0')
