const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));
}

