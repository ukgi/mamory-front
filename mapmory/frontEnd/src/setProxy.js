const { createProxyMiddleware } = require("http-proxy-middleware");

// 프론트에서 /api 요청을 보내면 백앤드 8080포트로 요청 도착
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
