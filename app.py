from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS, cross_origin
import utils

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

connection = None

@app.route("/login")
@cross_origin()
def login():
    try:
        global connection 
        connection = psycopg2.connect(user=request.args.get('user'),
                                    password=request.args.get('password'),
                                    host=request.args.get('host'),
                                    port=request.args.get('port'),
                                    dbname=request.args.get('database'))
    except Exception:
        connection = None
        return "Login failed", 401

    return "ok", 200

@app.route("/create")
@cross_origin()    
def create():
    if connection == None:
        return "Non authorized", 401

        
    with connection.cursor() as cur:
        cur.execute(utils.json_to_sql(request.json))
        connection.commit()

    return "ok", 200

@app.route("/get_list")
@cross_origin()
def get_list():
    if connection == None:
        return "Non authorized", 401
    
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
        
        return jsonify(result)
        
        

if __name__ == '__main__':
    app.run(debug=True)
