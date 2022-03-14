

const res = require('express/lib/response');
const db = require('../db_modules/db_functions')

const createUrl = async (req, resp) => {



    if ("full" in req.body) {

        var target_url = req.body.full;
        var token;
        if (req.body.short) {
            token = req.body.short;
        }
        else {
            token = (Math.random() + 1).toString(36).substring(7);
        }

        await db.insertData('url', {
            'is_deleted': false,
            'original_url': target_url,
            'url_token': token
        });



        resp.status(200).json({ status: "Sucess", url: 'http://' + req.hostname + ':7000/' + token })
    }
    else {
        resp.status(500).json({ message: "Bad Request" })
    }
}


module.exports = createUrl