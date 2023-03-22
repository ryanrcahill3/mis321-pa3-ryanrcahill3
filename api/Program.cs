using api.database;
using api.interfaces;
using api.models;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenPolicy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

app.UseCors("OpenPolicy");

app.MapControllers();

app.Run();

// System.Console.WriteLine("Hello World");
// DeleteSong.DropSongTable();
// SaveSong.CreateSongTable();

// DateOnly currentDate = new DateOnly();
// currentDate = DateOnly.FromDateTime(DateTime.Now);
// System.Console.WriteLine(currentDate);

// Song mySong = new Song() { Title = "Mistborn", Artist = "Brandon Sanderson", Date = $"{currentDate}", Favorited = true, Deleted = false };
// mySong.Save.CreateSong(mySong);

// mySong = new Song() { Title = "Oathbringer", Artist = "Brandon Sanderson", Date = $"{currentDate}", Favorited = true, Deleted = true };
// mySong.Save.CreateSong(mySong);
// System.Console.WriteLine(mySong);


// IReadAllData readObject = new ReadData();
// List<Song> allSongs = readObject.GetAllSongs();

// foreach (Song song in allSongs)
// {
//     System.Console.WriteLine(song.ToString());
// }



