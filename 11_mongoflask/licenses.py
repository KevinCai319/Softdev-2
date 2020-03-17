# functions to query data
find_by_name = lambda database, name: list(
  database['license'].find({
    '$or': [ { 'name': name }, { 'id': name } ]
  })
)
find_by_identifier = lambda database, identifier: list(
  database['license'].find({
    'identifiers': { '$elemMatch': { 'identifier': identifier } }
  })
)
find_by_keyword = lambda database, keyword: list(
  database['license'].find({
    'keywords': { '$elemMatch': { '$eq': keyword } }
  })
)
find_by_keywords = lambda database, keywords: list(
  database['license'].find({
    'keywords': { '$in': keywords }
  })
)
find_by_filter = lambda database, _filter: list(
  database['license'].find({
    'keywords:': { '$nin': [_filter] }
  })
)
find_by_scheme = lambda database, scheme: list(
  database['license'].find({
    'identifiers': { '$elemMatch': { 'scheme': scheme } }
  })
)