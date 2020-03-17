# Kevin Cai
# SoftDev pd9
# K11 -- MongoPi
# 2020-03-16

from flask import (
  g,
  Flask,
  render_template,
  request
)
from mongo import (
  init_client,
  init_database,
  insert_data
)
from licenses import (
  find_by_filter,
  find_by_identifier,
  find_by_keyword,
  find_by_keywords,
  find_by_name,
  find_by_scheme
)


app = Flask(__name__)


@app.before_request
def connect():
  g.client = init_client('mongodb://localhost:27017/')

  g.licenses = init_database(g.client, 'licenses')

  # Partner does not have their part of the code from the last assignment for meteorites...
  g.meteorites = init_database(g.client, 'meteorites')

  g.licenses_queries = {
    'filter': find_by_filter,
    'identifier': find_by_identifier,
    'keyword': find_by_keyword,
    'keywords': find_by_keywords,
    'name': find_by_name,
    'scheme': find_by_scheme
  }


@app.teardown_request
def disconnect(Exception):
  g.client.close()
  g.pop('client', None)
  g.pop('licenses', None)
  g.pop('meteorites', None)


with app.app_context():
  connect()

  insert_data(g.licenses, 'license', 'opensoftware-licenses.json')
  insert_data(g.meteorites, 'earth_landings', 'meteorites.json')

  disconnect(None)


@app.route('/')
def index():
  return render_template('index.html')


@app.route('/query')
def query():
  query_base = request.args['selectQueryBase']
  search_type = request.args['searchQuery'].split('::')[0]
  search_query = request.args['searchQuery'].split('::')[1:]
  if query_base == 'licenses':
    if search_type == 'keywords':
      return render_template(
        'index.html',
        response = True,
        results = g.licenses_queries[search_type](g.licenses, search_query)
      )
    else:
      return render_template(
        'index.html',
        response = True,
        results = g.licenses_queries[search_type](g.licenses, search_query[0])
      )
  return render_template('index.html', response = False)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
