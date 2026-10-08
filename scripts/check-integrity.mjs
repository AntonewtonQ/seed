import nextEnv from '@next/env';
const {loadEnvConfig}=nextEnv;
import pg from 'pg';import assert from 'node:assert/strict';import {randomUUID} from 'node:crypto';
loadEnvConfig(process.cwd());const db=new pg.Client({connectionString:process.env.DATABASE_URL});await db.connect();
try{
 const result=await db.query('SELECT current_database() db,current_user app,rolsuper,rolcreatedb,rolcreaterole FROM pg_roles WHERE rolname=current_user');
 assert.deepEqual(result.rows[0],{db:'seed_local',app:'seed_app',rolsuper:false,rolcreatedb:false,rolcreaterole:false});
 for(const [sql,params,code] of [
 ['INSERT INTO rounds(startup_id,name,target,currency) VALUES($1,$2,$3,$4)',[randomUUID(),'Órfã','1.00','AOA'],'23503'],
 ['INSERT INTO rounds(startup_id,name,target,currency) SELECT id,$1,$2,$3 FROM startups LIMIT 1',['Inválida','-1.00','AOA'],'23514'],
 ["UPDATE organizations SET kind='investor' WHERE kind='startup'",[],'42501'],
 ['DELETE FROM transitions WHERE false',[],'42501'],
 ['DELETE FROM audit_events WHERE false',[],'42501'],
 ['SELECT * FROM schema_migrations',[],'42501']]){
  await db.query('BEGIN');let received;
  try{await db.query(sql,params)}catch(e){received=e.code}finally{await db.query('ROLLBACK')}
  assert.equal(received,code);
 }
 console.log('PASS: aplicação sem privilégios administrativos; FK, CHECK e permissões SQL verificadas (6 casos).');
}finally{await db.end()}
