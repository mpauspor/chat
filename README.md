# Chat → n8n (Railway)

Pequeña app que sirve una web de chat y reenvía los mensajes al webhook de n8n vía proxy en el servidor.

## Despliegue rápido en Railway

1. **Descarga** este proyecto y súbelo a un repo (o deploy directo desde ZIP).
2. En Railway, crea un nuevo proyecto → **Deploy from GitHub** (o desde el ZIP).
3. En **Variables** del servicio, añade:
   - `N8N_WEBHOOK_URL` = `https://iese.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat` (puedes cambiarlo cuando quieras).
4. Railway detectará Node.js y ejecutará `npm install` y `npm start`.
5. Abre la URL pública del servicio. Verás la UI de chat en `/`.
6. Comprueba `/healthz` para validar que la variable está cargada.

## Desarrollo local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Formato esperado de n8n

Este front envía:
```json
{"message":"hola","sessionId":"<uuid>"}
```

Y espera **cualquier** JSON que contenga:
```json
{"reply":"texto de respuesta"}
```
o
```json
{"data":{"reply":"texto de respuesta"}}
```

El proxy devuelve tal cual el JSON de n8n.
