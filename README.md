This project is a React + Javscript application built using Vite as part of the Monk Commerce assignment. The application integrates with Monk’s staging API to fetch and display products with search and pagination support. It also includes drag-and-drop functionality for managing product ordering.

The project demonstrates:

API integration using environment variables

Search and pagination implementation

Drag and drop functionality

Modular component structure

Deployment using Netlify

Environment variables are required to run the project:

VITE_MONK_API_KEY=your_api_key
VITE_API_URL=https://stageapi.monkcommerce.app/task/products/search


These variables must be configured in a .env file locally and added in Netlify under Site Configuration → Environment Variables for production deployment.

The project is built using modern React practices with Javascript and follows a clean, scalable folder structure.