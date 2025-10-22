const API_BASE_URL = 'http://localhost:3000/api';

export interface Plan {
  id: number;
  code: string;
  name: string;
}

export interface ItemType {
  id: number;
  code: string;
  name: string;
}

export class ApiService {
  private static async fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async getPlans(): Promise<Plan[]> {
    return this.fetchData<Plan[]>('/plans');
  }

  static async getItemTypes(): Promise<ItemType[]> {
    return this.fetchData<ItemType[]>('/item-types');
  }
}
