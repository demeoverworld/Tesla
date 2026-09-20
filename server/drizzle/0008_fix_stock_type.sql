DO $$
BEGIN
  IF (SELECT data_type FROM information_schema.columns WHERE table_name='product' AND column_name='stock') <> 'boolean' THEN
    -- Convert common integer/text representations to boolean safely
    ALTER TABLE "product" ALTER COLUMN "stock" TYPE boolean USING (
      CASE
        WHEN "stock" IS TRUE THEN TRUE
        WHEN "stock"::text IN ('1','t','true','yes') THEN TRUE
        ELSE FALSE
      END
    );

    ALTER TABLE "product" ALTER COLUMN "stock" SET DEFAULT false;
    ALTER TABLE "product" ALTER COLUMN "stock" SET NOT NULL;
  END IF;
END$$;
