"""Load Crunchbase data into Crunchbase DB."""

from model import Person
from model import Organization
from model import db, connect_to_db
from server import app

import csv


def load_people():
    """Load people from people.csv into database."""

    with open("crunchbase_data/people.csv") as f:

        reader = csv.reader(f)

        for row in reader:

            (crunchbase_uuid,
            cb_type,
            first_name,
            last_name,
            crunchbase_url,
            profile_image_url,
            facebook_url,
            twitter_url,
            linkedin_url,
            location_city,
            location_region,
            location_country_code,
            title,
            organization,
            organization_crunchbase_url) = row

            person = Person(crunchbase_uuid=crunchbase_uuid,
                            cb_type=cb_type,
                            first_name=first_name,
                            last_name=last_name,
                            crunchbase_url=crunchbase_url,
                            profile_image_url=profile_image_url,
                            facebook_url=facebook_url,
                            twitter_url=twitter_url,
                            linkedin_url=linkedin_url,
                            location_city=location_city,
                            location_region=location_region,
                            location_country_code=location_country_code,
                            title=title,
                            organization=organization,
                            organization_crunchbase_url=organization_crunchbase_url)

            db.session.add(person)

    db.session.commit()


def load_organizations():
    """Load organizations from organizations.csv into database."""

    with open("crunchbase_data/organizations.csv") as f:

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
            short_description) = row.split(",")

            organization = Organization(crunchbase_uuid=crunchbase_uuid,
                                        cb_type=cb_type,
                                        primary_role=primary_role,
                                        name=name,
                                        crunchbase_url=crunchbase_url,
                                        homepage_domain=homepage_domain,
                                        homepage_url=homepage_url,
                                        profile_image_url=profile_image_url,
                                        facebook_url=facebook_url,
                                        twitter_url=twitter_url,
                                        linkedin_url=linkedin_url,
                                        stock_symbol=stock_symbol,
                                        location_city=location_city,
                                        location_region=location_region,
                                        location_country_code=location_country_code,
                                        short_description=short_description)

            db.session.add(organization)

    db.session.commit()


if __name__ == "__main__":
    
    connect_to_db(app)

    db.drop_all()
    db.create_all()

    load_people()
    load_organizations()
