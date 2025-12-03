# Deployment Guide - Hostinger VPS with GitHub Actions

This guide will help you deploy your Next.js application to Hostinger VPS automatically via GitHub.

## Prerequisites

1. A Hostinger VPS account with SSH access
2. GitHub repository for your project
3. Node.js and npm installed on your VPS
4. PM2 installed on your VPS (process manager for Node.js)

## VPS Setup (One-Time Configuration)

### 1. Connect to Your Hostinger VPS

```bash
ssh your_username@your_vps_ip
```

### 2. Install Node.js (if not already installed)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install PM2 Globally

```bash
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions that appear
```

### 4. Create Deployment Directory

```bash
# Create directory for your application
mkdir -p /home/your_username/wpomalaza
cd /home/your_username/wpomalaza
```

### 5. Create Environment File

Create a `.env.local` file in your deployment directory:

```bash
nano /home/your_username/wpomalaza/.env.local
```

Add your environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## GitHub Repository Setup

### 1. Push Your Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/wpomalaza.git

# Push to GitHub
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository:
1. Click on **Settings**
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `VPS_HOST` | Your VPS IP address | Example: `123.45.67.89` |
| `VPS_USERNAME` | Your SSH username | Example: `root` or `your_username` |
| `VPS_PASSWORD` | Your SSH password | Your VPS login password |
| `VPS_PORT` | SSH port | Usually `22` |
| `VPS_TARGET_PATH` | Deployment path | Example: `/home/your_username/wpomalaza` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Your Supabase anonymous key |

### 3. Alternative: Using SSH Key (More Secure)

Instead of password authentication, you can use SSH keys:

**On your VPS:**
```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "github-actions"

# Add the public key to authorized_keys
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Display the private key (copy this for GitHub)
cat ~/.ssh/id_ed25519
```

**In GitHub:**
- Replace `VPS_PASSWORD` secret with `VPS_SSH_KEY`
- Paste the private key content

**Update the workflow file** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):
- Replace `password: ${{ secrets.VPS_PASSWORD }}`
- With `key: ${{ secrets.VPS_SSH_KEY }}`

## Nginx Configuration (Optional but Recommended)

### 1. Install Nginx

```bash
sudo apt update
sudo apt install nginx
```

### 2. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/wpomalaza
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/wpomalaza /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 4. Setup SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## Deployment Process

### Automatic Deployment

Once everything is set up, deployment happens automatically:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions will automatically:
   - Build your application
   - Deploy to your VPS
   - Restart the application with PM2

### Manual Deployment

You can also trigger deployment manually:
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Deploy to Hostinger VPS** workflow
4. Click **Run workflow**

## Monitoring and Troubleshooting

### Check Application Status

```bash
# SSH into your VPS
ssh your_username@your_vps_ip

# Check PM2 status
pm2 status

# View application logs
pm2 logs wpomalaza

# View last 100 lines of logs
pm2 logs wpomalaza --lines 100
```

### Common Commands

```bash
# Restart application
pm2 restart wpomalaza

# Stop application
pm2 stop wpomalaza

# Start application
pm2 start wpomalaza

# View detailed info
pm2 info wpomalaza

# Monitor CPU and memory
pm2 monit
```

### Troubleshooting Build Errors

If the GitHub Action fails:
1. Check the **Actions** tab in your GitHub repository
2. Click on the failed workflow run
3. Review the error messages
4. Common issues:
   - Missing environment variables
   - SSH connection problems
   - Build errors (check your code)
   - Insufficient VPS resources

### Update Environment Variables

```bash
# SSH into VPS
ssh your_username@your_vps_ip

# Edit environment file
nano /home/your_username/wpomalaza/.env.local

# Restart application
pm2 restart wpomalaza
```

## Testing the Deployment

1. Visit your VPS IP address or domain: `http://your-vps-ip:3000`
2. If using Nginx: `http://your-domain.com`
3. Check that all features work correctly
4. Monitor logs for any errors

## Rollback (If Needed)

If something goes wrong:

```bash
# SSH into VPS
ssh your_username@your_vps_ip

# View previous PM2 processes
pm2 list

# Or manually git checkout previous version
cd /home/your_username/wpomalaza
git log  # Find the commit hash
git checkout <previous-commit-hash>
npm install
npm run build
pm2 restart wpomalaza
```

## Performance Optimization

### Enable PM2 Clustering

```bash
# Stop current process
pm2 stop wpomalaza
pm2 delete wpomalaza

# Start with cluster mode (uses all CPU cores)
pm2 start npm --name "wpomalaza" -i max -- start

# Save configuration
pm2 save
```

### Monitor Resource Usage

```bash
# Real-time monitoring
pm2 monit

# Or use htop
sudo apt install htop
htop
```

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check PM2 logs: `pm2 logs wpomalaza`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Verify SSH connection manually
5. Ensure all secrets are correctly configured in GitHub

## Next Steps

- [ ] Set up automated backups
- [ ] Configure monitoring with PM2 Plus or similar
- [ ] Set up staging environment
- [ ] Configure CDN (like Cloudflare) for better performance
- [ ] Set up database backups (if applicable)
