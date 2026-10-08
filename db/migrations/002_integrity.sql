REVOKE ALL ON schema_migrations FROM seed_app;
ALTER TABLE rounds ADD CONSTRAINT rounds_name_length CHECK(length(name) BETWEEN 1 AND 160);
ALTER TABLE opportunities ADD CONSTRAINT opportunities_next_step_length CHECK(length(next_step)<=500);
ALTER TABLE startups ADD CONSTRAINT startups_description_length CHECK(length(description)<=2000);
CREATE FUNCTION check_organization_kind() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_TABLE_NAME = 'startups' THEN
  IF NOT EXISTS (SELECT 1 FROM organizations WHERE id=NEW.organization_id AND kind='startup') THEN
   RAISE EXCEPTION 'Invalid organization kind' USING ERRCODE='23514';
  END IF;
  IF NEW.accelerator_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM organizations WHERE id=NEW.accelerator_id AND kind='accelerator') THEN
   RAISE EXCEPTION 'Invalid accelerator kind' USING ERRCODE='23514';
  END IF;
 ELSE
  IF NOT EXISTS (SELECT 1 FROM organizations WHERE id=NEW.investor_id AND kind='investor') THEN
   RAISE EXCEPTION 'Invalid investor kind' USING ERRCODE='23514';
  END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER startup_kind BEFORE INSERT OR UPDATE ON startups FOR EACH ROW EXECUTE FUNCTION check_organization_kind();
CREATE TRIGGER investor_kind BEFORE INSERT OR UPDATE ON opportunities FOR EACH ROW EXECUTE FUNCTION check_organization_kind();
-- Application cannot change organizational roles underneath existing resources.
REVOKE UPDATE ON organizations FROM seed_app;
GRANT UPDATE(name) ON organizations TO seed_app;
