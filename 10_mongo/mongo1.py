from pymongo import MongoClient
from bson.json_util import loads
from pprint import pprint

c = MongoClient()
db = c.RAM
meteors = db.meteors

if (meteors in db.list_collection_names()):
    f = open("meteorites.json","r")
    rString = f.readlines()
    t = loads(rString)

# Collection of data of 1000 meteors that landed on Earth by NASA
# Dataset: Earth Meteorite Landings
# Link: https://data.nasa.gov/resource/y77d-th95.json
# ,":@computed_region_cbhk_fwbd":"[0-9]{1,}",":@computed_region_nnqa_25f4":"[0-9]{1,}"
