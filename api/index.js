import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers.js";

const app = express();

app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🔥 핵심 (이거 추가)
export default function handler(req, res) {
  return app(req, res);
}
