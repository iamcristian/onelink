# OneLink Installation Guide

This guide will help you set up and run the OneLink project on your local machine.

## Prerequisites

Ensure you have the following installed:

- **Node.js** v18+
- **npm**
- **Docker** and **Docker Compose**
- **MongoDB** (local or cloud, e.g., Atlas)

## Clone the Repository

## Docker Instructions

1. Run `docker-compose build` to build the images.
2. Then run `docker-compose up -d` to start the containers in the background.
3. To stop them, use `docker-compose down`.

**Step-by-Step Solution**

1. Run `docker-compose up -d`.
2. Open your browser and go to [http://localhost:5173](http://localhost:5173) to see the frontend.
3. The backend will be available at [http://localhost:4000](http://localhost:4000).
4. If you are using another machine on the local network, replace `localhost` with the IP of the machine running Docker.
