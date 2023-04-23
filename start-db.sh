docker run --name marvel-postgres \
-e POSTGRES_PASSWORD=pass123 \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=marvel \
-p 5433:5432 \
-d postgres