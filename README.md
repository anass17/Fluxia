# Fluxia


- Enable the extension in your DB:

```Bash
CREATE EXTENSION IF NOT EXISTS vector;
```

- Check if the vector type is now available:

```Bash
SELECT * FROM pg_available_extensions WHERE name = 'vector';
```

- Run Seeds:

```Bash
docker compose exec -it backend python -m app.seeds.run_seeds
```

- Access account:

```
anass@boutaib.com
123456789
```
