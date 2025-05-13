@echo off
echo Deploying GCSE English Revision App to GitHub Pages...

echo Adding all files to Git...
git add .

echo Creating commit...
git commit -m "Fix GitHub Pages deployment with correct MIME types"

echo Pushing to GitHub (master branch)...
git push origin master

echo Done! The GitHub Actions workflow should now be running.
echo Check your repository's Actions tab for progress.
echo Your site will be available at: https://robertsluke.github.io/EngRevision/
pause
