using System;
using System.Data;
using System.Linq;
using BCrypt.Net;
using keepr.Models;
using Dapper;
using System.Data.SqlClient;

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

      try
      {
        bool success = _db.Execute(@"
          INSERT INTO users (id, name, email, hash)
          VALUES (@id, @name, @email, @hash);
        ", new
        {
          id,
          name = creds.Name,
          email = creds.Email,
          hash
        }) == 1;

        if (!success)
        {
          // only reason user wouldn't have been created
          throw new Exception("User already exists.");
        }
      }
      catch (Exception)
      {
        throw new Exception("Unable to register.");
      }

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
      User user;
      try
      {
        user = _db.Query<User>(@"
          SELECT * FROM users WHERE email = @Email
        ", creds).FirstOrDefault();
      }
      catch (Exception)
      {
        throw new Exception("Unable to login.");
      }

      if (user == null)
      {
        throw new Exception("User does not exist.");
      }

      if (!BCrypt.Net.BCrypt.Verify(creds.Password, user.Hash))
      {
        throw new Exception("Incorrect password.");
      }

      user.Hash = null;
      return user;
    }

    internal User GetUserById(string id)
    {
      User user;
      try
      {
        user = _db.Query<User>(@"
          SELECT * FROM users WHERE id = @id
        ", new { id }).FirstOrDefault();
      }
      catch (Exception)
      {
        throw new Exception("Unable to find user.");
      }

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