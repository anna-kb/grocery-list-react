echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy'


git push -f git@github.com:anna-kb/grocery-list-react.git main:gh-pages
cd -