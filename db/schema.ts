import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),

  enquiryType: text("enquiry_type").notNull(),
  preferredDate: text("preferred_date"),
  guests: integer("guests"),
  message: text("message"),

  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});