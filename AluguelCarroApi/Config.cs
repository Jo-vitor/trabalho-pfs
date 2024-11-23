using System;

namespace AluguelCarroApi;

public class Config
{
    public string? ChavePrivada {get; set;}

    public static Config Instancia => instancia ??= new Config
    {
        ChavePrivada = Environment.GetEnvironmentVariable("PRIVATE_KEY")
    };
    private Config() {}
    private static Config? instancia = null; 
}
