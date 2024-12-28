"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FileSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String, required: true },
    status: {
        type: String,
        enum: ["processing", "completed", "failed", "uploaded"],
        required: true,
    },
    uploaded_at: { type: Date, default: Date.now },
});
const File = (0, mongoose_1.model)("File", FileSchema);
class FileModel {
    async create(data) {
        return await File.create(data);
    }
    async findAll() {
        return await File.find();
    }
    async findByPk(id) {
        return await File.findById(id);
    }
    async deleteByPk(condition) {
        return await File.deleteOne(condition);
    }
    async update(data, condition) {
        return await File.updateOne(condition, data);
    }
}
exports.default = FileModel;
