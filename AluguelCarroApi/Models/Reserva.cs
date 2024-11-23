using System;

namespace AluguelCarroApi.Models;

public class Reserva
{
    public long Id { get; set; }
    public DateTime DataInicio { get; set; }
    public int QuantidadeDias { get; set; }
    public double ValorTotal {get; set;}
    public Carro Carro { get; set; } = null!;
    public Usuario Usuario { get; set; } = null!;
}