import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: 'admin' | 'employee';
  _id: mongoose.Types.ObjectId;
}

const employeeSchema = new Schema<IEmployee>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  age: Number,
  class: String,
  subjects: [String],
  attendance: Number,
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
});

employeeSchema.index({ class: 1, name: 1 });

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
