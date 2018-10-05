using System;
using System.Data;
using System.Linq;
using BCrypt.Net;
using keepr.Models;
using Dapper;

namespace keepr.Repositories
{
  public class UserRepository
  {

    IDbConnection _db;

    //REGISTER
    public User Register(UserRegistration creds)
    {
      //generate the user id
      //HASH THE PASSWORD
      string id = Guid.NewGuid().ToString();
      string hash = BCrypt.Net.BCrypt.HashPassword(creds.Password);
      int success = _db.Execute(@"
        INSERT INTO users (id, name, email, hash)
        VALUES (@id, @name, @email, @hash);
      ", new
      {
        id,
        name = creds.Name,
        email = creds.Email,
        hash
      });

      if (success != 1) { return null; }

      return new User()
      {
        Name = creds.Name,
        Email = creds.Email,
        Hash = null,
        Id = id
      };
    }

    //LOGIN
    public User Login(UserLogin creds)
    {
      User user = _db.Query<User>(@"
        SELECT * FROM users WHERE email = @Email
      ", creds).FirstOrDefault();

      if (user == null || !BCrypt.Net.BCrypt.Verify(creds.Password, user.Hash))
      {
        return null;
      }

      user.Hash = null;
      return user;
    }

    internal User GetUserById(string id)
    {
      var user = _db.Query<User>(@"
        SELECT * FROM users WHERE id = @id
      ", new { id }).FirstOrDefault();
      if (user != null)
      {
        user.Hash = null;
      }
      return user;
    }


    //Update   u
    //CHANGE PASS u
    //DELETE   D



    public UserRepository(IDbConnection db)
    {
      _db = db;
    }



  }
}