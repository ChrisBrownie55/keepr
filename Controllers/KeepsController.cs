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


    [HttpGet("byId")]
    public Keep GetById(int id) => _repo.GetById(id);

    [HttpPost]
    [Authorize]
    public Keep Post([FromBody] Keep keep) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid Keep")
        : _repo.Create(keep);
  }
}