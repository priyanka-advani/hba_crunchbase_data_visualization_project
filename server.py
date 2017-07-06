from flask import Flask, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from jinja2 import StrictUndefined
from model import Location, Company, db, connect_to_db

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


@app.route('/bubblechart')
def show_bubblechart():

    return render_template('bubblechart.html')


@app.route('/bubblechart.json')
def bubblechart_data():

    with open('data/buzzwords.txt') as f:
        
        buzzwords = []

        for line in f:
            line = line.rstrip()
            buzzwords.append(line)

        company_descriptions = db.session.query(Company.short_description).all()

        buzzword_count = {}

        for description, in company_descriptions:
            for buzzword in buzzwords:
                buzzword_count[buzzword] = buzzword_count.get(buzzword, 0)
                if buzzword in description:
                    buzzword_count[buzzword] += 1

        return jsonify(buzzword_count)




        # bubblechart_data = {
        #     loc.location_id: {
        #         'citystate': loc.city + ', ' + loc.state,
        #         'companies': loc.companies_qty,
        #         'radius': loc.companies_qty/100
        #     }
        #     for loc in Location.query.all()
        # }

        # return jsonify(bubblechart_data)

if __name__ == '__main__':

    connect_to_db(app)
    app.debug = True
    DebugToolbarExtension(app)

    app.run(host='0.0.0.0')
