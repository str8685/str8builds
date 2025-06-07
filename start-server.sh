#!/bin/bash

# Load environment variables once
export $(cat .env | xargs)

# Set proper NODE_ENV
export NODE_ENV=development

# Start the server
tsx server/index.ts 