import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Data persistence paths
  const MESSAGES_FILE = path.join(__dirname, "messages.json");
  const PRODUCTS_FILE = path.join(__dirname, "products.json");

  // Ensure data files exist
  const ensureFile = async (filePath: string, initialData: any) => {
    try {
      await fs.access(filePath);
      const content = await fs.readFile(filePath, "utf-8");
      if (content === "[]" && initialData.length > 0) {
        await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
      }
    } catch {
      await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
    }
  };

  // Import initial products from constants
  const INITIAL_PRODUCTS = [
    {
      id: 'tea-1',
      name: 'شاي خطاري',
      category: 'tea',
      prices: { '200g': 28, '500g': 55, '1kg': 100, '2kg': 200 },
      description: 'شاي صحراوي أصيل يتميز بنكهة قوية ولون ذهبي جذاب، يعتبر الخيار الأول لعشاق الشاي المركز.',
      image: 'https://i.ibb.co/ksL6zY3r/Luxury-commercial-product-202604121642.jpg',
      secondaryImage: 'https://i.ibb.co/xKG90gS4/Luxury-cinematic-commercial-202604121642.jpg',
      features: ['نكهة قوية', 'لون ذهبي', 'طبيعي 100%']
    },
    // ... adding a few more for the initial state
  ];

  await ensureFile(MESSAGES_FILE, []);
  await ensureFile(PRODUCTS_FILE, []);

  // API Routes
  app.get("/api/messages", async (req, res) => {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/messages", async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Received message request from IP:", ip, req.body);
    try {
      const data = await fs.readFile(MESSAGES_FILE, "utf-8");
      const messages = JSON.parse(data);
      const newMessage = {
        id: Date.now().toString(),
        ...req.body,
        ip: ip, // Use server-side IP
        timestamp: new Date().toISOString()
      };
      messages.push(newMessage);
      await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
      console.log("Message saved successfully:", newMessage.id);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.patch("/api/messages/:id", async (req, res) => {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    let messages = JSON.parse(data);
    messages = messages.map((m: any) => 
      m.id === req.params.id ? { ...m, ...req.body } : m
    );
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    res.json({ success: true });
  });

  app.get("/api/products", async (req, res) => {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/products", async (req, res) => {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products = JSON.parse(data);
    const newProduct = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  });

  app.patch("/api/products/:id", async (req, res) => {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    let products = JSON.parse(data);
    products = products.map((p: any) => 
      p.id === req.params.id ? { ...p, ...req.body } : p
    );
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.json({ success: true });
  });

  app.delete("/api/products/:id", async (req, res) => {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    let products = JSON.parse(data);
    products = products.filter((p: any) => p.id !== req.params.id);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.json({ success: true });
  });

  // Analytics routes
  const VISITS_FILE = path.join(__dirname, "visits.json");
  const CLICKS_FILE = path.join(__dirname, "clicks.json");
  await ensureFile(VISITS_FILE, []);
  await ensureFile(CLICKS_FILE, []);

  app.get("/api/stats/visits", async (req, res) => {
    const data = await fs.readFile(VISITS_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/stats/visits", async (req, res) => {
    const data = await fs.readFile(VISITS_FILE, "utf-8");
    const visits = JSON.parse(data);
    visits.push({ ...req.body, timestamp: new Date().toISOString() });
    await fs.writeFile(VISITS_FILE, JSON.stringify(visits.slice(-500), null, 2));
    res.status(201).json({ success: true });
  });

  app.get("/api/stats/clicks", async (req, res) => {
    const data = await fs.readFile(CLICKS_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/stats/clicks", async (req, res) => {
    const data = await fs.readFile(CLICKS_FILE, "utf-8");
    const clicks = JSON.parse(data);
    clicks.push({ ...req.body, timestamp: new Date().toISOString() });
    await fs.writeFile(CLICKS_FILE, JSON.stringify(clicks.slice(-500), null, 2));
    res.status(201).json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
