CREATE TABLE `enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`enquiry_type` text NOT NULL,
	`preferred_date` text,
	`guests` integer,
	`message` text,
	`created_at` text NOT NULL
);
