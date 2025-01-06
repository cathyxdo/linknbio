# Linknbio App

Linknbio is a full-stack application built with Django REST Framework for the backend and Next.js for the frontend. It is containerized using Docker and orchestrated with Docker Compose.
- [Website](https://weigh-my-pack-react.onrender.com/)
- [Example Linknbio](https://weigh-my-pack-react.onrender.com/#/73vGDoxAvHST5jEdvjvmS5)

## Features
- Create a custom page to share your links and social media profiles
- Analytics to track performance of link and social media clicks
- Ability to log in via Google account

## Screenshots
[INSERT SCREENSHOTS]

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
1. Install Docker
    - [Docker](https://docs.docker.com/get-started/get-docker/)
    - [Docker Compose](https://docs.docker.com/compose/install/)
2. Create a PostgreSQL DB on your local machine or using a service (I use Render because they have a free option)
3. Set up [AWS](https://aws.amazon.com/) S3 Bucket (for photo 
uploads)
4. Set up [Firebase Auth](https://firebase.google.com/products/auth)

## Getting Started
1. Clone the Repository
    ```bash
    git clone https://github.com/cathyxdo/linknbio.git
    cd linknbio
    ```
2. Create .env file in root directory using set ups made from above prerequisites
    ```bash
    #.env file
    # backend env variables
    POSTGRES_DB=your-postgres-db
    POSTGRES_USER=your-postgres-user
    POSTGRES_PASSWORD=your-postgres-password
    POSTGRES_HOST=your-postgres-host
    POSTGRES_PORT=5432

    AWS_ACCESS_KEY_ID=your-aws-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    AWS_STORAGE_BUCKET_NAME=your-aws-bucket-name
    AWS_S3_REGION_NAME=your-aws-s3-region-name

    # frontend env variables
    NEXT_PUBLIC_API_URL=http://localhost:8000
    NEXT_PUBLIC_API_URL_SERVER=http://backend:8000

    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
    NEXT_PUBLIC_SHARE_URL=http://localhost:3000
    ```
3. Build Docker images
    ```bash
    docker compose build
    ```
4. Start up app
    ```bash
    # run containers in background (-d flag)
    docker compose up -d
    ```

    Run command to apply database migrations
    ```bash
    docker compose exec backend python manage.py migrate
    ```
    ### Access the Application
- Visit http://localhost:3000 for the frontend.
- API endpoints will be available at http://localhost:8000/api.
5. To stop the app 
    ```bash
    docker compose down
    ```
## Future Features

- Drag and drop items to reorder links 
- Add option to use Image as background
- Add ability to "section" to categorize related links
- Add template styles

## Contributing

Feel free to fork the project and submit pull requests for any improvements, bug fixes, or new features!

## License

This project is open-source and available under the MIT License.



