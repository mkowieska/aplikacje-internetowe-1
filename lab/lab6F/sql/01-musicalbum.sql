CREATE TABLE musicalbum
(
    id      INTEGER NOT NULL
        CONSTRAINT musicalbum_pk
            PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    content TEXT NOT NULL
);
