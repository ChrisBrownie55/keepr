using System.Collections.Generic;
using System.Data;
using keepr.Models;
using Dapper;
using System.Linq;
using System.Data.SqlClient;

namespace keepr.Repositories
{
  public class KeepsRepository
  {
    IDbConnection _db;

    public KeepsRepository(IDbConnection db)
    {
      _db = db;
    }

    public IEnumerable<Keep> GetRandom()
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE isPrivate = FALSE ORDER BY RAND();");
    }

    public IEnumerable<Keep> GetByUserId(string userId)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE userId = @id", new { id = userId });
    }

    public Keep GetById(int keepId)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE id = @id", new { id = keepId }).FirstOrDefault();
    }

    public IEnumerable<Keep> SearchByName(string name)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE name LIKE '%@name%';", new { name = name });
    }

    public Keep Create(Keep keep)
    {
      try
      {
        int id = _db.ExecuteScalar<int>(@"
          INSERT INTO keeps (
            name,
            description,
            userId,
            img,
            isPrivate,
            views,
            shares
          ) VALUES (
            @Name,
            @Description,
            @UserId,
            @Img,
            @IsPrivate,
            @Views,
            @Shares
          );
          SELECT LAST_INSERT_ID();
        ", keep);
        keep.Id = id;
        return keep;
      }
      catch (SqlException error)
      {
        System.Console.WriteLine(error.Message);
        return null;
      }
    }

    // TODO: Make all methods below require a matching UserId to modify.
    public Keep Update(Keep keep)
    {
      try
      {
        _db.ExecuteScalar(@"
          UPDATE keeps SET (
            name,
            description,
            userId,
            img,
            isPrivate,
            views,
            shares
          ) VALUES (
            @Name,
            @Description,
            @UserId,
            @Img,
            @IsPrivate,
            @Views,
            @Shares
          ) WHERE id = @Id;
        ", keep);
        return keep;
      }
      catch (SqlException error)
      {
        System.Console.WriteLine(error.Message);
        return null;
      }
    }

    public bool DeleteById(int id)
    {
      return _db.Execute("DELETE FROM keeps WHERE id = @id AND isPrivate = FALSE") == 1;
    }
  }
}