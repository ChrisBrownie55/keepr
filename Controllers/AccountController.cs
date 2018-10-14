using System;
using System.Threading.Tasks;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{

  [Route("[controller]")]
  public class AccountController : Controller
  {
    private readonly UserRepository _repo;

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] UserLogin creds)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest("Invalid login information.");
      }

      User user;
      try
      {
        user = _repo.Login(creds);
      }
      catch (Exception error)
      {
        return BadRequest(error.Message);
      }

      user.SetClaims();
      await HttpContext.SignInAsync(user._principal);

      return Ok(user);
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistration creds)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest("Invalid registration information.");
      }

      User user;
      try
      {
        user = _repo.Register(creds);
      }
      catch (Exception error)
      {
        return BadRequest(error.Message);
      }

      user.SetClaims();
      await HttpContext.SignInAsync(user._principal);

      return Ok(user);
    }

    [HttpDelete("Logout")]
    public async Task<IActionResult> Logout()
    {
      try
      {
        await HttpContext.SignOutAsync();
      }
      catch
      {
        return BadRequest("Unable to logout.");
      }

      return Ok();
    }

    [Authorize]
    [HttpGet("Authenticate")]
    public IActionResult Authenticate()
    {
      var id = HttpContext.User.Identity.Name;
      try
      {
        return Ok(_repo.GetUserById(id));
      }
      catch (Exception error)
      {
        return BadRequest(error.Message);
      }
    }

    public AccountController(UserRepository repo)
    {
      _repo = repo;
    }

  }
}