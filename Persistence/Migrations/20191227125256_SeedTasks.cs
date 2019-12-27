using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedTasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AppTasks",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "Task1" });

            migrationBuilder.InsertData(
                table: "AppTasks",
                columns: new[] { "Id", "Title" },
                values: new object[] { 2, "Task2" });

            migrationBuilder.InsertData(
                table: "AppTasks",
                columns: new[] { "Id", "Title" },
                values: new object[] { 3, "Task3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AppTasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AppTasks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AppTasks",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
