-- @Author: <Liam Mulvaney>
-- @Description: Procedure handles the creation of a user account.

CREATE OR REPLACE PROCEDURE CreateAuthProfile (
	IN v_partitionid UUID, 
	IN v_username VARCHAR(50), 
	IN v_email varchar(100),
	IN v_acctpassword varchar(50),
	OUT out_accountid UUID,
	OUT out_partitionid UUID,
    OUT out_username VARCHAR(50),
    OUT out_email VARCHAR(100),
    OUT out_createddate TIMESTAMP
)
LANGUAGE plpgsql
AS 
$BODY$
DECLARE 
	timestampCreated TIMESTAMP := CURRENT_TIMESTAMP;
BEGIN 
	-- Insert user account parameters in its respective entities
	INSERT INTO useraccounts(partitionid, username, email, accountpassword, createddate, modifieddate, accountdeleted)
	VALUES (v_partitionid, v_username, v_email, v_acctpassword, timestampCreated, timestampCreated, FALSE)
	RETURNING accountid, partitionid, username, email, createddate 
	INTO out_accountid, out_partitionid, out_username, out_email, out_createddate;

EXCEPTION
	WHEN OTHERS THEN
		DECLARE
			err_msg TEXT;
			err_detail TEXT;
			err_hint TEXT;
			err_context TEXT;
		BEGIN
			GET STACKED DIAGNOSTICS
				err_msg     = MESSAGE_TEXT,
				err_detail  = PG_EXCEPTION_DETAIL,
				err_hint    = PG_EXCEPTION_HINT,
				err_context = PG_EXCEPTION_CONTEXT;

			RAISE NOTICE 'Message: %', err_msg;
			RAISE NOTICE 'Detail: %', err_detail;
			RAISE NOTICE 'Hint: %', err_hint;
			RAISE NOTICE 'Context: %', err_context;

			RAISE; -- Re-throw the error if desired
		END;
END;
$BODY$;
