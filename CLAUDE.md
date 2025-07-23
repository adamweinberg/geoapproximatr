# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoApproximatr is a Geoguessr clone built with React/Redux on the frontend and Express/Node.js on the backend. Players are shown random Google StreetView locations and must guess where they are on a map. Points are awarded based on proximity to the actual location.

## Development Commands

### Starting the Application
- `npm run start:dev` - Starts both webpack build watcher and server with nodemon
- `npm run start:dev:logger` - Same as above but with Redux logging enabled
- `npm run start:dev:seed` - Same as above but with database seeding enabled
- `npm start` - Production server start (requires pre-built bundle)

### Building
- `npm run build` - Production webpack build
- `npm run build:dev` - Development webpack build with watch mode

### Testing
- `npm test` - Run all tests (both server and client)
- `npm run test:dev` - Run tests in watch mode
- `npm run test:dev:models` - Run only model tests in watch mode
- `npm run test:dev:routes` - Run only route tests in watch mode

### Database
- `npm run seed` - Seed the database with sample data

## Architecture

### Frontend (React/Redux)
- **Entry Point**: `client/index.js` - Sets up React app with Redux Provider and React Router
- **Store**: `client/store/index.js` - Combines reducers for auth, location, guess, and game state
- **Components**: Located in `client/components/` - includes main game components like `Game.js`, `Map.js`, `StreetView.js`
- **State Management**: Redux with thunk middleware for async actions and logger for development

### Backend (Express/Node.js)
- **Entry Point**: `server/index.js` - Initializes database and starts Express server
- **App Setup**: `server/app.js` - Express middleware, routing, and error handling
- **Database**: Uses Sequelize ORM with PostgreSQL
- **Auth**: JWT-based authentication in `server/auth/`
- **API Routes**: User management in `server/api/users.js`

### Key Dependencies
- **Google Maps Integration**: Uses `@googlemaps/js-api-loader`, `google-map-react`, and `react-google-streetview`
- **Random Locations**: Custom implementation in `script/random-streetview/`
- **UI**: Material-UI components for styling
- **Testing**: Mocha/Chai for backend, Enzyme for React components

## Environment Setup

Requires `.env` file with:
- `REACT_APP_API_KEY` - Google Maps JavaScript API key (required for maps and StreetView)

## Development Notes

- The application serves a single-page app from `public/index.html`
- Webpack bundles client code to `public/bundle.js`
- Database models are defined in `server/db/models/`
- Game logic calculations are in `script/calcs.js`
- Server runs on port 8080 by default, configurable via PORT environment variable
- Uses nodemon for server auto-restart during development
- JWT token set to 'shh' for development (server/index.js:17)