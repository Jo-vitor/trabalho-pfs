using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;
using Microsoft.EntityFrameworkCore;


namespace AluguelCarroApi.Endpoints;

public static class ReservaEndpoints
{
    public static void AdicionarReservasEndpoints(this WebApplication app)
    {
        app.MapGet("/reservas", Get).RequireAuthorization();
        app.MapGet("/reservas/{id}", GetById).RequireAuthorization();
        app.MapPost("/reservas", Post).RequireAuthorization();
        app.MapPut("/reservas/{id}", Put).RequireAuthorization();
        app.MapDelete("/reservas/{id}", Delete).RequireAuthorization();
    }

    private static IResult Get(AluguelContext db)
    {

        return TypedResults.Ok(db.Reservas
            .Include(r => r.Carro)
            .Include(r => r.Usuario)
            .ToList());
    }

    private static IResult GetById(long id, AluguelContext db)
    {
        var obj = db.Reservas
            .Include(r => r.Carro)
            .Include(r => r.Usuario)
            .FirstOrDefault(r => r.Id == id);

        if(obj == null)
            return TypedResults.NotFound();

        return TypedResults.Ok(obj);
    }

    private static IResult Post(Reserva obj, AluguelContext db)
    {
        var carroExistente = db.Carros.Find(obj.Carro.Id);

        if (carroExistente == null)
            return TypedResults.BadRequest();

        obj.Carro = carroExistente;
        db.Reservas.Add(obj);
        db.SaveChanges();
        
        return TypedResults.Created("", obj);
    }

    private static IResult Put(long id, Reserva objNovo, AluguelContext db)
    {
        if(id != objNovo.Id)
            return TypedResults.BadRequest();

        var obj = db.Reservas
            .Include(r => r.Carro)
            .Include(r => r.Usuario)
            .FirstOrDefault(r => r.Id == id);

        if(obj == null)
            return TypedResults.NotFound();

        obj.QuantidadeDias = objNovo.QuantidadeDias;
        obj.DataInicio = objNovo.DataInicio;
        obj.ValorTotal = objNovo.ValorTotal;
        
        db.Reservas.Update(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }

    private static IResult Delete(long id, AluguelContext db)
    {
        var obj = db.Reservas.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        db.Reservas.Remove(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }
}
