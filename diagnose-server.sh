#!/bin/bash
# Server diagnostic script to troubleshoot deployment issues

echo "=== PM2 Status ==="
pm2 list
echo ""

echo "=== PM2 Process Details ==="
pm2 describe wpomalaza 2>/dev/null || echo "No wpomalaza process found"
echo ""

echo "=== Directory Structure ==="
echo "Main directories:"
ls -la ~ | grep wpomalaza
echo ""

echo "Deployment directory contents:"
if [ -d ~/wpomalaza_deploy ]; then
  echo "~/wpomalaza_deploy exists"
  ls -la ~/wpomalaza_deploy/
  echo ""
  echo "Standalone directory:"
  ls -la ~/wpomalaza_deploy/.next/standalone/ 2>/dev/null || echo "No standalone directory"
  echo ""
  echo "Static directory:"
  ls -la ~/wpomalaza_deploy/.next/standalone/.next/static/ 2>/dev/null || echo "No static directory"
else
  echo "~/wpomalaza_deploy does NOT exist"
fi
echo ""

echo "=== Server Process ==="
echo "Checking if Node.js is running on port 3000:"
lsof -i :3000 2>/dev/null || echo "Nothing running on port 3000"
echo ""

echo "=== Recent PM2 Logs ==="
pm2 logs wpomalaza --lines 20 --nostream 2>/dev/null || echo "No logs available"
echo ""

echo "=== Nginx/Apache Check ==="
if command -v nginx &> /dev/null; then
  echo "Nginx is installed"
  nginx -t 2>&1
  echo ""
  echo "Nginx config for wpomalaza:"
  cat /etc/nginx/sites-enabled/wpomalaza* 2>/dev/null || echo "No nginx config found"
elif command -v apache2 &> /dev/null; then
  echo "Apache is installed"
  apache2ctl -t 2>&1
else
  echo "No Nginx or Apache found"
fi
