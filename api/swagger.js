// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reddit Clone API',
      version: '1.0.0',
      description: 'API documentation for Reddit Clone',
    },
  },
   // Include all relevant route files
   apis: ['./VotingRoutes.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
