using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace keepr.Models
{
  public class Keep
  {
    public int Id { get; set; }

    [Required]
    [MaxLength(20)]
    public string Name { get; set; }

    [Required]
    [MaxLength(255)]
    public string Description { get; set; }

    public string UserId { get; set; }

    [Required]
    [MaxLength(255)]
    public string Img { get; set; }

    [Required]
    public bool IsPrivate { get; set; }

    public int Views { get; set; } = 0;
    public int Shares { get; set; } = 0;
  }
}
