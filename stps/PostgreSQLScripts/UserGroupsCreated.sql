CREATE TABLE IF NOT EXISTS UserGroups (
	UserGroupId UUID CONSTRAINT pk_userGroupId PRIMARY KEY,
	PartitionId UUID NOT NULL, 
	UserGroupName VARCHAR(50) NOT NULL,
	UserGroupDescription VARCHAR(200), 
	CreatedDate TIMESTAMP NOT NULL,
	ModifiedDate TIMESTAMP NOT NULL,
	IsDeleted BOOLEAN NOT NULL,
	DeletedDate TIMESTAMP
);

-- PK auto-generate UUID for Primary Key
ALTER TABLE UserGroups
ALTER COLUMN UserGroupId SET DEFAULT gen_random_uuid();

CREATE INDEX IF NOT EXISTS idx_userGroupName ON UserGroups(PartitionId, UserGroupName);

CREATE INDEX IF NOT EXISTS idx_userGroupCreatedDate ON UserGroups(PartitionId, CreatedDate);