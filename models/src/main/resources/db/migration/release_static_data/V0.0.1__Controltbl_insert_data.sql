insert into roughsync.Hcis2Rough_DATASYNC_MASTER (TABLE_NAME,P2L_LOCAL_FILL,P2L_REMOTE_TABLE,ACTIVE,EXEC_SEQUENCE,CONTROL_TABLE_NAME)
values
('HumanResources_division','roughsync.Hcis2Rough_TRAN_HumanResources_division_Data','roughsync.H2R_HumanResources_division_REMOTE',1,1,'HumanResources_division_h2r');
GO
insert into roughsync.Hcis2Rough_CONTROL_TABLE (TABLENAME,TABLEIDNNO,MODIFYDATETIME,LOCAL_TABLENAME,IS_ACTIVE,EXEC_SEQUENCE)
values
('HumanResources_division_h2r',0,GETDATE(),'roughsync.H2R_HumanResources_division_LOCAL',1,1);
GO

