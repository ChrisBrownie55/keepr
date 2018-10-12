using System.Data;
using keepr.Models;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace keepr.Repositories
{
  public class VaultsRepository
  {
    IDbConnection _db;
    public VaultsRepository(IDbConnection db)
    {
      _db = db;
    }

    public Vault Create(Vault vault)
    {
      try
      {
        int id = _db.ExecuteScalar<int>(@"
          INSERT INTO vaults (
            name,
            description,
            userId
          ) VALUES (
            @Name,
            @Description,
            @UserId
          );
          SELECT LAST_INSERT_ID();
        ", vault);
        vault.Id = id;
        return vault;
      }
      catch (SqlException error)
      {
        System.Console.WriteLine(error.Message);
        return null;
      }
    }

    public bool Update(Vault vault)
    {
      try
      {
        return _db.Execute(@"
          UPDATE vaults SET
            name = @Name,
            description = @Description
          WHERE id = @Id;
        ", vault) == 1;
      }
      catch (SqlException error)
      {
        System.Console.WriteLine(error.Message);
        return false;
      }
    }

    public bool DeleteById(int id, string userId)
    {
      return _db.Execute("DELETE FROM vaults WHERE id = @id AND userId = @userId;", new { id, userId }) == 1;
    }

    public IEnumerable<Vault> GetVaults(string userId)
    {
      return _db.Query<Vault>("SELECT * FROM vaults WHERE userId = @userId;", new { userId });
    }

    public Vault GetById(int id, string userId)
    {
      return _db.Query<Vault>("SELECT * FROM vaults WHERE id = @id AND userId = @userId;", new { id, userId }).FirstOrDefault();
    }

    public IEnumerable<Keep> GetKeepsFromVault(int vaultId)
    {
      return _db.Query<Keep>("SELECT * FROM vaultkeeps INNER JOIN keeps on keeps.id = vaultkeeps.keepId WHERE (vaultId = @vaultId);", new { vaultId });
    }
  }
}