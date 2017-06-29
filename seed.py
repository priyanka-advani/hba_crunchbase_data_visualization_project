"""Load Crunchbase data into Crunchbase DB."""

# from model import Person
from model import Company
# from model import Investor
from model import Location
from model import db, connect_to_db
from server import app

from sqlalchemy import exc

import csv

import googlemaps


def load_companies():
    """Load companies from organizations.csv into database."""

    with open("data/organizations.csv") as f:

        reader = csv.reader(f)

        for row in reader:

            (crunchbase_uuid,
            cb_type,
            primary_role,
            name,
            crunchbase_url,
            homepage_domain,
            homepage_url,
            profile_image_url,
            facebook_url,
            twitter_url,
            linkedin_url,
            stock_symbol,
            location_city,
            location_region,
            location_country_code,
            short_description) = row

            if (location_country_code == 'USA' and location_city != ''
                and primary_role == 'company'):

                company = Company(name=name,
                                  crunchbase_url=crunchbase_url,
                                  homepage_url=homepage_url,
                                  profile_image_url=profile_image_url,
                                  stock_symbol=stock_symbol,
                                  city=location_city,
                                  state=location_region,
                                  short_description=short_description)

                try:
                    db.session.add(company)
                    db.session.flush()

                except exc.DataError:
                    db.session.rollback()
                    print 'Data Error'

                except exc.IntegrityError:
                    db.session.rollback()
                    print 'Integrity Error'

                else:
                    db.session.commit()


# def load_investors():
#     """Load investors from organizations.csv into database."""

#     with open("data/organizations.csv") as f:

#         reader = csv.reader(f)

#         for row in reader:

#             (crunchbase_uuid,
#             cb_type,
#             primary_role,
#             name,
#             crunchbase_url,
#             homepage_domain,
#             homepage_url,
#             profile_image_url,
#             facebook_url,
#             twitter_url,
#             linkedin_url,
#             stock_symbol,
#             location_city,
#             location_region,
#             location_country_code,
#             short_description) = row

#             if primary_role.lower() = 'investor' and location_country_code = 'USA':

#                 investor = Investor(crunchbase_uuid=crunchbase_uuid,
#                                     primary_role=primary_role,
#                                     name=name,
#                                     crunchbase_url=crunchbase_url,
#                                     homepage_url=homepage_url,
#                                     profile_image_url=profile_image_url,
#                                     stock_symbol=stock_symbol,
#                                     location_city=location_city,
#                                     location_region=location_region,
#                                     short_description=short_description)

#                 try:
#                     db.session.add(investor)
#                     db.session.flush()

#                 except exc.DataError:
#                     db.session.rollback()
#                     print 'Too many characters'

#                 except exc.IntegrityError:
#                     db.session.rollback()
#                     print 'Duplicate'

#                 else:
#                     db.session.commit()
                


# def load_people():
#     """Load people from people.csv into database."""

#     with open("data/people.csv") as f:

#         reader = csv.reader(f)

#         for row in reader:

#             (crunchbase_uuid,
#             cb_type,
#             first_name,
#             last_name,
#             crunchbase_url,
#             profile_image_url,
#             facebook_url,
#             twitter_url,
#             linkedin_url,
#             location_city,
#             location_region,
#             location_country_code,
#             title,
#             organization,
#             organization_crunchbase_url) = row

#             name = first_name + " " + last_name

#             person = Person(crunchbase_uuid=crunchbase_uuid,
#                             cb_type=cb_type,
#                             name=name,
#                             crunchbase_url=crunchbase_url,
#                             profile_image_url=profile_image_url,
#                             location_city=location_city,
#                             location_region=location_region,
#                             location_country_code=location_country_code,
#                             title=title,
#                             organization=organization)

#             try:
#                 db.session.add(person)
#                 db.session.flush()

#             except exc.DataError:
#                 db.session.rollback()
#                 print 'Too many characters'

#             except exc.IntegrityError:
#                 db.session.rollback()
#                 print 'Duplicate'

#             else:
#                 db.session.commit()


def load_locations():
    """Look up city coordinates using Google Geocode API and write to database."""

    with open("data/500cities.csv") as f:

        reader = csv.reader(f)

        for row in reader:

            city, state, companies_qty = row

            citystate = city + ', ' + state

            companies_qty = int(companies_qty)

            gmaps = googlemaps.Client(key='AIzaSyDhCeDrRa_Fs_gLbPUHp-UsHPKb53LIFlw')

            geocode_result = gmaps.geocode(citystate)

            lat = geocode_result[0]['geometry']['location']['lat']
            lng = geocode_result[0]['geometry']['location']['lng']

            location = Location(city=city,
                                state=state,
                                lat=lat,
                                lng=lng,
                                companies_qty=companies_qty)

            db.session.add(location)
            db.session.commit()


if __name__ == "__main__":
    
    connect_to_db(app)

    db.create_all()

    # load_companies()
    # load_investors()
    # load_people()
    load_locations()
