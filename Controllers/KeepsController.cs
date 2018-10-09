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

    [HttpGet("byUserId")]
    public IEnumerable<Keep> GetByUserId(string userId) => _repo.GetByUserId(userId);

    [HttpGet("searchByName")]
    public IEnumerable<Keep> SearchByName(string name) => _repo.SearchByName(name);

    [HttpPost]
    [Authorize]
    public Keep Create([FromBody] Keep keep) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid Keep")
        : _repo.Create(keep);

    [HttpPut]
    [Authorize]
    public Keep Update([FromBody] Keep keep) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid Keep")
        : _repo.Update(keep);

    [HttpDelete("byId")]
    [Authorize]
    public bool Delete([FromBody] int id) =>
      !ModelState.IsValid
        ? throw new Exception("Invalid id")
        : _repo.DeleteById(id);
  }
}