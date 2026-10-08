CREATE TABLE organizations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL CHECK(length(name) BETWEEN 2 AND 160),
 kind text NOT NULL CHECK(kind IN ('startup','investor','accelerator'))
);
CREATE TABLE users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text UNIQUE NOT NULL, password_hash text NOT NULL, name text NOT NULL);
CREATE TABLE memberships (
 user_id uuid REFERENCES users ON DELETE RESTRICT, organization_id uuid REFERENCES organizations ON DELETE RESTRICT,
 PRIMARY KEY(user_id,organization_id), UNIQUE(user_id)
);
CREATE TABLE sessions (token_hash text PRIMARY KEY, user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE, expires_at timestamptz NOT NULL);
CREATE INDEX sessions_user_idx ON sessions(user_id);
CREATE TABLE login_attempts (email text PRIMARY KEY, attempts integer NOT NULL, window_start timestamptz NOT NULL);
CREATE TABLE startups (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid UNIQUE NOT NULL REFERENCES organizations ON DELETE RESTRICT,
 sector text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', accelerator_id uuid REFERENCES organizations ON DELETE RESTRICT
);
CREATE TABLE rounds (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), startup_id uuid NOT NULL REFERENCES startups ON DELETE RESTRICT,
 name text NOT NULL, target numeric(18,2) NOT NULL CHECK(target>0), currency text NOT NULL CHECK(currency IN ('AOA','USD','EUR')),
 status text NOT NULL DEFAULT 'open' CHECK(status IN ('open','closed')), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX rounds_startup_idx ON rounds(startup_id);
CREATE TABLE opportunities (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), round_id uuid NOT NULL REFERENCES rounds ON DELETE RESTRICT,
 investor_id uuid NOT NULL REFERENCES organizations ON DELETE RESTRICT,
 stage text NOT NULL DEFAULT 'contacted' CHECK(stage IN ('contacted','meeting','soft_commit','term_sheet','closed','declined')),
 soft_amount numeric(18,2) CHECK(soft_amount>0), soft_at timestamptz,
 term_status text NOT NULL DEFAULT 'none' CHECK(term_status IN ('none','received','review','accepted','rejected')),
 next_step text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(round_id,investor_id), CHECK((soft_amount IS NULL)=(soft_at IS NULL)),
 CHECK(stage <> 'soft_commit' OR soft_amount IS NOT NULL), CHECK(stage <> 'term_sheet' OR term_status <> 'none')
);
CREATE INDEX opportunities_investor_idx ON opportunities(investor_id);
CREATE TABLE transitions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), opportunity_id uuid NOT NULL REFERENCES opportunities ON DELETE RESTRICT,
 from_stage text, to_stage text NOT NULL, actor_id uuid NOT NULL REFERENCES users ON DELETE RESTRICT, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX transitions_opportunity_idx ON transitions(opportunity_id,created_at);
CREATE TABLE interactions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), opportunity_id uuid NOT NULL REFERENCES opportunities ON DELETE RESTRICT,
 kind text NOT NULL CHECK(kind IN ('note','meeting','contact')), body text NOT NULL CHECK(length(body) BETWEEN 1 AND 4000),
 occurred_at timestamptz NOT NULL, actor_id uuid NOT NULL REFERENCES users ON DELETE RESTRICT, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX interactions_opportunity_idx ON interactions(opportunity_id);
CREATE TABLE documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), startup_id uuid NOT NULL REFERENCES startups ON DELETE RESTRICT,
 name text NOT NULL, media_type text NOT NULL CHECK(media_type IN ('application/pdf','text/plain')),
 content bytea NOT NULL CHECK(octet_length(content) BETWEEN 1 AND 2097152), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX documents_startup_idx ON documents(startup_id);
CREATE TABLE document_grants (
 document_id uuid REFERENCES documents ON DELETE CASCADE, organization_id uuid REFERENCES organizations ON DELETE RESTRICT,
 PRIMARY KEY(document_id, organization_id)
);
CREATE TABLE audit_events (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, actor_id uuid NOT NULL REFERENCES users ON DELETE RESTRICT,
 action text NOT NULL, resource_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO seed_app;
REVOKE UPDATE, DELETE ON transitions,audit_events FROM seed_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO seed_app;
