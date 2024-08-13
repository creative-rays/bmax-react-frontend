const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/wp-json/bmaxapi/v1/connect',
        createProxyMiddleware({
            target: 'https://swapit.codemelodies.com',
            changeOrigin: true,
            secure: false,
        })
    );
};
