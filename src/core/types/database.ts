// Tipagem manual simulando o banco de dados
export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          full_name: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          full_name: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          full_name?: string;
          active?: boolean;
        };
      };
    };
  };
}

export interface Question {
  id: string;
  text: string;
  category: string;
}
