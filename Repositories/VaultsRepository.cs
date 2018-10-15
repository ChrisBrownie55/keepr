using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using keepr.Models;

namespace keepr.Repositories {
  public class VaultsRepository {
    IDbConnection _db;
    public VaultsRepository (IDbConnection db) {
      _db = db;
    }

    public Vault Create (Vault vault) {
      int id = _db.ExecuteScalar<int> (@"
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

    public bool Update (Vault vault) {
      return _db.Execute (@"
        UPDATE vaults SET
          name = @Name,
          description = @Description
        WHERE id = @Id;
      ", vault) == 1;
    }

    public bool DeleteById (int id, string userId) {
      return _db.Execute ("DELETE FROM vaults WHERE id = @id AND userId = @userId;", new { id, userId }) == 1;
    }

    public IEnumerable<Vault> GetVaults (string userId) {
      return _db.Query<Vault> ("SELECT * FROM vaults WHERE userId = @userId;", new { userId });
    }

    public Vault GetById (int id, string userId) {
      return _db.Query<Vault> ("SELECT * FROM vaults WHERE id = @id AND userId = @userId;", new { id, userId }).FirstOrDefault ();
    }

    public IEnumerable<Keep> GetKeepsFromVault (int vaultId) {
      return _db.Query<Keep> ("SELECT * FROM vaultkeeps INNER JOIN keeps on keeps.id = vaultkeeps.keepId WHERE (vaultId = @vaultId);", new { vaultId });
    }

    public bool StoreInVault (VaultKeep vaultKeep) {
      return _db.ExecuteScalar<int> (@"
        INSERT INTO vaultkeeps (
          vaultId,
          keepId,
          userId
        ) VALUES (
          @VaultId,
          @KeepId,
          @UserId
        );
        UPDATE keeps SET keeps = keeps + 1 WHERE id = @KeepId;
        SELECT ROW_COUNT();
      ", vaultKeep) != 0;
    }

    public bool RemoveFromVault (int keepId, string userId) {
      return _db.ExecuteScalar<int> (@"
        DELETE FROM vaultkeeps WHERE keepId = @keepId AND userId = @userId;
        UPDATE keeps SET keeps = keeps - 1 WHERE id = @keepId;
        SELECT ROW_COUNT();
      ", new { keepId, userId }) != 0;
    }
  }
}