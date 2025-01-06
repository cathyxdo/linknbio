# Linknbio App

LinknBio is a full-stack application built with Django REST Framework for the backend and Next.js for the frontend. It is containerized using Docker and orchestrated with Docker Compose.



## Tech Stack
- **Backend API**: Django REST Framework
- **Frontend**: Next.js, d3.js (graphs)
- **Database**: PostgreSQL 
- **Storage**: AWS S3 for photo uploads
- **Authentication**: Firebase



## Project Structure
```plaintext
linknbio/
├── backend/          # Django backend code
├── frontend/         # Next.js frontend code
├── docker-compose.yaml
├── .env              # Environment variables for both services
```
## Requirements
- [Docker](https://docs.docker.com/get-started/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started
1. Clone the Repository
    ```bash
    git clone https://github.com/cathyxdo/linknbio.git
    cd linknbio
    ```
2. 