#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PGDATA="$PWD/.local/postgres"
PGBIN=${PGBIN:-/usr/lib/postgresql/16/bin}
case "${1:-start}" in
start)
 if [ ! -f "$PGDATA/PG_VERSION" ]; then
   mkdir -p .local
   chmod 700 .local
   "$PGBIN/initdb" -D "$PGDATA" --username=seed_owner --auth-local=trust --auth-host=scram-sha-256 > .local/initdb.log
   cat >> "$PGDATA/postgresql.conf" <<CONFIG
listen_addresses = '127.0.0.1'
port = 55432
unix_socket_directories = '$PWD/.local'
timezone = 'UTC'
CONFIG
 fi
 "$PGBIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1 || "$PGBIN/pg_ctl" -D "$PGDATA" -l "$PWD/.local/postgres.log" start
 if [ ! -f .env.local ]; then
   umask 077
   secret=$(openssl rand -hex 24)
   psql -h "$PWD/.local" -p 55432 -U seed_owner -d postgres -v ON_ERROR_STOP=1 -v secret="$secret" <<'SQL'
CREATE ROLE seed_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'secret';
CREATE DATABASE seed_local OWNER seed_owner;
SQL
   psql -h "$PWD/.local" -p 55432 -U seed_owner -d seed_local -v ON_ERROR_STOP=1 -c 'REVOKE ALL ON DATABASE seed_local FROM PUBLIC; GRANT CONNECT ON DATABASE seed_local TO seed_app; REVOKE CREATE ON SCHEMA public FROM PUBLIC;'
   printf 'DATABASE_URL=postgresql://seed_app:%s@127.0.0.1:55432/seed_local\nAPP_ORIGIN=http://localhost:3000\n' "$secret" > .env.local
 fi
 ;;
stop) "$PGBIN/pg_ctl" -D "$PGDATA" stop -m fast ;;
*) echo 'Uso: scripts/db-local.sh start|stop'; exit 1 ;;
esac
