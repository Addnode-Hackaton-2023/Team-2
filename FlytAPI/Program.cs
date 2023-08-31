using Microsoft.EntityFrameworkCore;
using Flyt;
using NuGet.Protocol;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddScoped<IDataService, DataService>();
builder.Services.AddControllers()
                .AddJsonOptions(options => { options.JsonSerializerOptions.ReferenceHandler = null;
                });

builder.Services.AddDbContext<FlytDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
