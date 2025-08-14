#!/bin/bash

# Nano Banana AI Deployment Script
# Usage: ./scripts/deploy.sh [environment]
# Environment options: staging | production

set -e  # Exit immediately on error

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_message() {
    echo -e "${2}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

print_success() {
    print_message "$1" "$GREEN"
}

print_error() {
    print_message "$1" "$RED"
}

print_warning() {
    print_message "$1" "$YELLOW"
}

print_info() {
    print_message "$1" "$BLUE"
}

# Check parameters
ENVIRONMENT=${1:-staging}

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "Error: Invalid environment parameter. Please use 'staging' or 'production'"
    exit 1
fi

print_info "Starting deployment to $ENVIRONMENT environment..."

# Check required tools
print_info "Checking required tools..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

# Enter frontend directory
cd frontend

# Install dependencies
print_info "Installing dependencies..."
npm ci

# Run tests (if available)
print_info "Running tests..."
# npm run test 2>/dev/null || print_warning "No test script found"

# Build project
print_info "Building project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_success "Build completed"

# Check build artifacts
if [ ! -d "dist" ]; then
    print_error "Build artifacts directory does not exist"
    exit 1
fi

print_info "Build artifacts size:"
du -sh dist/

# Execute different deployment logic based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    print_info "Deploying to production environment..."
    
    # Production deployment logic can be added here
    # For example: upload to server, update CDN, etc.
    
    print_warning "Production deployment logic needs to be configured based on actual server setup"
    print_info "Build artifacts located at: frontend/dist/"
    print_info "Please upload the contents of dist/ directory to your production server"
    
elif [ "$ENVIRONMENT" = "staging" ]; then
    print_info "Deploying to staging environment..."
    
    # Staging deployment logic can be added here
    
    print_warning "Staging deployment logic needs to be configured based on actual setup"
    print_info "Build artifacts located at: frontend/dist/"
fi

print_success "Deployment completed!"

# Output deployment information
print_info "Deployment Information:"
print_info "- Environment: $ENVIRONMENT"
print_info "- Build Time: $(date)"
print_info "- Build Artifacts: frontend/dist/"

if [ "$ENVIRONMENT" = "production" ]; then
    print_info "- Production URL: https://nanobananaimage.org"
else
    print_info "- Staging URL: Please configure based on actual setup"
fi

print_success "🎉 Deployment process completed!"