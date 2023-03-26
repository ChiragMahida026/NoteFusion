IF EXISTS drop table [roughsync].[H2R_HumanResources_division_LOCAL]
GO
CREATE TABLE [roughsync].[H2R_HumanResources_division_LOCAL](
 [IDNNO] [bigint] IDENTITY(1,1) NOT NULL,
 [division_id] [int] NOT NULL,
 [division_name] [varchar](512) NULL,
 [division_key] [varchar](512) NULL,
 [created_datetime] [datetime] NULL,
 [created_by] [bigint] NULL,
 [modified_datetime] [datetime] NULL,
 [modified_by] [bigint] NULL,
 [apps_code] [smallint] NULL,
 [is_active] [bit] NULL,
 [order_id] [int] NULL,
 [is_mfg] [bit] NULL,
 [OP] [varchar](3) NULL,
 [TABLESCHEMA] [varchar](20) NULL,
 [TABLENAME] [varchar](100) NULL,
 [ISIDENTITY] [smallint] NULL,

CONSTRAINT [PK_roughsync_H2R_HumanResources_division_LOCAL] PRIMARY KEY CLUSTERED
(
 [IDNNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
CONSTRAINT [UQ_roughsync_H2R_HumanResources_division_LOCAL] UNIQUE NONCLUSTERED
(
 [division_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO