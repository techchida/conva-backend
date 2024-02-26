const whitelist = {
  development: [
    "undefined",
    undefined,
    "http://localhost:3000",
    "http://127.0.0.1:5500",
  ],
  production: ["https://getife.com"],
};

module.exports = {
  origin: true,
  //function (origin, callback) {
  //   if (whitelist[process.env.ENV].indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Origin Not allowed by CORS : " + origin));
  //   }
  // },
  methods: ["POST", "PUT", "GET", "DELETE", "HEAD"],
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, access_key",
};
