SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS drop table [roughsync].[ERRORLOG_SYNCDATA]
GO
CREATE TABLE [roughsync].[ERRORLOG_SYNCDATA](
	[LOGID] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[ProcedureName] [nvarchar](250) NOT NULL,
	[ControlTableName] [nvarchar](120) NULL,
	[ErrorDescription] [nvarchar](512) NULL,
	[ErrorDT] [datetime] NULL,
	[ERROR_TABLEIDNNO] [numeric](18, 0) NULL
) ON [PRIMARY]
GO
