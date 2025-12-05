#!/bin/bash
# Migration script to transition from old deployment structure to new release-based structure
# This should be run ONCE on the server to clean up the old deployment

set -e

echo "Starting deployment migration..."

# Stop the old PM2 process
echo "Stopping existing PM2 process..."
pm2 stop wpomalaza || true
pm2 delete wpomalaza || true

# Backup old deployment if it exists
if [ -d ~/wpomalaza/.next ] && [ ! -L ~/wpomalaza/.next ]; then
  echo "Backing up old deployment..."
  BACKUP_DIR=~/wpomalaza_backup_$(date +%Y%m%d_%H%M%S)
  mkdir -p "$BACKUP_DIR"
  mv ~/wpomalaza/.next "$BACKUP_DIR/" 2>/dev/null || true
  mv ~/wpomalaza/public "$BACKUP_DIR/" 2>/dev/null || true
  mv ~/wpomalaza/package.json "$BACKUP_DIR/" 2>/dev/null || true
  mv ~/wpomalaza/package-lock.json "$BACKUP_DIR/" 2>/dev/null || true
  mv ~/wpomalaza/next.config.ts "$BACKUP_DIR/" 2>/dev/null || true
  echo "Old deployment backed up to: $BACKUP_DIR"
fi

# Clean up old structure
echo "Cleaning up old deployment structure..."
rm -rf ~/wpomalaza/.next
rm -rf ~/wpomalaza/public
rm -rf ~/wpomalaza/node_modules
rm -f ~/wpomalaza/package.json
rm -f ~/wpomalaza/package-lock.json
rm -f ~/wpomalaza/next.config.ts

# Create new directory structure
echo "Creating new release-based directory structure..."
mkdir -p ~/wpomalaza/releases
mkdir -p ~/wpomalaza/logs

echo "Migration complete!"
echo ""
echo "Next steps:"
echo "1. The next deployment will automatically create the first release"
echo "2. The PM2 process will be started with the new ecosystem config"
echo ""
echo "You can now trigger a new deployment from GitHub Actions"
