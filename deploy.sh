#!/bin/bash

set -e

echo "🚀 Starting Cloudflare Pages deployment..."
echo ""

# Clean install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Cloudflare Pages
echo "☁️  Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=jumper-game-phaser

echo ""
echo "✅ Deployment complete!"
echo "🎮 Your game is live at: https://jumper-game-phaser.pages.dev"
