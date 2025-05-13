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
echo Please make sure you've created a repository named "Eng" on GitHub.
echo.
set /p username=Enter your GitHub username: 

echo.
echo Adding remote repository...
git remote add origin https://github.com/%username%/Eng.git

echo.
echo Pushing to GitHub...
git push -u origin main || git push -u origin master

echo.
echo Your project has been pushed to GitHub!
echo.
echo Remember to configure GitHub Pages in your repository settings:
echo 1. Go to https://github.com/%username%/Eng/settings/pages
echo 2. In the "Build and deployment" section, select:
echo    - Source: "GitHub Actions"
echo.
echo Your site will be available at: https://%username%.github.io/Eng/
echo.
pause
