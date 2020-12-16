const api = require('./src/api/api')

var port = process.env.PORT || 8080

api.listen(port, () => console.log('Example app listening on port 8080!'))
