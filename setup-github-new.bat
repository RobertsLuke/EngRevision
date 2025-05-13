@echo off
echo Setting up Git for your English GCSE Revision App...

echo Initializing Git repository...
git init

echo Adding all files to Git...
git add .

echo Creating initial commit...
git commit -m "Initial commit of English GCSE Revision App"

echo.
echo Now we need to connect to your GitHub repository.
echo Please make sure you've created a repository named "EngRevision" on GitHub.
echo.
set /p username=Enter your GitHub username: 

echo.
echo Adding remote repository...
git remote add origin https://github.com/%username%/EngRevision.git

echo.
echo Pushing to GitHub...
git push -u origin main || git push -u origin master

echo.
echo Setting up GitHub Pages...
echo.
echo Creating gh-pages configuration file...

mkdir -p .github\workflows

echo ^
name: Deploy to GitHub Pages^

on:^

  push:^

    branches: ['main']^

^

  workflow_dispatch:^

^

permissions:^

  contents: read^

  pages: write^

  id-token: write^

^

concurrency:^

  group: "pages"^

  cancel-in-progress: true^

^

jobs:^

  deploy:^

    environment:^

      name: github-pages^

      url: ${{ steps.deployment.outputs.page_url }}^

    runs-on: ubuntu-latest^

    steps:^

      - name: Checkout^

        uses: actions/checkout@v4^

      - name: Set up Node^

        uses: actions/setup-node@v3^

        with:^

          node-version: 18^

          cache: 'npm'^

      - name: Install dependencies^

        run: npm install^

      - name: Build^

        run: npm run build^

      - name: Setup Pages^

        uses: actions/configure-pages@v3^

      - name: Upload artifact^

        uses: actions/upload-pages-artifact@v2^

        with:^

          path: './dist'^

      - name: Deploy to GitHub Pages^

        id: deployment^

        uses: actions/deploy-pages@v2 > .github\workflows\deploy.yml

echo.
echo Your project has been pushed to GitHub!
echo.
echo The GitHub Actions workflow for GitHub Pages deployment has been set up.
echo Your site will be available at: https://%username%.github.io/EngRevision/
echo.
pause
