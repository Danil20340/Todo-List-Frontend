export interface User {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  login: string;
  manager_id: number | null;
  full_name: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'cancelled' | 'Выбрать статус';
export type TaskPriority = 'low' | 'medium' | 'high' | 'Выбрать приоритет';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  created_at: string;
  updated_at: string;
  priority: TaskPriority;
  status: TaskStatus;
  creator_id: number;
  creator_name: string;
  assignee_id: number | null;

  assignee_name?: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
  due_date: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee_id: number;
}

export type TaskUpdateRequest = Partial<TaskCreateRequest>;
