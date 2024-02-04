#!/bin/bash

echo "Waiting for MySQL"
while ! mysqladmin ping -h"mysql" --silent; do
    sleep 1
done

echo "MySQL is up"

echo "Initializing database"

if node -e 'require("./db.js")()'; then
    echo "Database initialized successfully"
else
    echo "Database initialization failed"
fi

exec "$@"