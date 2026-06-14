import "dotenv/config";
import express from "express";
import { corsConfig } from "./config/cors";
import cors from "cors";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import routerAuth from "./routes/auth.routes";
import router from "./routes/user.routes";
import routerAnalytics from "./routes/analytics.routes";
import helmet from "helmet";
import apiLimiter from "./config/rateLimit";

// Connect to the database MongoDB
connectDB();

const app = express();

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS
app.use(cors(corsConfig));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Secure the app by setting various HTTP headers
app.use(helmet());

// Rate limiter
app.use("/", apiLimiter);

// Define the routes
app.use("/api", routerAuth);
app.use("/api", router);
app.use("/api", routerAnalytics);

// Global error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack || err);
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;
