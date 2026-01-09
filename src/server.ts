import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { getPairConversion, getSupportedCodes } from "./api/cambioApi.js";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./docs/swagger.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   name: exchange
 *   description: Realiza conversão de moedas
 * parameters:
 *   - in: body
 *     name: conversionRequest
 */

/**
 * @swagger
 * /exchange:
 *   post:
 *     summary: Realiza conversão de moedas
 *     tags: [exchange]
 *     responses:
 *       201:
 *         description: Resultado da conversão de moedas
 *         content:
 *           application/json:
 */
app.post("/exchange", async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;
  try {
    if (!from || !to || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const conversionResult = await getPairConversion(from, to, amount);
    res.status(201).json(conversionResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversion data" });
  }
});

/**
 * @swagger
 * tags:
 *   name: Codes
 *   description: Retorna todos os códigos suportados pela API de câmbio
 */

/**
 * @swagger
 * /codes:
 *   get:
 *     summary: Lista códigos suportados
 *     tags: [Codes]
 *     responses:
 *       200:
 *         description: Lista de códigos suportados pela API de câmbio
 *         content:
 *           application/json:
 */
app.get("/codes", async (req: Request, res: Response) => {
  try {
    const codes = await getSupportedCodes();
    res.status(200).json(codes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supported codes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/api-docs`);
});
