# Heroku Deployment Guide - Workshop Companion App

This guide provides step-by-step instructions for deploying the Workshop Companion App to Heroku with SSR (Server-Side Rendering) support.

## Prerequisites

Before you begin, ensure you have:
- A Heroku account ([sign up here](https://signup.heroku.com/))
- Heroku CLI installed ([download here](https://devcenter.heroku.com/articles/heroku-cli))
- Git installed and project in a Git repository
- Node.js 18.17.0 or higher installed locally

## Step 1: Prepare Your Project

1. **Verify your project structure matches the requirements:**
   ```
   ├── package.json          # Contains heroku-postbuild script
   ├── Procfile              # Defines web process
   ├── next.config.js        # Next.js configuration
   ├── src/                  # Source code with Pages Router
   └── .env.local.example    # Environment variables template
   ```

2. **Ensure package.json has the correct scripts:**
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "heroku-postbuild": "npm run build"
     },
     "engines": {
       "node": ">=18.17.0"
     }
   }
   ```

3. **Verify the Procfile exists and contains:**
   ```
   web: npm start
   ```

## Step 2: Login to Heroku CLI

1. **Open your terminal and login to Heroku:**
   ```bash
   heroku login
   ```
   This will open a browser window for authentication.

2. **Verify your login:**
   ```bash
   heroku auth:whoami
   ```

## Step 3: Create a New Heroku App

1. **Create the app (replace `your-workshop-app` with your desired app name):**
   ```bash
   heroku create your-workshop-app
   ```

   **Note:** App names must be unique across all Heroku. If your preferred name is taken, try:
   - `workshop-companion-[your-name]`
   - `workshop-app-[random-number]`
   - `[your-company]-workshop-app`

2. **Verify the app was created:**
   ```bash
   heroku apps:info your-workshop-app
   ```

## Step 4: Configure Environment Variables

1. **Set production environment variables:**
   ```bash
   # Required variables
   heroku config:set NODE_ENV=production -a your-workshop-app
   heroku config:set NEXT_PUBLIC_APP_URL=https://your-workshop-app.herokuapp.com -a your-workshop-app
   heroku config:set NEXT_PUBLIC_API_URL=https://your-workshop-app.herokuapp.com/api -a your-workshop-app
   ```

2. **Optional: Set additional variables if needed:**
   ```bash
   # Database URL (if using a database)
   heroku config:set DATABASE_URL=your_database_url -a your-workshop-app

   # Session secret (if using sessions)
   heroku config:set SESSION_SECRET=$(openssl rand -hex 32) -a your-workshop-app
   ```

3. **Verify environment variables:**
   ```bash
   heroku config -a your-workshop-app
   ```

## Step 5: Add Heroku Remote to Git

1. **Add Heroku as a git remote:**
   ```bash
   heroku git:remote -a your-workshop-app
   ```

2. **Verify the remote was added:**
   ```bash
   git remote -v
   ```
   You should see both `origin` (your GitHub/GitLab repo) and `heroku` remotes.

## Step 6: Deploy to Heroku

1. **Ensure all changes are committed:**
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   ```

2. **Deploy to Heroku:**
   ```bash
   git push heroku main
   ```

   **If your default branch is `master`:**
   ```bash
   git push heroku master
   ```

3. **Monitor the deployment:**
   The deployment process will:
   - Install dependencies (`npm install`)
   - Run the build script (`npm run build`)
   - Start the application (`npm start`)

## Step 7: Verify Deployment

1. **Open your app in the browser:**
   ```bash
   heroku open -a your-workshop-app
   ```

2. **Check application logs:**
   ```bash
   heroku logs --tail -a your-workshop-app
   ```

3. **Verify the app is running:**
   ```bash
   heroku ps -a your-workshop-app
   ```

## Step 8: Set Up Custom Domain (Optional)

1. **Add a custom domain:**
   ```bash
   heroku domains:add your-domain.com -a your-workshop-app
   ```

2. **Get DNS target:**
   ```bash
   heroku domains -a your-workshop-app
   ```

3. **Update your DNS settings:**
   - Create a CNAME record pointing your domain to the Heroku DNS target
   - Update the `NEXT_PUBLIC_APP_URL` environment variable:
     ```bash
     heroku config:set NEXT_PUBLIC_APP_URL=https://your-domain.com -a your-workshop-app
     heroku config:set NEXT_PUBLIC_API_URL=https://your-domain.com/api -a your-workshop-app
     ```

## Step 9: Database Setup (If Required)

For production use with a database:

1. **Add Heroku Postgres addon:**
   ```bash
   heroku addons:create heroku-postgresql:mini -a your-workshop-app
   ```

2. **The DATABASE_URL will be automatically set by the addon**

3. **Run database migrations (if you have them):**
   ```bash
   heroku run npm run db:migrate -a your-workshop-app
   ```

## Troubleshooting

### Common Issues and Solutions

1. **Build fails with "Module not found" errors:**
   - Check that all dependencies are in `dependencies`, not `devDependencies`
   - Verify import paths use the `@/` alias correctly

2. **App crashes on startup:**
   ```bash
   heroku logs --tail -a your-workshop-app
   ```
   - Check for environment variable issues
   - Ensure Next.js is configured for production

3. **Environment variables not working:**
   - Verify variables are set: `heroku config -a your-workshop-app`
   - Remember: client-side variables must start with `NEXT_PUBLIC_`

4. **Slow cold starts:**
   - This is normal for free tier Heroku apps
   - Consider upgrading to Hobby tier for better performance

### Useful Heroku Commands

```bash
# View app info
heroku apps:info your-workshop-app

# Scale dynos
heroku ps:scale web=1 -a your-workshop-app

# Restart the app
heroku restart -a your-workshop-app

# Access the Heroku console
heroku run bash -a your-workshop-app

# View real-time logs
heroku logs --tail -a your-workshop-app

# Check dyno status
heroku ps -a your-workshop-app
```

## Updating Your Deployment

To deploy updates:

1. **Make your changes and commit them:**
   ```bash
   git add .
   git commit -m "Your update message"
   ```

2. **Push to Heroku:**
   ```bash
   git push heroku main
   ```

3. **Monitor the deployment:**
   ```bash
   heroku logs --tail -a your-workshop-app
   ```

## Performance Optimization

1. **Enable compression in next.config.js:**
   ```javascript
   const nextConfig = {
     compress: true,
     // ... other config
   };
   ```

2. **Consider upgrading to Hobby tier ($7/month):**
   ```bash
   heroku ps:type hobby -a your-workshop-app
   ```

3. **Monitor performance:**
   ```bash
   heroku logs --tail -a your-workshop-app | grep "request"
   ```

## Security Considerations

1. **Never commit sensitive environment variables**
2. **Use Heroku config vars for all secrets**
3. **Enable HTTPS redirect in production**
4. **Regularly update dependencies**

## Support

- [Heroku Documentation](https://devcenter.heroku.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)

---

**Your app should now be live at:** `https://your-workshop-app.herokuapp.com`

Remember to replace `your-workshop-app` with your actual Heroku app name throughout this guide.