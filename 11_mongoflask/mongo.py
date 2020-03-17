from pprint import pprint
from pymongo import MongoClient
from bson.json_util import loads


# function to handle data
def ingest(f):
    with open(f) as _f:
        return loads(_f.read())


# functions to for handling init
init_client = lambda uri: MongoClient(uri)
init_database = lambda client, database_name: client[database_name]


# functions to insert data
insert_data = lambda database, collection, f: database[collection].insert_many(ingest(f))


# util functions
def print_results(results):
  for result in results:
    pprint(result)