using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;

namespace AluguelCarroApi.Endpoints;

public static class ReservaEndpoints
{
    public static void AdicionarReservasEndpoints(this WebApplication app)
    {
        app.MapGet("/reservas", Get);
        app.MapGet("/reservas/{id}", GetById);
        app.MapPost("/reservas", Post);
        app.MapPut("/reservas/{id}", Put);
        app.MapDelete("/reservas/{id}", Delete);
    }

    private static IResult Get(AluguelContext db)
    {
        return TypedResults.Ok(db.Reservas.ToList());
    }

    private static IResult GetById(long id, AluguelContext db)
    {
        var obj = db.Reservas.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        
        return TypedResults.Ok(obj);
    }

    private static IResult Post(Reserva obj, AluguelContext db)
    {
        var carroExistente = db.Carros.Find(obj.Carro.Id);

        if (carroExistente == null)
            return TypedResults.BadRequest();

        obj.Id = 1;
        obj.Carro = carroExistente;
        db.Reservas.Add(obj);
        db.SaveChanges();
        
        return TypedResults.Created("", obj);
    }

    private static IResult Put(long id, Reserva objNovo, AluguelContext db)
    {
        if(id != objNovo.Id)
            return TypedResults.BadRequest();

        var obj = db.Reservas.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        obj.QuantidadeDias = objNovo.QuantidadeDias;
        obj.DataInicio = objNovo.DataInicio;
        obj.ValorTotal = objNovo.ValorTotal;
        obj.Carro = objNovo.Carro;
        
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
