SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE or alter   PROCEDURE [roughsync].[Hcis2Rough_TRAN_HumanResources_division_Data]
AS
 BEGIN
    DECLARE @LastIdnNo BIGINT = ( SELECT [roughsync].[H2RgetTableIdnNo]('HumanResources_division_h2r') );
    IF EXISTS ( SELECT 1
                FROM roughsync.H2R_HumanResources_division_LOCAL WITH ( NOLOCK )
                WHERE IDNNO > @LastIdnNo )
    BEGIN
            SELECT TOP 1000
                 [IDNNO] as ID
                ,[division_id]
                ,[division_name]
                ,[division_key]
                ,[created_datetime]
                ,[created_by]
                ,[modified_datetime]
                ,[modified_by]
                ,[apps_code]
                ,[is_active]
                ,[order_id]
                ,[is_mfg]
				,[OP]
				,[TABLESCHEMA]
				,[TABLENAME]
				,[ISIDENTITY]
            FROM roughsync.H2R_HumanResources_division_LOCAL EM WITH ( NOLOCK )
            WHERE IDNNO > @LastIdnNo
            ORDER BY IDNNO;
    END;
	END;
