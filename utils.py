def json_to_sql(json):
    query = "CREATE TABLE IF NOT EXISTS {} (\n".format(json["tablename"])
    template = "{0} {1} {2} {3},"
    for column in json["columns"]:
        query += '\t' + template.format(column["name"], 
                             column["datatype"], 
                             "UNIQUE" if column["unique"] else "", 
                             "NOT NULL" if column["not_null"] else "")
        query += '\n'
    
    query += "\tPRIMARY KEY ("
    for key in json["primary"]:
        query += key + ','
    query = query[:-1]
    query += ")"

    if json['foreigns'].__len__() != 0:
        query += ',\n'
    else:
        query += '\n'

    for key in json['foreigns']:
        query += "\tFOREIGN KEY (" + key["item"] + ") REFERENCES " + key["table"] + " (" + key['other_item'] + '),'
    query = query[:-1]
    query += "\n);"

    return query
