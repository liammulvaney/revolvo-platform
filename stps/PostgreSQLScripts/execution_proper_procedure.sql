DO $$
DECLARE
    v_accountid uuid;
    v_out_partitionid uuid;
    v_username varchar;
    v_email varchar;
    v_createddate timestamp;
    v_input_partitionid uuid := 'b20b1ce2-94b6-4f5f-a4b2-e621d6b7e9e4';
BEGIN
    CALL public.createauthprofile(
        v_input_partitionid,
        'desired_username',
        'user1@example.com',
        'secure_password',
        v_accountid,
        v_out_partitionid,
        v_username,
        v_email,
        v_createddate
    );
    
    RAISE NOTICE 'Created account: ID=%, Username=%, Email=%, Created=%', 
        v_accountid, v_username, v_email, v_createddate;
END $$;