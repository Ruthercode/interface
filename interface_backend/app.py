from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS, cross_origin
from urllib.parse import urlparse
from flask import request

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/get_list")
@cross_origin()
def get_list():
    result = urlparse(request.headers.get('Authorization'))
    
    try:
        connection = psycopg2.connect(
        database = result.path[1:],
        user = result.username,
        password = result.password,
        host = result.hostname,
        port = result.port
        )
    except psycopg2.Error as e:
        return "Bad login", 401
    else:
        with connection:
            with connection.cursor() as cur:
                s = ""
                s += "SELECT table_name "
                s += "FROM information_schema.tables "
                s += "WHERE table_schema = 'public' "
                s += "ORDER BY table_name;"

                cur.execute(s)
                list_tables = cur.fetchall()

                result = {"tables" : []}
                for t_name_table in list_tables:
                    result["tables"].append(t_name_table[0])
                
                return jsonify(result), 200
        

@app.route("/get_table")
@cross_origin()
def get_table():
    result = urlparse(request.headers.get('Authorization'))
    
    try:
        connection = psycopg2.connect(
        database = result.path[1:],
        user = result.username,
        password = result.password,
        host = result.hostname,
        port = result.port
        )
    except psycopg2.Error as e:
        return "Bad login", 401
    else:
        with connection:
            with connection.cursor() as cur:
                s = ""
                s += "SELECT column_name,data_type  "
                s += "FROM information_schema.columns "
                s += "WHERE table_name = '{}';".format(request.args.get("table"))

                cur.execute(s)
                list_col = cur.fetchall()

                result = {"columns" : [], "type" : [], "data" : []}
                for item in list_col:
                    result["columns"].append(item[0])
                    result["type"].append(item[1])
                
                s = ""
                s += "SELECT *  "
                s += "FROM {} ".format(request.args.get("table"))

                cur.execute(s)
                list_row = cur.fetchall()
                
                for item in list_row:
                    to_push = {}
                    for key, value in enumerate(item):
                        to_push[result["columns"][key]] = value

                    result["data"].append(to_push)
                
                return jsonify(result), 200


def insert_one(table, item, connection):
    with connection:
        with connection.cursor() as cur:
            s = ""
            s += "INSERT INTO {}  ".format(table)
            cols = "("
            values = "("

            for key, value in item.items():
                cols += key + ','
                values += str(value) + ','

            cols = cols[:-1] + ')'
            values = values[:-1] + ')'

            s += cols + ' VALUES ' + values

            cur.execute(s)

def delete_one(table, item, connection):
    with connection:
        with connection.cursor() as cur:
            s = ""
            s += "DELETE FROM {} WHERE ".format(table)

            for key, value in item.items():
                s += key + ' = ' + str(value) + ' AND '

            s = s[:-4]

            cur.execute(s)

@app.route("/update_table", methods=['POST'])
@cross_origin()
def update_table():
    result = urlparse(request.headers.get('Authorization'))
    
    try:
        connection = psycopg2.connect(
        database = result.path[1:],
        user = result.username,
        password = result.password,
        host = result.hostname,
        port = result.port
        )
    except psycopg2.Error as e:
        return "Bad login", 401
    else:
        with connection:
            with connection.cursor() as cur:
                data = request.get_json(force=True)
                table_name = data["tablename"]
                table = data["table"]
                old_table = data["oldtable"]

                to_delete = []
                to_insert = []

                for item in old_table:
                    if item not in table:
                        to_delete.append(item)

                for item in table:
                    if item not in old_table:
                        to_insert.append(item)

                for item in to_delete:
                    delete_one(table_name, item, connection)
                
                try:
                    for item in to_insert:
                        insert_one(table_name, item, connection)
                except psycopg2.errors.UniqueViolation as e:
                    return jsonify({"error": str(e)}), 400
                
                return "ok", 200

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
