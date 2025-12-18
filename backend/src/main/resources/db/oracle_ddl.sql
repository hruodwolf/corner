DROP TABLE record_categories;
DROP SEQUENCE seq_record_categories;


CREATE TABLE record_categories (
    record_category_id   NUMBER(15)    NOT NULL,
    created_at           TIMESTAMP     NOT NULL,
    created_by           VARCHAR2(50)  NOT NULL,
    updated_at           TIMESTAMP     NOT NULL,
    updated_by           VARCHAR2(50)  NOT NULL,
    version              NUMBER(15)    NOT NULL,
    record_category_name VARCHAR2(100) NOT NULL,
    description          VARCHAR2(255) NOT NULL
);

ALTER TABLE record_categories
    ADD CONSTRAINT pk_record_categories PRIMARY KEY (record_category_id);

CREATE SEQUENCE seq_record_categories
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE OR REPLACE TRIGGER bi_record_categories
BEFORE INSERT ON record_categories
FOR EACH ROW
BEGIN
    IF :NEW.record_category_id IS NULL THEN
        :NEW.record_category_id := seq_record_categories.NEXTVAL;
    END IF;

    :NEW.created_by := NVL(:NEW.created_by, USER);
    :NEW.created_at := NVL(:NEW.created_at, SYSTIMESTAMP);
    :NEW.updated_by := NVL(:NEW.updated_by, USER);
    :NEW.updated_at := NVL(:NEW.updated_at, SYSTIMESTAMP);
    :NEW.version    := NVL(:NEW.version, 1);
END;
/

CREATE OR REPLACE TRIGGER bu_record_categories
BEFORE UPDATE ON record_categories
FOR EACH ROW
BEGIN
    IF NOT UPDATING('UPDATED_BY') OR :NEW.updated_by IS NULL THEN
        :NEW.updated_by := USER;
    END IF;

    IF NOT UPDATING('UPDATED_AT') OR :NEW.updated_at IS NULL THEN
        :NEW.updated_at := SYSDATE;
    END IF;

    IF NOT UPDATING('VERSION') OR :NEW.version IS NULL THEN
        :NEW.version := :OLD.version + 1;
    END IF;
END;
/

COMMENT ON TABLE record_categories IS
    'Table for record categories including audit fields and version control';

COMMENT ON COLUMN record_categories.record_category_id IS
    'Primary key of the category (sequential ID from sequence)';
COMMENT ON COLUMN record_categories.created_at IS
    'Timestamp when the record was created';
COMMENT ON COLUMN record_categories.created_by IS
    'User who created the record';
COMMENT ON COLUMN record_categories.updated_at IS
    'Timestamp of the last update';
COMMENT ON COLUMN record_categories.updated_by IS
    'User who last updated the record';
COMMENT ON COLUMN record_categories.version IS
    'Version number for optimistic locking (starting at 1)';
COMMENT ON COLUMN record_categories.record_category_name IS
    'Name of the category (mandatory business field)';
COMMENT ON COLUMN record_categories.description IS
    'Detailed description of the category (free text field)';
