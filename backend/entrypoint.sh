#!/bin/bash
set -e

echo "Running migrations..."
python manage.py migrate

if [ ! -f .data_loaded ]; then
    echo "Loading initial book data from API..."
    
    # We do a quick check to see if the table expects to be empty or load-book-data handles it.
    # We run the script. It uses API key so without it this can fail.
    # To prevent crash loops if they don't provide the valid key,
    # we catch the error but still proceed so the server can run and user can see the issue.
    python scripts/load-book-data.py || echo "Warning: Failed to load book data (maybe missing or invalid GOOGLE_BOOKS_API_KEY)"
    
    touch .data_loaded
else
    echo "Initial data already loaded, skipping..."
fi

echo "Starting server..."
exec "$@"
