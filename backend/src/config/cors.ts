import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [];
    whiteList.push(process.env.FRONTEND_URL);
    whiteList.push("http://localhost:5173");

    if (process.argv[2] === "--api") whiteList.push(undefined); // npm run dev --api

    if (whiteList.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};
