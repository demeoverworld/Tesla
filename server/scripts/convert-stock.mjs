import 'dotenv/config';
import fs from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set in environment");
  process.exit(2);
}

const client = neon(DATABASE_URL);

async function run() {
  try {
    console.log("Starting backup of product table...");
    const now = Date.now();
    // Begin transaction
    await client.query("BEGIN");

    const res = await client.query("SELECT * FROM product");
    const backupDir = path.join(process.cwd(), "server", "drizzle");
    await fs.mkdir(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, `product_backup_${now}.json`);
    await fs.writeFile(backupPath, JSON.stringify(res.rows ?? res, null, 2), "utf8");
    console.log(`Backup written to ${backupPath}`);

    console.log("Converting product.stock to boolean...");
    await client.query(
      `ALTER TABLE product ALTER COLUMN stock TYPE boolean USING (CASE WHEN stock::text IN ('1','t','true','yes') THEN TRUE ELSE FALSE END);`
    );

    await client.query(
      `ALTER TABLE product ALTER COLUMN stock SET DEFAULT false;`
    );

    await client.query(
      `ALTER TABLE product ALTER COLUMN stock SET NOT NULL;`
    );

    await client.query("COMMIT");
    console.log("Conversion successful.");
  } catch (err) {
    console.error("Error during conversion:", err);
    try {
      await client.query("ROLLBACK");
    } catch (e) {
      console.error("Rollback failed:", e);
    }
    process.exitCode = 1;
  }
}

run().finally(() => process.exit());
