using System;

namespace AluguelCarroApi.Models;

public class Carro
{
    public long Id { get; set; }
    public string Modelo { get; set; } = string.Empty;
    public int Ano { get; set; }
    public double Preco { get; set; }
    public bool Reservado { get; set; }

}
