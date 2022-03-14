const Config = require('../config/config')
const { Pool } = require('pg')

const conn = new Pool(Config)



const insertData = async (tableName, json) => {

    var query = "INSERT INTO " + tableName;


    var cols = '('
    var values = '('


    for (const [key, value] of Object.entries(json)) {
        cols += key
        cols += ','

        values = values + "'" + value + "'"
        values += ','
    }

    cols = cols.slice(0, -1)
    values = values.slice(0, -1)
    cols += ')'
    values += ')'

    query = query + cols + ' values' + values + ';'

    console.log(query)
    var data = await conn.query(query);
    return data;

}



const getData = async (tableName, extras) => {
    var find = extras.find

    var query = 'SELECT * FROM ' + tableName + ' WHERE is_deleted=FALSE and '
    find_values = ''
    for (const [key, value] of Object.entries(find)) {
        find_values += key + "='" + value + "'"
        find_values += ' and '
    }
    find_values = find_values.slice(0, -4)
    if (find_values == '') {
        query = query.slice(0, -4)
    }


    if (extras.pagination) {
        var pageNumber = extras.paginationDetails.pageNumber
        var limit = extras.paginationDetails.limit
        query += find_values + " ORDER BY id ASC OFFSET " + (limit * (pageNumber - 1)) + "LIMIT " + limit + ";"
    }
    else {
        query += find_values + ";"
    }

    var data = await conn.query(query)
    return data


};



const updateData = async (tableName, json, find) => {


    var query = 'UPDATE ' + tableName + ' SET '

    var values = ''
    for (const [key, value] of Object.entries(json)) {
        values += key
        values += "='"
        values += value
        values += "'"
        values += ', '

    }
    values = values.slice(0, -2)

    find_values = ''
    for (const [key, value] of Object.entries(find)) {
        find_values += key + "='" + value + "'"
        find_values += ' and '
    }
    find_values = find_values.slice(0, -4)
    //console.log(find_values)

    query += values + ' WHERE ' + find_values + ';'
    //console.log(query)

    var data = await conn.query(query)
    return data;


}


const deleteData = async (tableName, find) => {

    var query = 'UPDATE ' + tableName + ' SET '

    var values = ' is_deleted=TRUE'

    find_values = ''
    for (const [key, value] of Object.entries(find)) {
        find_values += key + "='" + value + "'"
        find_values += ' and '
    }
    find_values = find_values.slice(0, -4)


    query += values + ' WHERE ' + find_values + ';'


    var data = await conn.query(query)
    return data;


}



module.exports = {
    insertData: insertData,
    updateData: updateData,
    deleteData: deleteData,
    getData: getData
}