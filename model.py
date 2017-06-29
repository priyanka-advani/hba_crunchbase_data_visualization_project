"""Model for Crunchbase DB."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Company(db.Model):
    """Company."""

    __tablename__ = 'companies'

    company_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    crunchbase_url = db.Column(db.String(256), default=None)
    homepage_url = db.Column(db.String(256), default=None)
    profile_image_url = db.Column(db.String(256), default=None)
    stock_symbol = db.Column(db.String(50), default=None)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(256), default=None)

    def __repr__(self):
        return '<Company id={} name={}>'.format(self.company_id, self.name)


# class Investor(db.Model):
#     """Investor."""

#     __tablename__ = 'investors'

#     investor_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     crunchbase_uuid = db.Column(db.String(50), unique=True, nullable=False)
#     cb_type = db.Column(db.String(20), default=None)
#     primary_role = db.Column(db.String(20), default=None)
#     name = db.Column(db.String(128), unique=True, nullable=False)
#     crunchbase_url = db.Column(db.String(256), default=None)
#     homepage_url = db.Column(db.String(256), default=None)
#     profile_image_url = db.Column(db.String(256), default=None)
#     stock_symbol = db.Column(db.String(50), default=None)
#     location_city = db.Column(db.String(50), default=None)
#     location_region = db.Column(db.String(50), default=None)
#     short_description = db.Column(db.String(256), default=None)

#     def __repr__(self):
#         return '<Investor id={} name={}'.format(self.investor_id,
#                                                     self.name)


# class Person(db.Model):
#     """Person."""

#     __tablename__ = 'people'

#     person_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     crunchbase_uuid = db.Column(db.String(50), unique=True, nullable=False)
#     cb_type = db.Column(db.String(20), default=None)
#     name = db.Column(db.String(128), default=None, unique=True)
#     crunchbase_url = db.Column(db.String(128), default=None)
#     profile_image_url = db.Column(db.String(128), default=None)
#     location_city = db.Column(db.String(50), default=None)
#     location_region = db.Column(db.String(50), default=None)
#     location_country_code = db.Column(db.String(20), default=None)
#     title = db.Column(db.String(128), default=None)
#     organization = db.Column(db.String(128), db.ForeignKey('organizations.name'),
#                              nullable=False)

#     org = db.relationship('Organization')

#     def __repr__(self):
#         return '<Person id={} name={}'.format(self.person_id, self.name)


class Location(db.Model):
    """Location."""

    __tablename__ = 'locations'

    location_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    companies_qty = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Location id={} city={} state={}>'.format(self.location_id,
                                                          self.city, self.state)


def connect_to_db(app):
    """Connect DB to Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///crunchbase'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":

    from server import app
    connect_to_db(app)
    print "Connected to DB."
