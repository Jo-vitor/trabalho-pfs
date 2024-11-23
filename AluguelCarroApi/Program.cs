using System.Security.Claims;
using System.Text;
using AluguelCarroApi;
using AluguelCarroApi.Endpoints;
using AluguelCarroApi.Infra;
using AluguelCarroApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var root = AppDomain.CurrentDomain.BaseDirectory;
var dotenv = Path.Combine(root, ".env");
DotEnv.Load(dotenv);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AluguelContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => {
        builder.WithOrigins("http://localhost:3000");
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowCredentials();
    });
});

builder.Services.AddAuthentication(x => 
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x => 
{
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Config.Instancia.ChavePrivada ?? "")),
        ValidateIssuer = false,
        ValidateAudience = false
    };

    x.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx => 
        {
            ctx.Request.Cookies.TryGetValue("accessToken",out var accessToken);
            if(!string.IsNullOrEmpty(accessToken))
                ctx.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", policy => policy.RequireRole("Admin"))
    .AddPolicy("Cliente", policy => policy.RequireRole("Cliente"))
    .AddPolicy("AdminOuCliente", policy => policy.RequireClaim(ClaimTypes.Role, "Admin", "Cliente"));

builder.Services.AddSingleton<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.AdicionarCarrosEndpoints();
app.AdicionarReservasEndpoints();
app.AdicionarUsuariosEndpoints();
app.AdicionarLoginEndpoints();

app.Run();