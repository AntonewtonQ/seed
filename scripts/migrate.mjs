import pg from 'pg';
import {readdir,readFile} from 'node:fs/promises';
const c=new pg.Client({host:process.cwd()+'/.local',port:55432,user:'seed_owner',database:'seed_local'});
await c.connect();
try {
 await c.query('SELECT pg_advisory_lock(721905)');
 await c.query('CREATE TABLE IF NOT EXISTS schema_migrations(name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
 for(const name of (await readdir('db/migrations')).filter(n=>n.endsWith('.sql')).sort()) {
  if((await c.query('SELECT 1 FROM schema_migrations WHERE name=$1',[name])).rowCount) continue;
  await c.query('BEGIN');
  try {await c.query(await readFile('db/migrations/'+name,'utf8')); await c.query('INSERT INTO schema_migrations(name) VALUES($1)',[name]);await c.query('COMMIT');console.log('Applied',name)}
  catch(e){await c.query('ROLLBACK');throw e}
 }
} finally {await c.end()}
