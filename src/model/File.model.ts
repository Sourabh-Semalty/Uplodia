import mongoose, { Document, Schema, model } from "mongoose";

interface IFile extends Document {
  id: string;
  name: string;
  path: string;
  type: string;
  status: "processing" | "completed" | "failed" | "uploaded";
  uploaded_at: Date;
}

const FileSchema: Schema = new Schema({
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

const File = model<IFile>("File", FileSchema);

class FileModel {
  async create(data: Partial<IFile>) {
    return await File.create(data);
  }

  async findAll() {
    return await File.find();
  }

  async findByPk(id: string) {
    return await File.findOne({ id: id });
  }

  async deleteByPk(condition: { id: string }) {
    return await File.deleteOne(condition);
  }

  async update(data: Partial<IFile>, condition: { id: string }) {
    return await File.updateOne({ id: condition.id }, data);
  }
}

export default FileModel;
