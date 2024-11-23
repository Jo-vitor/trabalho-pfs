using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;
using Microsoft.AspNetCore.Identity;

namespace AluguelCarroApi.Endpoints;

public static class UsuarioEndpoints
{
    public static void AdicionarUsuariosEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/usuarios");

        group.MapGet("", Get);
        group.MapGet("/{id}", GetById).RequireAuthorization("AdminOuCliente");
        group.MapPost("/cliente", Post);
        group.MapPost("/adm", PostAdm).RequireAuthorization("Admin");
        group.MapPut("/{id}", Put).RequireAuthorization("AdminOuCliente");
        group.MapDelete("/{id}", Delete).RequireAuthorization("AdminOuCliente");
    }

    private static IResult Get(AluguelContext db)
    {
        return TypedResults.Ok(db.Usuarios.ToList());
    }

    private static IResult GetById(long id, AluguelContext db)
    {
        var obj = db.Usuarios.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        
        return TypedResults.Ok(obj);
    }

    private static IResult Post(Usuario obj, AluguelContext db, IPasswordHasher<Usuario> hasher)
    {
        obj.Role = "Cliente";
        obj.HashSenha = hasher.HashPassword(obj, obj.HashSenha);
        db.Usuarios.Add(obj);
        db.SaveChanges();
        
        return TypedResults.Created("", obj);
    }

    private static IResult PostAdm(Usuario obj, AluguelContext db, IPasswordHasher<Usuario> hasher)
    {
        obj.Role = "Admin";
        obj.HashSenha = hasher.HashPassword(obj, obj.HashSenha);
        db.Usuarios.Add(obj);
        db.SaveChanges();
        
        return TypedResults.Created("", obj);
    }

    private static IResult Put(long id, Usuario objNovo, AluguelContext db)
    {
        if(id != objNovo.Id)
            return TypedResults.BadRequest();

        var obj = db.Usuarios.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        // obj.Modelo = objNovo.Modelo;
        // obj.Preco = objNovo.Preco;
        // obj.Reservado = objNovo.Reservado;
        
        db.Usuarios.Update(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }

    private static IResult Delete(long id, AluguelContext db)
    {
        var obj = db.Usuarios.Find(id);

        if(obj == null)
            return TypedResults.NotFound();

        db.Usuarios.Remove(obj);
        db.SaveChanges();

        return TypedResults.NoContent();
    }
}
