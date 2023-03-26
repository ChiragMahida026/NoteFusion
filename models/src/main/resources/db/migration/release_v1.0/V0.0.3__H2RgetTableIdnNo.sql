CREATE OR ALTER FUNCTION [roughsync].[H2RgetTableIdnNo]
(
    @tableName VARCHAR(512)
)
    RETURNS BIGINT
    AS
    BEGIN
    DECLARE @Result BIGINT;
    SELECT @Result = ISNULL(TABLEIDNNO, 0) FROM [roughsync].[Hcis2Rough_CONTROL_TABLE] WITH(NOLOCK)
    WHERE  TABLENAME = @tableName; --SET @Result = ISNULL(@Result,0)    
    RETURN @Result;
    END
