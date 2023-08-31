﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Flyt.Migrations
{
    [DbContext(typeof(FlytDbContext))]
    [Migration("20230830185207_AdressUpdate")]
    partial class AdressUpdate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Flyt.Models.Adress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("City")
                        .HasColumnType("int");

                    b.Property<int>("Muncipality")
                        .HasColumnType("int");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ZipCode")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Adresses");
                });

            modelBuilder.Entity("Flyt.Models.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("Flyt.Models.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ArrivalTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ETA")
                        .HasColumnType("datetime2");

                    b.Property<int>("Kg")
                        .HasColumnType("int");

                    b.Property<DateTime>("LeaveTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("RouteId")
                        .HasColumnType("int");

                    b.Property<int>("Sequence")
                        .HasColumnType("int");

                    b.Property<int?>("StoppointId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RouteId");

                    b.HasIndex("StoppointId");

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("Flyt.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("Flyt.Models.IgnoreList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("StoppointId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StoppointId");

                    b.ToTable("IgnoreList");
                });

            modelBuilder.Entity("Flyt.Models.Route", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DriverId")
                        .HasColumnType("int");

                    b.Property<int?>("EndStoppointId")
                        .HasColumnType("int");

                    b.Property<int?>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DriverId");

                    b.HasIndex("EndStoppointId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Route");
                });

            modelBuilder.Entity("Flyt.Models.Stoppoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BrandId")
                        .HasColumnType("int");

                    b.Property<bool>("IsRecipient")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.ToTable("Stoppoints");
                });

            modelBuilder.Entity("Flyt.Models.StoppointAdress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdressId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("StoppointId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AdressId");

                    b.HasIndex("StoppointId");

                    b.ToTable("StoppointAdresses");
                });

            modelBuilder.Entity("Flyt.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MaxCargo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Flyt.Models.Destination", b =>
                {
                    b.HasOne("Flyt.Models.Route", "Route")
                        .WithMany("Destinations")
                        .HasForeignKey("RouteId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Flyt.Models.Stoppoint", "Stoppoint")
                        .WithMany("Destinations")
                        .HasForeignKey("StoppointId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Route");

                    b.Navigation("Stoppoint");
                });

            modelBuilder.Entity("Flyt.Models.IgnoreList", b =>
                {
                    b.HasOne("Flyt.Models.Stoppoint", "Stoppoint")
                        .WithMany("Ignores")
                        .HasForeignKey("StoppointId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Stoppoint");
                });

            modelBuilder.Entity("Flyt.Models.Route", b =>
                {
                    b.HasOne("Flyt.Models.Driver", "Driver")
                        .WithMany("Routes")
                        .HasForeignKey("DriverId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Flyt.Models.Stoppoint", "EndStoppoint")
                        .WithMany()
                        .HasForeignKey("EndStoppointId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Flyt.Models.Vehicle", "Vehicle")
                        .WithMany("Routes")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Driver");

                    b.Navigation("EndStoppoint");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Flyt.Models.Stoppoint", b =>
                {
                    b.HasOne("Flyt.Models.Brand", "Brand")
                        .WithMany("Stoppoints")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Brand");
                });

            modelBuilder.Entity("Flyt.Models.StoppointAdress", b =>
                {
                    b.HasOne("Flyt.Models.Adress", "Adress")
                        .WithMany("StoppointAdresses")
                        .HasForeignKey("AdressId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Flyt.Models.Stoppoint", "Stoppoint")
                        .WithMany("Adresses")
                        .HasForeignKey("StoppointId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Adress");

                    b.Navigation("Stoppoint");
                });

            modelBuilder.Entity("Flyt.Models.Adress", b =>
                {
                    b.Navigation("StoppointAdresses");
                });

            modelBuilder.Entity("Flyt.Models.Brand", b =>
                {
                    b.Navigation("Stoppoints");
                });

            modelBuilder.Entity("Flyt.Models.Driver", b =>
                {
                    b.Navigation("Routes");
                });

            modelBuilder.Entity("Flyt.Models.Route", b =>
                {
                    b.Navigation("Destinations");
                });

            modelBuilder.Entity("Flyt.Models.Stoppoint", b =>
                {
                    b.Navigation("Adresses");

                    b.Navigation("Destinations");

                    b.Navigation("Ignores");
                });

            modelBuilder.Entity("Flyt.Models.Vehicle", b =>
                {
                    b.Navigation("Routes");
                });
#pragma warning restore 612, 618
        }
    }
}
