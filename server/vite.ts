import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const viteServer = await createViteServer({
    configFile: path.resolve(process.cwd(), 'vite.config.ts'), 
    server: { 
      middlewareMode: true,
      hmr: {
        server
      },
      allowedHosts: true
    },
    appType: 'custom'
  });

  app.use(viteServer.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await viteServer.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      viteServer.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Use the correct build output directory from Vite
  const distPath = path.resolve(process.cwd(), "dist/public");
  
  if (!fs.existsSync(distPath)) {
    console.warn(`Build directory not found at ${distPath}, falling back to server/public`);
    // Fallback to server/public if dist/public doesn't exist
    const fallbackPath = path.resolve(process.cwd(), "server/public");
    
    if (!fs.existsSync(fallbackPath)) {
      throw new Error(
        `Could not find any static files directory. Please build the client first with 'npm run build'`,
      );
    }
    
    // Serve static files from fallback path
    app.use(express.static(fallbackPath));
    
    // SPA fallback route for client-side routing
    app.use("*", (_req, res) => {
      const indexPath = path.resolve(fallbackPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not properly built. Run 'npm run build' first.");
      }
    });
    
    return;
  }
  
  // Serve static files from dist/public
  app.use(express.static(distPath));
  
  // SPA fallback route for client-side routing
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
