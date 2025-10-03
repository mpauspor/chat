import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Usa la URL del webhook de n8n desde env o el valor por defecto
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://iese.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat";

app.use(express.json());
app.use(express.static("public"));

// Salud
app.get("/healthz", (_req, res) => {
  res.json({ ok: true, webhookConfigured: !!N8N_WEBHOOK_URL });
});

// Proxy simple → n8n webhook
app.post("/api/chat", async (req, res) => {
  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json().catch(() => ({ reply: "(respuesta no JSON desde n8n)" }));
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(502).json({ error: "No se pudo contactar con n8n" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
