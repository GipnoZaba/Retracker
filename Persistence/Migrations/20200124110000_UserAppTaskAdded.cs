using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserAppTaskAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAppTasks",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    AppTaskId = table.Column<Guid>(nullable: false),
                    IsCreator = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAppTasks", x => new { x.AppUserId, x.AppTaskId });
                    table.ForeignKey(
                        name: "FK_UserAppTasks_AppTasks_AppTaskId",
                        column: x => x.AppTaskId,
                        principalTable: "AppTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAppTasks_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAppTasks_AppTaskId",
                table: "UserAppTasks",
                column: "AppTaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAppTasks");
        }
    }
}
