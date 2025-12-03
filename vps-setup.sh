#!/bin/bash

# VPS Setup Script for Hostinger Deployment
# Run this script once on your VPS to install all required dependencies

set -e  # Exit on error

echo "=========================================="
echo "VPS Setup for Next.js Deployment"
echo "=========================================="
echo ""

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js 20.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js installed: $(node --version)"
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Verify npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found, installing..."
    sudo apt-get install -y npm
else
    echo "✅ npm installed: $(npm --version)"
fi

# Install PM2 globally
echo "📦 Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo "✅ PM2 installed: $(pm2 --version)"
else
    echo "✅ PM2 already installed: $(pm2 --version)"
fi

# Setup PM2 to start on boot
echo "🔧 Setting up PM2 startup..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p ~/wpomalaza
echo "✅ Directory created: ~/wpomalaza"

# Install Nginx (optional but recommended)
echo "📦 Installing Nginx (optional)..."
read -p "Do you want to install Nginx as a reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo apt install -y nginx
    echo "✅ Nginx installed"
    echo "⚠️  You'll need to configure Nginx manually. See DEPLOYMENT.md"
else
    echo "⏭️  Skipping Nginx installation"
fi

# Configure firewall
echo "🔒 Configuring firewall..."
read -p "Do you want to configure UFW firewall? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow 3000/tcp
    sudo ufw --force enable
    echo "✅ Firewall configured"
    sudo ufw status
else
    echo "⏭️  Skipping firewall configuration"
fi

echo ""
echo "=========================================="
echo "✅ VPS Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Make sure all GitHub Secrets are configured"
echo "2. Push your code to trigger automatic deployment"
echo "3. Your app will be available at: http://YOUR_VPS_IP:3000"
echo ""
echo "To check your deployment:"
echo "  cd ~/wpomalaza"
echo "  pm2 status"
echo "  pm2 logs wpomalaza"
echo ""
