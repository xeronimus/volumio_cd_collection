# VOLUMIO CUSTOM PLAYER UI


based on https://github.com/KleoPetroff/react-webpack-boilerplate 

## run dev server

At the moment, favorites are read from a gist. Thus a github access token is needed. 
Run the dev-server like follows: ```npm start -- --env.gitHubAccessToken=XXXXXXXXXXXXXXXXXXXXX```

## build

At the moment, favorites are read from a gist. Thus a github access token is needed. 
Build the app like follows: ```npm run build -- --env.gitHubAccessToken=XXXXXXXXXXXXXXXXXXXXX```

## Debugging Volumio

you can ssh into volumio and run ```sudo journalctl -f```
