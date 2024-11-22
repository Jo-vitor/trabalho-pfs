using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;

namespace AluguelCarroApi.Endpoints;

public static class CarroEndpoints
{

    public static void AdicionarCarrosEndpoints(this WebApplication app)
    {
        app.MapGet("/carros", Get);
        app.MapGet("/carros/{id}", GetById);
        app.MapPost("/carros", Post);
        app.MapPut("/carros/{id}", Put);
        app.MapDelete("/carros/{id}", Delete);
    }

    private static IResult Get(AluguelContext db)
    {
        return TypedResults.Ok(db.Carros.ToList());
    }

    private static IResult GetById(long id, AluguelContext db)
    {
        var obj = db.Carros.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        
        return TypedResults.Ok(obj);
    }

    private static IResult Post(Carro obj, AluguelContext db)
    {
        db.Carros.Add(obj);
        db.SaveChanges();
        
        return TypedResults.Created("", obj);
    }

    private static IResult Put(long id, Carro objNovo, AluguelContext db)
    {
        if(id != objNovo.Id)
            return TypedResults.BadRequest();

        var obj = db.Carros.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        obj.Modelo = objNovo.Modelo;
        obj.Preco = objNovo.Preco;
        obj.Reservado = objNovo.Reservado;
        
        db.Carros.Update(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }

    private static IResult Delete(long id, AluguelContext db)
    {
        var obj = db.Carros.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        db.Carros.Remove(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }
}
