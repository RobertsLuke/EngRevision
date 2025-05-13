@echo off
echo Simple deploy script for GitHub Pages

git add .
git commit -m "Update for GitHub Pages deployment"
git push origin master

echo Done! Check GitHub Actions at: https://github.com/RobertsLuke/EngRevision/actions
echo The site should be available at: https://robertsluke.github.io/EngRevision/
pause
