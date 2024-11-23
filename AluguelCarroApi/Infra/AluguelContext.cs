using System;
using AluguelCarroApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AluguelCarroApi.Infra;

public class AluguelContext : DbContext
{
    public DbSet<Carro> Carros {get; set;}
    public DbSet<Reserva> Reservas {get; set;}
    public DbSet<Usuario> Usuarios {get; set;}

    public AluguelContext()
    {
        caminho = @$"{AppDomain.CurrentDomain.BaseDirectory}\aluguel.db";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={caminho}");
    }

    private string caminho;
}
