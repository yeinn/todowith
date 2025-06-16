export interface Todo {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoDto {
  text: string;
  userCode: string;
}

export interface UpdateTodoDto {
  text?: string;
  completed?: boolean;
} 