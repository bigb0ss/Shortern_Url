
const db = require('../db_modules/db_functions')

const path = require('path');


const redirectUrl = async (req, resp) => {


    var token = req.params.token;
    console.log(token)

    var data = await db.getData('url', {
        find: {
            url_token: token
        }
    })
    if (data.rows.length == 0) {
        // no records of token available in database
        resp.status(404).write(`
        <html>

<head>
    <title>
        404 - Page Not Found
    </title>
    <link href="https://bootswatch.com/5/cyborg/bootstrap.min.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>
                    Error 404
                </h1>
                <br>
                <h4>Page not found</h4>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</body>

</html>
        `)
        resp.end()
    }
    else {
        resp.status(200).redirect(data.rows[data.rows.length-1].original_url)
    }


}

module.exports = redirectUrl