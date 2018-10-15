using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using keepr.Models;
using Microsoft.AspNetCore.Http;

namespace keepr.Repositories {
  public class KeepsRepository {
    IDbConnection _db;

    public KeepsRepository (IDbConnection db) {
      _db = db;
    }

    public IEnumerable<Keep> GetRandom () {
      return _db.Query<Keep> ("SELECT * FROM keeps WHERE isPrivate = FALSE ORDER BY RAND();");
    }

    public IEnumerable<Keep> GetByUserId (string userId) {
      return _db.Query<Keep> ("SELECT * FROM keeps WHERE userId = @userId", new { userId });
    }

    public Keep GetById (int keepId) {
      _db.Execute ("UPDATE keeps SET views = views + 1 WHERE id = @keepId", new { keepId });
      return _db.Query<Keep> ("SELECT * FROM keeps WHERE id = @keepId", new { keepId }).FirstOrDefault ();
    }

    public int Share (int keepId) {
      return _db.ExecuteScalar<int> (@"
        UPDATE keeps SET shares = shares + 1 WHERE id = @keepId;
        SELECT shares FROM keeps WHERE id = @keepId;
      ", new { keepId });
    }

    public IEnumerable<Keep> SearchByName (string name) {
      return _db.Query<Keep> ($"SELECT * FROM keeps WHERE name LIKE '%{name}%';");
    }

    public Keep Create (Keep keep) {
      int id = _db.ExecuteScalar<int> (@"
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

    public bool Update (Keep keep) {
      return _db.Execute (@"
        UPDATE keeps SET
          name = @Name,
          description = @Description,
          img = @Img
        WHERE id = @Id;
      ", keep) == 1;
    }

    public bool DeleteById (int id, string userId) {
      return _db.Execute ("DELETE FROM keeps WHERE id = @id AND isPrivate = TRUE AND userId = @userId;", new { id, userId }) == 1;
    }
  }
}