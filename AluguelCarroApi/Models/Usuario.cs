using System;

namespace AluguelCarroApi.Models;

public class Usuario
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Login { get; set; } = string.Empty;
    public string HashSenha { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
