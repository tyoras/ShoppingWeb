rm -rf dist
cp -R ../dist/prod dist
docker build -t tyoras/shopping_nginx:$1 .
