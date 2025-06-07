#!/usr/bin/env bash
set -e

# STR8 BUILD Deployment Script
# This script handles the deployment process for the STR8 BUILD application
# It supports different deployment targets and environments

# Color codes for output formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display STR8 BUILD logo
echo -e "${CYAN}"
echo "███████ ████████ ██████   █████   ██████  ██    ██ ██ ██      ██████"
echo "██         ██    ██   ██ ██   ██  ██   ██ ██    ██ ██ ██      ██   ██"
echo "███████    ██    ██████  ███████  ██████  ██    ██ ██ ██      ██   ██"
echo "     ██    ██    ██   ██ ██   ██  ██   ██ ██    ██ ██ ██      ██   ██"
echo "███████    ██    ██   ██ ██   ██  ██████   ██████  ██ ███████ ██████"
echo -e "${NC}"
echo -e "${CYAN}Professional Construction Management App Deployment${NC}"
echo -e "${CYAN}==============================================${NC}\n"

# Default values
TARGET="netlify"
ENV="staging"
SKIP_BUILD=false
VERBOSE=false

# Functions
function show_help {
  echo -e "Usage: ./deploy.sh [options]"
  echo -e "Options:"
  echo -e "  -t, --target <target>    Deployment target (netlify, vercel, aws, gcp) - default: netlify"
  echo -e "  -e, --env <env>          Environment (development, staging, production) - default: staging"
  echo -e "  -s, --skip-build         Skip the build step"
  echo -e "  -v, --verbose            Verbose output"
  echo -e "  -h, --help               Show this help message and exit"
  exit 0
}

function log {
  local level=$1
  local message=$2
  
  case $level in
    "info")
      echo -e "${BLUE}[INFO]${NC} $message"
      ;;
    "success")
      echo -e "${GREEN}[SUCCESS]${NC} $message"
      ;;
    "warning")
      echo -e "${YELLOW}[WARNING]${NC} $message"
      ;;
    "error")
      echo -e "${RED}[ERROR]${NC} $message"
      ;;
  esac
}

function validate_deps {
  log "info" "Validating dependencies..."
  
  # Check for Node.js
  if ! command -v node &> /dev/null; then
    log "error" "Node.js is not installed. Please install Node.js to continue."
    exit 1
  fi
  
  # Check for npm
  if ! command -v npm &> /dev/null; then
    log "error" "npm is not installed. Please install npm to continue."
    exit 1
  fi
  
  # Check for deployment tool CLIs based on target
  case $TARGET in
    "netlify")
      if ! command -v netlify &> /dev/null; then
        log "warning" "Netlify CLI is not installed. Installing..."
        npm install -g netlify-cli
      fi
      ;;
    "vercel")
      if ! command -v vercel &> /dev/null; then
        log "warning" "Vercel CLI is not installed. Installing..."
        npm install -g vercel
      fi
      ;;
    "aws")
      if ! command -v aws &> /dev/null; then
        log "error" "AWS CLI is not installed. Please install AWS CLI to continue."
        exit 1
      fi
      ;;
    "gcp")
      if ! command -v gcloud &> /dev/null; then
        log "error" "Google Cloud SDK is not installed. Please install it to continue."
        exit 1
      fi
      ;;
  esac
  
  log "success" "All dependencies validated."
}

function build_app {
  if [ "$SKIP_BUILD" = true ]; then
    log "info" "Skipping build step..."
    return
  fi
  
  log "info" "Building application for ${ENV} environment..."
  
  # Create .env file based on environment
  if [ -f ".env.${ENV}" ]; then
    log "info" "Using .env.${ENV} configuration file."
    cp ".env.${ENV}" .env
  else
    log "warning" "No .env.${ENV} file found. Using default environment variables."
  fi
  
  # Run the build command based on environment
  case $ENV in
    "development")
      npm run build
      ;;
    "staging" | "production")
      npm run build:prod
      ;;
  esac
  
  if [ $? -eq 0 ]; then
    log "success" "Build completed successfully."
  else
    log "error" "Build failed. Please fix the errors and try again."
    exit 1
  fi
}

function deploy_app {
  log "info" "Deploying to ${TARGET} (${ENV})..."
  
  case $TARGET in
    "netlify")
      if [ "$ENV" = "production" ]; then
        netlify deploy --prod --dir=dist/public
      else
        netlify deploy --dir=dist/public
      fi
      ;;
    "vercel")
      if [ "$ENV" = "production" ]; then
        vercel --prod
      else
        vercel
      fi
      ;;
    "aws")
      log "info" "Deploying to AWS S3 and CloudFront..."
      
      # This is a placeholder. You would typically use aws s3 sync and cloudfront commands
      # aws s3 sync dist/public s3://your-bucket-name --delete
      # aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
      
      log "warning" "AWS deployment requires additional configuration."
      ;;
    "gcp")
      log "info" "Deploying to Google Cloud Storage and Firebase..."
      
      # This is a placeholder. You would typically use gsutil and firebase commands
      # gsutil -m rsync -r dist/public gs://your-bucket-name
      
      log "warning" "GCP deployment requires additional configuration."
      ;;
  esac
  
  if [ $? -eq 0 ]; then
    log "success" "Deployment completed successfully."
  else
    log "error" "Deployment failed. Please check the logs for more information."
    exit 1
  fi
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -t|--target)
      TARGET="$2"
      shift 2
      ;;
    -e|--env)
      ENV="$2"
      shift 2
      ;;
    -s|--skip-build)
      SKIP_BUILD=true
      shift
      ;;
    -v|--verbose)
      VERBOSE=true
      shift
      ;;
    -h|--help)
      show_help
      ;;
    *)
      log "error" "Unknown option: $1"
      show_help
      ;;
  esac
done

# Validate target
if [[ ! "$TARGET" =~ ^(netlify|vercel|aws|gcp)$ ]]; then
  log "error" "Invalid target: $TARGET"
  show_help
fi

# Validate environment
if [[ ! "$ENV" =~ ^(development|staging|production)$ ]]; then
  log "error" "Invalid environment: $ENV"
  show_help
fi

# Main execution
log "info" "Starting deployment process for STR8 BUILD..."
log "info" "Target: ${TARGET}"
log "info" "Environment: ${ENV}"

validate_deps
build_app
deploy_app

log "success" "STR8 BUILD deployment process completed."
echo -e "\n${CYAN}Thank you for using STR8 BUILD deployment script${NC}"
echo -e "${CYAN}For support, visit str8build.co.nz${NC}"
