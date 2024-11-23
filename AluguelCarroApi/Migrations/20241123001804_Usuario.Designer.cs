﻿// <auto-generated />
using System;
using AluguelCarroApi.Infra;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AluguelCarroApi.Migrations
{
    [DbContext(typeof(AluguelContext))]
    [Migration("20241123001804_Usuario")]
    partial class Usuario
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("AluguelCarroApi.Models.Carro", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Ano")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Preco")
                        .HasColumnType("REAL");

                    b.Property<bool>("Reservado")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Carros");
                });

            modelBuilder.Entity("AluguelCarroApi.Models.Reserva", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CarroId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataInicio")
                        .HasColumnType("TEXT");

                    b.Property<int>("QuantidadeDias")
                        .HasColumnType("INTEGER");

                    b.Property<long>("UsuarioId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("ValorTotal")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.HasIndex("CarroId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Reservas");
                });

            modelBuilder.Entity("AluguelCarroApi.Models.Usuario", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("HashSenha")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("AluguelCarroApi.Models.Reserva", b =>
                {
                    b.HasOne("AluguelCarroApi.Models.Carro", "Carro")
                        .WithMany()
                        .HasForeignKey("CarroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AluguelCarroApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Carro");

                    b.Navigation("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
