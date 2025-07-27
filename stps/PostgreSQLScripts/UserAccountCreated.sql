
-- Generates a UserAccounts Table, which will contain the User Account's info. 
CREATE TABLE IF NOT EXISTS UserAccounts (
	AccountId UUID CONSTRAINT acctId_primaryKey PRIMARY KEY,
	PartitionID UUID NOT NULL,
	Username VARCHAR(50) CONSTRAINT username_unique UNIQUE NOT NULL,
	Email VARCHAR(100) CONSTRAINT email_unique UNIQUE NOT NULL,
	AccountPassword VARCHAR(50), 
	CreatedDate TIMESTAMP NOT NULL, -- date formats use the Timestamp data type
	ModifiedDate TIMESTAMP NOT NULL,
	AccountDeleted BOOLEAN NOT NULL, 
	DateDeleted TIMESTAMP
); 

-- This index will help speed up searches for usernames and PartitionID
CREATE INDEX IF NOT EXISTS idx_PartitionId_Username ON UserAccounts(PartitionID, Username); -- uses binary tree index by default

-- Faster search using B-Tree for queries like: SELECT * FROM UserAccounts WHERE PartitionID = 'some-id' ORDER BY CreatedDate DESC;
CREATE INDEX IF NOT EXISTS idx_PartitionId_CreatedDate ON UserAccounts(PartitionID, CreatedDate);

-- for search like ILIKE '%lia%'
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- one-time setup for SERVER
CREATE INDEX IF NOT EXISTS idx_username_trgm ON UserAccounts USING GIN (Username gin_trgm_ops); -- The pg_trgm module provides functions and operators for determining the similarity of ASCII alphanumeric text based on trigram matching, as well as index operator classes that support fast searching for similar strings.

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- works like a typescript import 
ALTER TABLE UserAccounts
ALTER COLUMN AccountId SET DEFAULT gen_random_uuid() -- function to generate a random GUID