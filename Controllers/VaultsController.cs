using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class VaultsController : Controller
  {
    VaultsRepository _repo;
    public VaultsController(VaultsRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public IEnumerable<Vault> Get() => _repo.GetVaults(HttpContext.User.Identity.Name);

    [HttpGet("keeps")]
    public IEnumerable<Keep> GetKeeps(int vaultId) => _repo.GetKeepsFromVault(vaultId);

    [HttpPost]
    public Vault Create(Vault vault)
    {
      if (!ModelState.IsValid)
      {
        throw new Exception("Invalid vault");
      }
      vault.UserId = HttpContext.User.Identity.Name;
      return _repo.Create(vault);
    }

    [HttpPut]
    public Vault Update(Vault vault) => _repo.Update(vault);

    [HttpDelete]
    public bool Delete(int id) => _repo.DeleteById(id, HttpContext.User.Identity.Name);
  }

}