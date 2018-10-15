using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  [Authorize]
  public class VaultsController : Controller {
    VaultsRepository _repo;
    public VaultsController (VaultsRepository repo) {
      _repo = repo;
    }

    [HttpGet]
    public IEnumerable<Vault> Get () => _repo.GetVaults (HttpContext.User.Identity.Name);

    [HttpGet ("{id}")]
    public IActionResult GetById ([FromRoute] int id) {
      try {
        return Ok (_repo.GetById (id, HttpContext.User.Identity.Name));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpGet ("keeps/{vaultId}")]
    public IActionResult GetKeeps ([FromRoute] int vaultId) {
      try {
        return Ok (_repo.GetKeepsFromVault (vaultId));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpPost]
    public IActionResult Create ([FromBody] Vault vault) {
      if (!ModelState.IsValid) {
        return BadRequest ("Invalid vault");
      }

      vault.UserId = HttpContext.User.Identity.Name;
      try {
        return Ok (_repo.Create (vault));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpPut]
    public IActionResult Update ([FromBody] Vault vault) {
      try {
        return Ok (_repo.Update (vault));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpDelete ("{id}")]
    public IActionResult Delete ([FromRoute] int id) {
      try {
        return Ok (_repo.DeleteById (id, HttpContext.User.Identity.Name));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpPost ("storeInVault")]
    [Authorize]
    public IActionResult storeInVault ([FromBody] VaultKeep vaultKeep) {
      if (!ModelState.IsValid) {
        return BadRequest ("Invalid Vault Keep relationship");
      }

      vaultKeep.UserId = HttpContext.User.Identity.Name;
      try {
        return Ok (_repo.StoreInVault (vaultKeep));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpDelete ("removeFromVault/{keepId}")]
    [Authorize]
    public IActionResult removeFromVault ([FromRoute] int keepId) {
      try {
        return Ok (_repo.RemoveFromVault (keepId, HttpContext.User.Identity.Name));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }
  }

}