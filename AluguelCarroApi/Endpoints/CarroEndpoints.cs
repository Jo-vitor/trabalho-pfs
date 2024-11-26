using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;

namespace AluguelCarroApi.Endpoints;

public static class CarroEndpoints
{

    public static void AdicionarCarrosEndpoints(this WebApplication app)
    {
        app.MapGet("/carros", Get).RequireAuthorization();
        app.MapGet("/carros/{id}", GetById).RequireAuthorization();
        app.MapPost("/carros", Post).RequireAuthorization("Admin");
        app.MapPut("/carros/{id}", Put).RequireAuthorization("AdminOuCliente");
        app.MapDelete("/carros/{id}", Delete).RequireAuthorization("Admin");
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
        obj.Ano = objNovo.Ano;
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
