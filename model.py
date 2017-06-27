"""Model for Crunchbase DB."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Person(db.Model):
    """Person."""

    __tablename__ = 'people'

    person_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    crunchbase_uuid = db.Column(db.String(50), default=None)
    cb_type = db.Column(db.String(20), default=None)
    first_name = db.Column(db.String(128), default=None)
    last_name = db.Column(db.String(128), default=None)
    crunchbase_url = db.Column(db.String(128), default=None)
    profile_image_url = db.Column(db.String(128), default=None)
    facebook_url = db.Column(db.String(128), default=None)
    twitter_url = db.Column(db.String(128), default=None)
    linkedin_url = db.Column(db.String(128), default=None)
    location_city = db.Column(db.String(50), default=None)
    location_region = db.Column(db.String(50), default=None)
    location_country_code = db.Column(db.String(20), default=None)
    title = db.Column(db.String(128), default=None)
    organization = db.Column(db.String(128), default=None)
    organization_crunchbase_url = db.Column(db.String(128), default=None)

    def __repr__(self):
        return '<Person id={} name={} {}'.format(self.person_id, self.first_name,
                                                 self.last_name)


class Organization(db.Model):
    """Organization."""

    __tablename__ = 'organizations'

    organization_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    crunchbase_uuid = db.Column(db.String(50), default=None)
    cb_type = db.Column(db.String(20), default=None)
    primary_role = db.Column(db.String(20), default=None)
    name = db.Column(db.String(128), default=None)
    crunchbase_url = db.Column(db.String(128), default=None)
    homepage_domain = db.Column(db.String(128), default=None)
    homepage_url = db.Column(db.String(128), default=None)
    profile_image_url = db.Column(db.String(128), default=None)
    facebook_url = db.Column(db.String(128), default=None)
    twitter_url = db.Column(db.String(128), default=None)
    linkedin_url = db.Column(db.String(128), default=None)
    stock_symbol = db.Column(db.String(20), default=None)
    location_city = db.Column(db.String(50), default=None)
    location_region = db.Column(db.String(50), default=None)
    location_country_code = db.Column(db.String(20), default=None)
    short_description = db.Column(db.String(256), default=None)

    def __repr__(self):
        return '<Organization id={} name={}'.format(self.organization_id,
                                                    self.name)


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
