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



### Créer un utilisateur Airflow

- Supprimer l'utilisateur `admin`

```Bash
docker exec -it airflow_airflow airflow users delete --username admin
```

- Créer un nouveau utilisateur

```Bash
docker exec -it airflow_airflow airflow users create --username admin  --firstname Admin --lastname User --role Admin --email admin --password admin
```

Modifiez vos identifiants selon vos préférences.
