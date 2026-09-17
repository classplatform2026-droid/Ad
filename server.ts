import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  getDbStatus,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getScrollingNotice,
  updateScrollingNotice,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "./server/db";
import {
  getCloudinaryStatus,
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./server/cloudinary";

dotenv.config({ override: true });

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// =====================================
// API ROUTES FIRST (BEFORE VITE/STATIC)
// =====================================

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Database Connection Status
app.get("/api/db-status", async (req, res) => {
  try {
    const status = await getDbStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Products API
app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Categories API
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const created = await createCategory(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Blogs API
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await createBlog(req.body);
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  try {
    const updated = await updateBlog(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await deleteBlog(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Hero Banners / Slider API
app.get("/api/banners", async (req, res) => {
  try {
    const banners = await getBanners();
    res.json(banners);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/banners", async (req, res) => {
  try {
    const banner = await createBanner(req.body);
    res.status(201).json(banner);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/banners/:id", async (req, res) => {
  try {
    const banner = await updateBanner(req.params.id, req.body);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(banner);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/banners/:id", async (req, res) => {
  try {
    await deleteBanner(req.params.id);
    res.json({ success: true, message: "Banner deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5.1 Scrolling Notice Bar API
app.get("/api/scrolling-notice", async (req, res) => {
  try {
    const notice = await getScrollingNotice();
    res.json(notice);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/scrolling-notice", async (req, res) => {
  try {
    const updated = await updateScrollingNotice(req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5.2 Testimonials (Customer satisfaction reviews) API
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await getTestimonials();
    res.json(testimonials);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/testimonials", async (req, res) => {
  try {
    const created = await createTestimonial(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/testimonials/:id", async (req, res) => {
  try {
    const updated = await updateTestimonial(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    const success = await deleteTestimonial(req.params.id);
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Orders API
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    await deleteOrder(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Cloudinary Upload & Status API
app.get("/api/cloudinary/status", (req, res) => {
  try {
    const status = getCloudinaryStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const { image, folder } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image data is required" });
    }

    const status = getCloudinaryStatus();
    if (!status.configured) {
      // If Cloudinary credentials are not set yet, return the image data URL
      // with a transparent indicator so testing/upload doesn't crash
      return res.json({
        url: image,
        public_id: `temp_${Date.now()}`,
        source: 'preview_only',
        warning: 'CLOUDINARY_API_KEY / CLOUDINARY_CLOUD_NAME is not set in Settings > Secrets. Stored as direct preview.',
      });
    }

    const uploadResult = await uploadToCloudinary(image, folder || 'products');
    res.json({
      url: uploadResult.url,
      public_id: uploadResult.public_id,
      source: 'cloudinary',
    });
  } catch (err: any) {
    console.error('[Cloudinary Upload Route] Error:', err);
    res.status(500).json({
      error: err.message || 'Failed to upload image to Cloudinary',
    });
  }
});

app.delete("/api/upload/:public_id", async (req, res) => {
  try {
    const success = await deleteFromCloudinary(req.params.public_id);
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================
// FRONTEND MIDDLEWARE (VITE OR STATIC)
// =====================================
async function startServer() {
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
    console.log(`[Kasab Gallery Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
