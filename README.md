# Movie API

#### Notes:
- Required files: `.env` file.
- Required installation: npm, node.
- Node Version: `v12.20.1`
- Install node dependencies: `npm install`
- To build development version: `npm run start`
- Port: `5002`
- Staging Domain: `localhost:5002`

#### Running with Docker:
- Required installation: docker.
- Docker Hub image: `https://hub.docker.com/layers/dshymkiv/test_movies/latest/images/sha256:d2402ed7c87411e77c3196ebd6bea415c5ad07541d447834e3ef6aa3d53713b0`
- To build Docker image: `docker build -t dshymkiv/test_movies .`.
- To run Docker image on Docker container: `docker run --name movies --rm -d -p 5001:5002 -e APP_PORT=5002 dshymkiv/test_movies`.
- Port: `5001`
- Staging Domain: `localhost:5001`

#### Description:
NodeJS based application for movie management.

#### API Endpoints:
Authorization / Sign in
- POST: `/api/v1/sessions`

User Creation / Sign up
- POST: `/api/v1/users`

Movies
- GET: `/api/v1/movies`
- GET: `/api/v1/movies/:movieId`
- POST: `/api/v1/movies`
- POST: `/api/v1/movies/import`
- PATCH: `/api/v1/movies/:movieId`
- DELETE: `/api/v1/movies/:movieId`
