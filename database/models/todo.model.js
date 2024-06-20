import {Schema, model, models} from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default models.Todo || model('Todo', TodoSchema);