USE [SOURCEDBNAME]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE or alter   TRIGGER [HumanResources].[TRG_H2R_HumanResources_divisionsync] 
   ON  [HumanResources].[division]
   AFTER INSERT,DELETE,UPDATE
AS 
IF CONTEXT_INFO() = 0x5055524553594e43
    INSERT  INTO roughsync.H2R_ERRORLOG_SYNCDATA ( [ProcedureName],
                                                    [ControlTableName],
                                                    [ErrorDescription],
                                                    [ErrorDT],
                                                    [ERROR_TABLEIDNNO] )
    VALUES  ( 'TRG_H2R_HumanResources_divisionsync', '[roughsync].[H2R_HumanResources_division_LOCAL]', 'Trigger ignored',
              GETDATE(), @@IDENTITY );
ELSE
	BEGIN
		DECLARE @MyTableVar table( idnno BIGINT);
		DECLARE @op varchar(3);
		IF EXISTS (SELECT 1 FROM inserted)
			BEGIN
				IF EXISTS (SELECT 1 FROM deleted)
				BEGIN
				 IF (UPDATE(division_id) OR
                        UPDATE(division_name) OR
                        UPDATE(division_key) OR
                        UPDATE(created_datetime) OR
                        UPDATE(created_by) OR
                        UPDATE(modified_datetime) OR
                        UPDATE(modified_by) OR
                        UPDATE(apps_code) OR
                        UPDATE(is_active) OR
                        UPDATE(order_id) OR
                        UPDATE(is_mfg)
                     )
					BEGIN
						 SET @op = 'U'
					END
				END
				ELSE
					BEGIN
						SET @op = 'I'
					END
				END
		ELSE
			BEGIN
				SET @op = 'D'
			END

	 BEGIN
	 IF(@op = 'U' or @op = 'I' or @op = 'D')
	 BEGIN
        IF EXISTS ( SELECT 1 FROM inserted )
            BEGIN
                INSERT  INTO  [DATASYNCDBNAME].[roughsync].[H2R_HumanResources_division_LOCAL]	
				([division_id]
                [division_name],
                [division_key],
                [created_datetime],
                [created_by],
                [modified_datetime],
                [modified_by],
                [apps_code],
                [is_active],
                [order_id],
                [is_mfg],
				[OP],
				[TABLESCHEMA],
				[TABLENAME],
				[ISIDENTITY])
	  OUTPUT INSERTED.IDNNO INTO @MyTableVar 
				SELECT [division_id]
                [division_name],
                [division_key],
                [created_datetime],
                [created_by],
                [modified_datetime],
                [modified_by],
                [apps_code],
                [is_active],
                [order_id],
                [is_mfg]
						,@op
						,'HumanResources' AS [TABLESCHEMA]
						, 'division' AS TABLENAME
						,1 AS [ISIDENTITY]
						FROM    inserted I;
	--inserts in sync detail table				
	INSERT INTO [DATASYNCDBNAME].[roughsync].[h2r_data_sync_details] (tablename,table_idnno,op,sp_name) 
	SELECT 'HumanResources_division_h2r',d.idnno ,@op,'[roughsync].[PROC_Hcis2RoughSYNC_HumanResources_division]'  FROM   @MyTableVar D;
			END;

		 ELSE
            BEGIN
				 --inserts in local table
                 INSERT  INTO  [DATASYNCDBNAME].[roughsync].[H2R_HumanResources_division_LOCAL]	
				([division_id]
                [division_name],
                [division_key],
                [created_datetime],
                [created_by],
                [modified_datetime],
                [modified_by],
                [apps_code],
                [is_active],
                [order_id],
                [is_mfg],
				[OP],
				[TABLESCHEMA],
				[TABLENAME],
				[ISIDENTITY])
	  OUTPUT INSERTED.IDNNO INTO @MyTableVar 
				SELECT [division_id]
                [division_name],
                [division_key],
                [created_datetime],
                [created_by],
                [modified_datetime],
                [modified_by],
                [apps_code],
                [is_active],
                [order_id],
                [is_mfg]
						,@op
						, 'HumanResources' AS [TABLESCHEMA]
						, 'division' AS TABLENAME
						,1 AS [ISIDENTITY]
						FROM    deleted D;
					
	INSERT INTO [DATASYNCDBNAME].[roughsync].[h2r_data_sync_details] (tablename,table_idnno,op,sp_name) 
	SELECT 'HumanResources_division_h2r',d.idnno ,@op,'[roughsync].[PROC_Hcis2RoughSYNC_HumanResources_division]'  FROM   @MyTableVar D;
			END;
END;
END;
END;