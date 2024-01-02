// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reddit Clone API',
      version: '1.0.0',
      description: 'API documentation for Reddit Clone',
    },
  },
  apis: ['./VotingRoutes.js'], // Add your route file(s) here
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
