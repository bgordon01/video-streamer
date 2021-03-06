<h1 align="center">Angular | Video Streamer</h1>

<p align="center">
  <img src="HomeScreen.png">
</p>

# Overview

An AngularJS video streamer application using version 7.3.9.

## Installation & Development

1. `cd video-streamer`  
2. `npm i`  
3. Run `npm start` for a dev server. 
4. Navigate to `http://localhost:4200/`. 

> The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### To test the distribution build

1. `npm install http-server -g`  
2. `cd video-streamer`  
3. `http-server dist`
4. Go to: `http://127.0.0.1:8080`

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Design and Implementation

## Technical and architectural choices used 

I decided the structure the project in a way that made sense to me, breaking it down by page (or route), components on the pages as well as shared components such as the header and footer. And then I added services and models used within the application. See below

- Components created:
   - Header
   - Footer
   - Video
   - Loader
   - Error
- Routes
   - Content (Home)
   - Movies
   - Series
- Models
   - Video
   - Search related
- Services
   - Video
   - Loader

## Improvements I could have made

- I could have implemented better unit as well as e2e testing
- Better responsive styling for mobile and tablet devices
- Improved the image URL fetching via HTTP (cache images, compress etc)
- I could have implemented better error handling, i.e. use an inteceptor, similarly to how the loader works

## Things I would have approached differently

- Implement a better API layer
- Paging, sorting and searching via the user interface
- Added a movie detail page (route)
- Improved the build process and deployment pipeline 
- Added a basic express server to render the dist files