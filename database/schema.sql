CREATE TABLE "user"(
    user_id VARCHAR(21),
    user_email VARCHAR(255),
    user_password VARCHAR(255),

    CONSTRAINT pk_user PRIMARY KEY (user_id),
    CONSTRAINT uk_user_email UNIQUE (user_email)
);

CREATE TABLE task(
    task_id VARCHAR(21),
    title VARCHAR(255),
    "description" TEXT,
    status BOOLEAN DEFAULT false,
    user_id VARCHAR(21),


    CONSTRAINT pk_task PRIMARY KEY (task_id),
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE
)
