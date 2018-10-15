using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class KeepsController : Controller {
    KeepsRepository _repo;
    public KeepsController (KeepsRepository repo) {
      _repo = repo;
    }

    [HttpGet]
    public IActionResult Get () {
      try {
        return Ok (_repo.GetRandom ());
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpGet ("{id}")]
    public IActionResult GetById ([FromRoute] int id) {
      try {
        return Ok (_repo.GetById (id));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpGet ("share/{id}")]
    public IActionResult Share ([FromRoute] int id) {
      try {
        return Ok (_repo.Share (id));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpGet ("byUserId/{userId}")]
    public IActionResult GetByUserId ([FromRoute] string userId) {
      try {
        return Ok (_repo.GetByUserId (userId));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpGet ("searchByName")]
    public IActionResult SearchByName (string name) {
      try {
        return Ok (_repo.SearchByName (name));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create ([FromBody] Keep keep) {
      if (!ModelState.IsValid) {
        return BadRequest ("Invalid keep.");
      }
      keep.UserId = HttpContext.User.Identity.Name;
      try {
        return Ok (_repo.Create (keep));
      } catch (Exception error) {
        return BadRequest (error.Message);
      }
    }

    [HttpPut]
    [Authorize]
    public IActionResult Update ([FromBody] Keep keep) {
      if (!ModelState.IsValid) {
        return BadRequest ("Invalid Keep");
      }
      try {
        return Ok (_repo.Update (keep));
      } catch (Exception error) {
        return BadRequest (error);
      }
    }

    [HttpDelete ("{id}")]
    [Authorize]
    public IActionResult Delete ([FromRoute] int id) {
      if (!ModelState.IsValid) {
        return BadRequest ("Invalid id");
      }
      return Ok (_repo.DeleteById (id, HttpContext.User.Identity.Name));
    }
  }
}