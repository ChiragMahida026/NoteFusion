SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS drop table [roughsync].[h2r_data_sync_details]
GO
CREATE TABLE [roughsync].[h2r_data_sync_details](
	[idnno] [bigint] IDENTITY(1,1) NOT NULL,
	[tablename] [varchar](255) NULL,
	[table_idnno] [bigint] NULL,
	[op] [varchar](5) NULL,
	[created_datetime] [datetime] NULL,
	[sp_name] [varchar](255) NULL,
	[error_flg] [varchar](3) NULL,
 CONSTRAINT [PK_h2r_data_sync_details_id] PRIMARY KEY CLUSTERED 
(
	[idnno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
