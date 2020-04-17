require('dotenv').config();
const server = require('./server');
const connection = require('./database');

async function main(){
    await server.listen(server.get('port'));
    console.log('server start on port', server.get('port'));
    await connection();
}

main();
