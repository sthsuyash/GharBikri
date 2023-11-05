import swaggerAutogen from 'swagger-autogen';
import { DOMAIN } from '../src/config/env.js';

const doc = {
    info: {
        version: '1.0.0',
        title: 'GharBikri APIs',
        description: 'API for GharBikri',
        contact: {
            name: 'API Support',
            email: 'sthasuyash11@gmail.com',
        },
    },
    host: 'localhost:5000', // TODO: Change this to 'gharbikri.com.np' in production
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'GharBikri CRUD',
            description: 'GharBikri related APIs',
        },
        {
            name: 'Health',
            description: 'Health Check',
        },
    ],
    securityDefinitions: {
        apiKey: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    definitions: {
        healthResponse: {
            type: 'object',
            properties: {
                code: {
                    type: 'integer',
                    format: 'int32',
                },
                message: {
                    type: 'string',
                },
            },
        },
        errorResponse: {
            type: 'object',
            properties: {
                code: {
                    type: 'integer',
                    format: 'int32',
                },
                message: {
                    type: 'string',
                },
            },
        },
    },
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./src/index.js', './src/controllers/*.js'];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);