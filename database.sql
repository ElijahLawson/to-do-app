CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
	"description" VARCHAR(256),
	"is_completed" BOOLEAN);

INSERT INTO tasks ("name", "description", "is_completed") VALUES ('test', 'test description', FALSE);

SELECT * FROM tasks