import { defineConfig } from "prisma/config";
export default defineConfig({
  schema: "schema.prisma",
  datasource: {
    url: "file:db/data.db", // or libsql:// for Turso
  },
});