export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  category_id: string;
  type: string;
  url?: string;
  file_path?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}