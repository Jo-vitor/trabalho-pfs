using System;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;
using AluguelCarroApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AluguelCarroApi.Endpoints;

public static class LoginEndpoints
{
    public static void AdicionarLoginEndpoints(this WebApplication app)
    {
        app.MapPost("/login", PostLogin);
        app.MapPost("/logout", Logout);
    }

    private static async Task<IResult> PostLogin(Usuario infoUser, AluguelContext db, IPasswordHasher<Usuario> hasher, HttpContext context)
    {
        var usuario = await db.Usuarios.FirstOrDefaultAsync(x => x.Login.Equals(infoUser.Login));

        if(usuario == null) 
            return TypedResults.Unauthorized();

        var token = new TokenService().Gerar(usuario);

        context.Response.Cookies.Append(
            "accessToken",
            token,
            new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
            }
        );

        return TypedResults.Ok("usuario: "+usuario.Login);
    }

    private static IResult Logout(HttpContext contexto)
    {
        contexto.Response.Cookies.Delete("accessToken");

        return TypedResults.Ok();
    }
}
