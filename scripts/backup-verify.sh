#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
umask 077
PGBIN=${PGBIN:-/usr/lib/postgresql/16/bin}
export PGHOST="$PWD/.local" PGPORT=55432 PGUSER=seed_owner
mkdir -p .local/backups
stamp=$(date -u +%Y%m%dT%H%M%S)
backup="$PWD/.local/backups/seed-$stamp.dump"
restore_db="seed_restore_${stamp,,}"
"$PGBIN/pg_dump" -Fc -d seed_local -f "$backup"
"$PGBIN/createdb" -T template0 "$restore_db"
"$PGBIN/pg_restore" --exit-on-error --single-transaction -d "$restore_db" "$backup"
for relation in organizations users memberships startups rounds opportunities transitions interactions documents document_grants audit_events schema_migrations; do
 query="SELECT count(*) FROM $relation"
 original=$(psql -d seed_local -Atqc "$query")
 restored=$(psql -d "$restore_db" -Atqc "$query")
 [ "$original" = "$restored" ] || { echo "Divergência em $relation"; exit 1; }
 echo "$relation: $original registos verificados"
done
query="SELECT coalesce(string_agg(id::text || ':' || md5(content), ',' ORDER BY id),'') FROM documents"
[ "$(psql -d seed_local -Atqc "$query")" = "$(psql -d "$restore_db" -Atqc "$query")" ]
echo "Conteúdos dos documentos idênticos. Backup: $backup"
echo "Base de restauro preservada: $restore_db"
