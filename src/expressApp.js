import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

const app = new Express();

app.use((req, res, next) => {

  webpackIsomorphicTools.refresh();
  const assets = webpackIsomorphicTools.assets();
  const js = assets.javascript.main;
  const cssLinks =  () => {
            return Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen, projection"
                        rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}();

  const html = `
    <!doctype html>
      <head>
          ${cssLinks}
      </head>
    <html>
      <div id="content"></div>
      <script src=${js} type="text/javascript"></script>
    </html>
  `;

  res.send(html);

  next();
});


export default app;