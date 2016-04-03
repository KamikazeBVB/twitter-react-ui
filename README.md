# Twitter client example using react (playing around);

Repo inspired from https://github.com/erikras/react-redux-universal-hot-example

In order to run the project you should first install node v4.1.x or higher
then run.
npm install

//runs the prject under dev settings
npm run dev

//runs the project in prod settings (not really supported yet)
npm run build
npm run start

//runs all tests
npm lint
npm test
```

Twitter does not offer CORS and as such you will need a small proxy server to get the data 
that should be displayed. I have used the following one: 

https://github.com/leftlogic/twitter-proxy

You should run this server (or something similar) and point the twitterBaseProxyUrl found
in config.js to your server.

For any questions please feel free to send me a message on github.

Cheers,
Lau