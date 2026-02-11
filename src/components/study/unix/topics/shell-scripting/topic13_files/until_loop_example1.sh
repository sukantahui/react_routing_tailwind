#!/bin/bash
# Wait for database service to become available (Naihati deployment)
DATABASE_HOST="db.naihati.internal"
MAX_ATTEMPTS=30
ATTEMPT=1

echo "Waiting for database service at $DATABASE_HOST..."

until nc -z "$DATABASE_HOST" 5432; do
    if (( ATTEMPT > MAX_ATTEMPTS )); then
        echo "Error: Database not available after $MAX_ATTEMPTS attempts"
        exit 1
    fi
    
    echo "Attempt $ATTEMPT/$MAX_ATTEMPTS: Database not ready, waiting 5 seconds..."
    sleep 5
    ATTEMPT=$((ATTEMPT + 1))
done

echo "Database is available! Starting migration scripts..."
# Run database migrations here