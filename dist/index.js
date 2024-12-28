"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_db_1 = require("./db/mysql.db");
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
async function main() {
    await mysql_db_1.Db.init();
    app
        .use(express_1.default.json())
        .use(express_1.default.urlencoded({ extended: true }))
        .use("/v1/api/file", file_routes_1.default)
        .get("/", (req, res) => {
        res.send("Hello World!");
    });
    const server = app.listen(port, () => {
        console.log(`server listening on http://localhost:${port}`);
    });
}
main().catch((err) => {
    console.log(err);
});
