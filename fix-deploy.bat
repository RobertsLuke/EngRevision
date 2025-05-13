@echo off
echo Deploying with simpler approach (peaceiris/actions-gh-pages)

git add .
git commit -m "Fix GitHub Pages deployment with comprehensive debugging"
git push origin master

echo.
echo Pushed changes to GitHub. Check the Actions tab for build progress:
echo https://github.com/RobertsLuke/EngRevision/actions
echo.
echo Once deployed, your site will be available at:
echo https://robertsluke.github.io/EngRevision/
echo.
echo If deployment fails, check the GitHub Actions logs for detailed error messages.
pause
