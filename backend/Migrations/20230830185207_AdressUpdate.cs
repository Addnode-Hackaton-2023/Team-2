using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flyt.Migrations
{
    /// <inheritdoc />
    public partial class AdressUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Adresses",
                newName: "Street");

            migrationBuilder.AddColumn<int>(
                name: "City",
                table: "Adresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Muncipality",
                table: "Adresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ZipCode",
                table: "Adresses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Adresses");

            migrationBuilder.DropColumn(
                name: "Muncipality",
                table: "Adresses");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Adresses");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "Adresses",
                newName: "Text");
        }
    }
}
