IF NOT EXISTS ( SELECT top 1 1 FROM sys.schemas WHERE name = N'roughsync' )
BEGIN
EXEC('CREATE SCHEMA [roughsync]')
END
GO