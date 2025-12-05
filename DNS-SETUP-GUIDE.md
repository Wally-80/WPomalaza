# DNS Setup Guide for wpomalaza.com on Vercel

## Current Status
Your domains are added to Vercel but showing "Invalid Configuration" because DNS records need to be updated.

## DNS Records to Add

Based on Vercel's configuration, you need to update these DNS records at your domain registrar (where you bought wpomalaza.com - could be Hostinger, GoDaddy, Namecheap, etc.):

### For wpomalaza.com (root domain):
```
Type:  A
Name:  @ (or leave blank, or type "wpomalaza.com")
Value: 216.198.79.1
TTL:   Automatic (or 3600)
```

**Note:** Vercel shows this is the NEW IP address. The old `76.76.21.21` will still work but they recommend the new one.

### For www.wpomalaza.com:
```
Type:  CNAME
Name:  www
Value: 4d706ac2a0bde37e.vercel-dns-017.com.
TTL:   Automatic (or 3600)
```

**Important:** Make sure to include the trailing dot (`.`) at the end of the CNAME value!

## Where to Update DNS Records

### If your domain is registered with Hostinger:
1. Log into Hostinger control panel (hpanel.hostinger.com)
2. Go to **Domains** → Click on **wpomalaza.com**
3. Click **DNS / Name Servers**
4. Look for existing A and CNAME records and update them, or add new ones
5. **Delete any old records** pointing to Hostinger servers

### If your domain is elsewhere (GoDaddy, Namecheap, etc.):
1. Log into your domain registrar
2. Find DNS Management / DNS Settings
3. Update or add the records above
4. Save changes

## Important Steps:

### 1. Remove Old DNS Records
Delete any existing A or CNAME records for:
- `@` or root domain
- `www`
- Any records pointing to Hostinger IP addresses

### 2. Add New Vercel Records
Add the exact records shown above from Vercel

### 3. Wait for Propagation
- DNS changes can take 5 minutes to 48 hours
- Usually takes 15-30 minutes
- You can check status at: https://dnschecker.org/#A/wpomalaza.com

### 4. Verify in Vercel
- Once DNS propagates, Vercel will automatically:
  - Verify domain ownership
  - Provision SSL certificates (HTTPS)
  - Remove "Invalid Configuration" status
  - Make your site live!

## Troubleshooting

**If domains stay "Invalid" after 1 hour:**
1. Double-check DNS records match exactly (especially the CNAME trailing dot)
2. Ensure old Hostinger DNS records are deleted
3. Check if name servers are pointing to your registrar (not Hostinger name servers)

**Check your current DNS:**
- Run: `nslookup wpomalaza.com`
- Should show the new Vercel IP: `216.198.79.1`

## Expected Timeline

- **0-5 min:** DNS records updated at registrar
- **5-30 min:** DNS propagates globally
- **30-60 min:** Vercel verifies and provisions SSL
- **1+ hours:** Site fully live on wpomalaza.com with HTTPS!

---

Once DNS is configured, your site will be live with:
✅ Automatic HTTPS
✅ Global CDN
✅ Zero downtime deployments
✅ No more 404 errors!
