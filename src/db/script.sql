create DATABASE tyba_api_rest;

create TABLE "USER" (
    id SERIAL PRIMARY KEY,
    names VARCHAR(50),
    lastNames VARCHAR(50),
    email VARCHAR(50),
    pass VARCHAR(100)
);