using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class KeepsController : Controller
  {
    KeepsRepository _repo;
    public KeepsController(KeepsRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public IEnumerable<Keep> Get() => _repo.GetRandom();

    [HttpGet("{id}")]
    public Keep GetById([FromRoute] int id) => _repo.GetById(id);

    [HttpGet("share/{id}")]
    public int Share([FromRoute] int id) => _repo.Share(id);

    [HttpGet("byUserId/{userId}")]
    public IEnumerable<Keep> GetByUserId([FromRoute] string userId) => _repo.GetByUserId(userId);

    [HttpGet("searchByName")]
    public IEnumerable<Keep> SearchByName(string name) => _repo.SearchByName(name);

    [HttpPost]
    [Authorize]
    public Keep Create([FromBody] Keep keep)
    {
      if (!ModelState.IsValid)
      {
        throw new Exception("Invalid Keep");
      }
      keep.UserId = HttpContext.User.Identity.Name;
      return _repo.Create(keep);
    }


    [HttpPost("storeInVault")]
    [Authorize]
    public bool storeInVault([FromBody] VaultKeep vaultKeep)
    {
      if (!ModelState.IsValid)
      {
        throw new Exception("Invalid Vault Keep relationship");
      }
      vaultKeep.UserId = HttpContext.User.Identity.Name;
      return _repo.StoreInVault(vaultKeep);
    }

    [HttpDelete("removeFromVault/{keepId}")]
    [Authorize]
    public bool removeFromVault([FromRoute] int keepId)
    {
      return _repo.RemoveFromVault(keepId, HttpContext.User.Identity.Name);
    }

    [HttpPut]
    [Authorize]
    public bool Update([FromBody] Keep keep) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid Keep")
        : _repo.Update(keep);

    [HttpDelete("{id}")]
    [Authorize]
    public bool Delete([FromRoute] int id) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid id")
        : _repo.DeleteById(id, HttpContext.User.Identity.Name);
  }
}