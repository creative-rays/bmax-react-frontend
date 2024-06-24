const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/wp-json/bmaxapi',
    createProxyMiddleware({
      target: 'https://swapit.codemelodies.com',
      changeOrigin: true,
      pathRewrite: {
        '^/wp-json/bmaxapi': '/wp-json/bmaxapi',
      },
    })
  );
};
