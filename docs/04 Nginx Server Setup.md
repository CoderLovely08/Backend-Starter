# Server Setup Guide for Node.js (and Other Backend) Applications

This guide walks you through configuring **Nginx** as a reverse proxy for your **Node.js** (or any backend) application, and securing it with **SSL/TLS using Certbot**.

---

## Prerequisites

Before you begin:

* You have a **server** running Ubuntu/Debian.
* You have **sudo access** to install and configure software.
* Your **domain or subdomain** is pointed to your server’s IP address (via DNS A record).
* Your **application** (Node.js, Flask, Django, etc.) is running on a local port (e.g. `localhost:4000`).

---

## Step 1: Install Nginx

1. **Update packages and install Nginx:**

   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Start and enable Nginx:**

   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

3. **Verify Nginx is running:**

   ```bash
   sudo systemctl status nginx
   ```

**Check:**
Open your server’s public IP in a browser (e.g. `http://your-server-ip`) — you should see the **Nginx welcome page**, confirming that Nginx is up and running.

---

## Step 2: Configure Nginx as a Reverse Proxy

1. **Create a new configuration file** for your domain or subdomain:

   ```bash
   sudo nano /etc/nginx/sites-available/subdomain.example.com
   ```

2. **Add the following configuration** (modify the `server_name` and `proxy_pass` port accordingly):

   ```nginx
   server {
       listen 80;
       server_name subdomain.example.com;

       location / {
           proxy_pass http://localhost:4000;  # Change 4000 to your backend port
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the configuration:**

   ```bash
   sudo ln -s /etc/nginx/sites-available/subdomain.example.com /etc/nginx/sites-enabled/
   ```

4. **Test the Nginx configuration:**

   ```bash
   sudo nginx -t
   ```

   ✅ If you see “**syntax is ok**” and “**test is successful**”, proceed.

5. **Restart Nginx to apply changes:**

   ```bash
   sudo systemctl restart nginx
   ```

**Check:**
Visit `http://subdomain.example.com` — you should see your backend application running through Nginx.

---

## Step 3: Enable SSL/TLS with Certbot

1. **Install Certbot and its Nginx plugin:**

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain and install an SSL certificate for your domain:**

   ```bash
   sudo certbot --nginx -d subdomain.example.com
   ```

3. **Verify auto-renewal setup:**

   ```bash
   sudo systemctl status certbot.timer
   ```

4. **Simulate renewal (optional, to confirm configuration):**

   ```bash
   sudo certbot renew --dry-run
   ```

**Certbot automatically:**

* Updates your Nginx configuration to listen on port **443**
* Sets up HTTP → HTTPS redirection
* Handles SSL certificate renewal automatically

---

## Troubleshooting

* **Port 80 or 443 already in use:**
  Stop any conflicting services (like Apache) before starting Nginx.

  ```bash
  sudo systemctl stop apache2
  ```

* **DNS not resolving:**
  Make sure your domain’s A record points to your server’s IP.

* **Firewall blocking ports:**
  Allow HTTP and HTTPS traffic:

  ```bash
  sudo ufw allow 'Nginx Full'
  ```

---

## Summary

| Task          | Command                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| Install Nginx | `sudo apt install nginx -y`                                              |
| Create config | `sudo nano /etc/nginx/sites-available/domain`                            |
| Enable site   | `sudo ln -s /etc/nginx/sites-available/domain /etc/nginx/sites-enabled/` |
| Restart Nginx | `sudo systemctl restart nginx`                                           |
| Setup SSL     | `sudo certbot --nginx -d domain.com`                                     |

---

## Pro Tip

If you prefer an automated approach, try the **web-based tool** version:
👉 [**Nginx Setup Generator**](https://nginx-setup-tool.vercel.app/)

It will generate all commands and configuration blocks for your domain instantly.

---

## 🧑‍💻 Author

**Lovely Sharma**
[GitHub: @CoderLovely08](https://github.com/CoderLovely08)

