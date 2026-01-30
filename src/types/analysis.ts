export interface Analysis {
  id: string;
  imageUri: string;
  bristolType: number;
  characteristics: string[];
  memo?: string;
  createdAt: string;
}

export interface BristolTypeInfo {
  type: number;
  name: string;
  description: string;
  characteristics: string[];
}
