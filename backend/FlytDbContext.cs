using Flyt.Configuration;
using Flyt.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class FlytDbContext : DbContext
{
    public DbSet<Adress> Adresses { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Destination> Destinations { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<IgnoreList> IgnoreList { get; set; }
    public DbSet<Route> Route { get; set; }
    public DbSet<Stoppoint> Stoppoints { get; set; }
    public DbSet<StoppointAdress> StoppointAdresses { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }

    public string ConnectionString { get; }

    public FlytDbContext()
    {
        ConnectionString = @"Server=tcp:add-hack.database.windows.net,1433;Initial Catalog=add-hack-2;Persist Security Info=False;User ID=addhack2;Password=Dontwastefood1!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    }

    public FlytDbContext(string connectionString)
    {
        this.ConnectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlServer(ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AdressConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(BrandConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(DestinationConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(DriverConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(IgnoreListConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(RouteConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(StoppointConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(StoppointAdressConfiguration).Assembly)
        .ApplyConfigurationsFromAssembly(typeof(VehicleConfiguration).Assembly);
    }
}