#!/bin/bash

# Make script executable
chmod +x check-for-ai-errors.sh

# Run the AI error check script
echo "Running AI error check..."
node scripts/ai-error-check.js

# Check exit code
if [ $? -eq 0 ]; then
  echo "✅ All checks passed!"
else
  echo "❌ Some issues were detected. Please check the output above."
fi