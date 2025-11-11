import { ENV } from '../config/env';
import { HttpClient } from './http';

// Create HTTP client with base URL
const httpClient = new HttpClient({ baseUrl: ENV.API_BASE_URL });

// ===== TYPES =====
export interface MCode {
  id: number;
  category: string;
  code: string;
  name: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface Plan extends MCode {
  category: 'PLAN';
}

export interface ItemType extends MCode {
  category: 'ITEM_TYPE';
}

export interface HeavyFabricMaster {
  id: number;
  fabricManufacturer?: string;
  fabricNo: string;
  color?: string;
  fabricPattern?: string;
  composition?: string;
  fabricProperties?: string;
  fairFabricPrice?: number;
  fairFabricRank?: string;
  regularFabricPrice?: number;
  regularFabricRank?: string;
  fabricDataUpdate?: string;
  large?: boolean;
  fabricSheer?: boolean;
  stockFlag?: boolean;
  supplierId: number;
  supplier?: Supplier;
}

export interface Supplier {
  id: number;
  supplierNo: string;
  supplierName: string;
  supplierZipCode?: string;
  supplierAddress?: string;
  manager?: string;
  email1?: string;
  email2?: string;
}

export interface PatternMaster {
  id: number;
  itemTypeCodeId: number;
  patternNo: string;
  size?: string;
  length?: number;
  shoulderWidth?: number;
  bust?: number;
  waist?: number;
  hip?: number;
  sleeveLength?: number;
  sleeveWidth?: number;
  lapelWidth?: number;
  crotchWidth?: number;
  kneeWidth?: number;
  hemWidth?: number;
  rise?: number;
  inseam?: number;
  stitchSpec?: string;
  liningSpec?: string;
  defaultButtonCount?: number;
  isActive: boolean;
}

export interface BodyLiningMaster {
  id: number;
  productNo: string;
  colorNo?: string;
  orientation?: string;
  stockFlag?: boolean;
}

export interface SleeveLiningMaster {
  id: number;
  productNo: string;
  colorNo?: string;
  orientation?: string;
  stockFlag?: boolean;
}

export interface HeavyFabricButtonMaster {
  id: number;
  productNo: string;
  colorNo?: string;
  pantsProductNo?: string;
  pantsColorNo?: string;
  cost1?: number;
  cost2?: number;
  cost3?: number;
  cost4?: number;
  cost5?: number;
  cost6?: number;
  cost7?: number;
  cost8?: number;
  retailPrice1?: number;
  retailPrice2?: number;
  retailPrice3?: number;
  retailPrice4?: number;
  retailPrice5?: number;
  retailPrice6?: number;
  retailPrice7?: number;
  retailPrice8?: number;
}

export interface OptionMaster {
  id: number;
  optionName: string;
  cost?: number;
  retailPrice?: number;
  textContent?: string;
}

export interface Customer {
  id: number;
  name: string;
  kana?: string;
  phone?: string;
  email?: string;
  note?: string;
  customerCode?: string;
  birthDate?: string;
  address?: string;
  isActive: boolean;
}

export interface Store {
  id: number;
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  region?: string;
  managerName?: string;
}

// ===== API SERVICE =====
export class ApiService {
  // MCode APIs
  static async getMCodes(category?: string): Promise<MCode[]> {
    const url = category ? `/m-codes?category=${category}` : '/m-codes';
    return httpClient.get<MCode[]>(url);
  }

  static async getPlans(): Promise<Plan[]> {
    return httpClient.get<Plan[]>('/m-codes?category=PLAN');
  }

  static async getItemTypes(): Promise<ItemType[]> {
    return httpClient.get<ItemType[]>('/m-codes?category=ITEM_TYPE');
  }

  // Heavy Fabric Master APIs
  static async getHeavyFabrics(params?: { skip?: number; take?: number; search?: string }): Promise<HeavyFabricMaster[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip !== undefined) queryParams.append('skip', String(params.skip));
    if (params?.take !== undefined) queryParams.append('take', String(params.take));
    if (params?.search) queryParams.append('search', params.search);
    
    const url = `/heavy-fabric-master${queryParams.toString() ? `?${queryParams}` : ''}`;
    return httpClient.get<HeavyFabricMaster[]>(url);
  }

  static async getHeavyFabricById(id: number): Promise<HeavyFabricMaster> {
    return httpClient.get<HeavyFabricMaster>(`/heavy-fabric-master/${id}`);
  }

  static async searchHeavyFabrics(query: string): Promise<HeavyFabricMaster[]> {
    return httpClient.get<HeavyFabricMaster[]>(`/heavy-fabric-master/search?q=${encodeURIComponent(query)}`);
  }

  // Pattern Master APIs
  static async getPatterns(): Promise<PatternMaster[]> {
    return httpClient.get<PatternMaster[]>('/pattern-masters');
  }

  static async getPatternById(id: number): Promise<PatternMaster> {
    return httpClient.get<PatternMaster>(`/pattern-masters/${id}`);
  }

  // Body Lining Master APIs
  static async getBodyLinings(): Promise<BodyLiningMaster[]> {
    return httpClient.get<BodyLiningMaster[]>('/body-lining-master');
  }

  // Sleeve Lining Master APIs
  static async getSleeveLinings(): Promise<SleeveLiningMaster[]> {
    return httpClient.get<SleeveLiningMaster[]>('/sleeve-lining-master');
  }

  // Heavy Fabric Button Master APIs
  static async getHeavyFabricButtons(): Promise<HeavyFabricButtonMaster[]> {
    return httpClient.get<HeavyFabricButtonMaster[]>('/heavy-fabric-button-master');
  }

  // Option Master APIs
  static async getOptions(): Promise<OptionMaster[]> {
    return httpClient.get<OptionMaster[]>('/option-master');
  }

  // Customer APIs
  static async getCustomers(): Promise<Customer[]> {
    return httpClient.get<Customer[]>('/customers');
  }

  static async getCustomerById(id: number): Promise<Customer> {
    return httpClient.get<Customer>(`/customers/${id}`);
  }

  static async createCustomer(data: Partial<Customer>): Promise<Customer> {
    return httpClient.post<Customer, Partial<Customer>>('/customers', data);
  }

  static async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
    return httpClient.patch<Customer, Partial<Customer>>(`/customers/${id}`, data);
  }

  // Store APIs
  static async getStores(): Promise<Store[]> {
    return httpClient.get<Store[]>('/stores');
  }

  // Supplier APIs
  static async getSuppliers(): Promise<Supplier[]> {
    return httpClient.get<Supplier[]>('/suppliers');
  }
}
