'use strict';

const osmosis = require('osmosis');

module.exports.hackerNewsSubmit = (event, context, callback) => {
  if (!process.env.HACKER_NEWS_USERNAME) {
    return callback('Missing Hacker News username');
  }

  if (!process.env.HACKER_NEWS_PASSWORD) {
    return callback('Missing Hacker News password');
  }

  if (!event.title) {
    return callback('Missing title');
  }

  if (!event.url) {
    return callback('Missing URL');
  }

  osmosis
  .get('https://news.ycombinator.com/login')
  .login(process.env.HACKER_NEWS_USERNAME, process.env.HACKER_NEWS_PASSWORD)
  .get('https://news.ycombinator.com/submit')
  .submit('form', {
    title: event.title,
    url: event.url
  })
  .then(window => {
    callback(null, {html: window.document.body.innerHTML});
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log);
};
