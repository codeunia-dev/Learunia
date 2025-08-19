#!/bin/bash

# Learn.Codeunia.com Deployment Script
# This script builds and prepares the application for deployment

echo "🚀 Starting deployment process for Learn.Codeunia.com..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Application is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect to Vercel for automatic deployment"
    echo "3. Or deploy manually to your preferred platform"
    echo ""
    echo "Local testing:"
    echo "- Run 'npm run start' to test the production build"
    echo "- Or run 'npm run dev' for development"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
