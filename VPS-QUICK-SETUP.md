# Quick VPS Setup Guide

Your deployment is almost working! The files are being deployed successfully, but Node.js and PM2 need to be installed on your VPS first.

## Quick Fix (Choose One Method)

### Method 1: Automated Setup Script (Easiest) ⭐

1. **SSH into your VPS:**
   ```bash
   ssh your_username@your_vps_ip
   ```

2. **Download and run the setup script:**
   ```bash
   curl -o- https://raw.githubusercontent.com/Wally-80/WPomalaza/main/vps-setup.sh | bash
   ```

   Or if you prefer to review it first:
   ```bash
   wget https://raw.githubusercontent.com/Wally-80/WPomalaza/main/vps-setup.sh
   chmod +x vps-setup.sh
   ./vps-setup.sh
   ```

3. **That's it!** Re-run your GitHub Actions workflow.

---

### Method 2: Manual Setup

SSH into your VPS and run these commands:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Verify installation
node --version
npm --version

# 4. Install PM2 globally
sudo npm install -g pm2

# 5. Setup PM2 to start on boot
pm2 startup

# 6. Create deployment directory
mkdir -p ~/wpomalaza
```

---

## After Setup

Once Node.js and PM2 are installed:

1. **Go to GitHub Actions:**
   https://github.com/Wally-80/WPomalaza/actions

2. **Re-run the failed workflow:**
   - Click on the latest workflow run
   - Click "Re-run all jobs" (top right)

3. **Monitor the deployment:**
   - All steps should pass this time ✅
   - Your app will be deployed to `~/wpomalaza`
   - PM2 will start your Next.js application

4. **Access your app:**
   ```
   http://YOUR_VPS_IP:3000
   ```

---

## Verify Deployment

SSH into your VPS and check:

```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs wpomalaza

# Check if the app is running
curl http://localhost:3000
```

---

## Troubleshooting

### If the app doesn't start:

```bash
# Go to deployment directory
cd ~/wpomalaza

# Check if files are there
ls -la

# Try starting manually
npm install
npm run build
npm start
```

### Check PM2 logs:
```bash
pm2 logs wpomalaza --lines 50
```

### Restart the app:
```bash
pm2 restart wpomalaza
```

---

## Optional: Setup Nginx (Recommended)

After the app is working on port 3000, set up Nginx as a reverse proxy:

```bash
# Install Nginx
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/wpomalaza

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com;  # or use your VPS IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/wpomalaza /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Now your app will be accessible at `http://YOUR_VPS_IP` (without port 3000)!

---

## Need Help?

Common issues:
- **Permission denied**: Make sure you're using the correct username
- **npm not found**: Run the Node.js installation command again
- **Port already in use**: Check if another process is using port 3000
- **Build errors**: Check the GitHub Actions logs for details

For detailed documentation, see [DEPLOYMENT.md](DEPLOYMENT.md)
