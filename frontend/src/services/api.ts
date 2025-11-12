import { ENV } from '../config/env';
import { HttpClient } from './http';
import { AuthService } from '@/features/auth/auth.service';
import type * as PrismaTypes from '@/types/prisma-types';

// Create HTTP client with base URL and automatic auth/refresh handling
const httpClient = new HttpClient({
  baseUrl: ENV.API_BASE_URL,
  getAccessToken: () => AuthService.getValidAccessToken(),
  onUnauthorized: () => AuthService.handleUnauthorized(),
});

// ===== HELPERS =====
type DecimalLike = number | string | { toString(): string } | null | undefined;

const toNumber = (value: DecimalLike): number | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  if (typeof value === 'object' && typeof value.toString === 'function') {
    const parsed = Number(value.toString());
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

const toBoolean = (value: unknown): boolean | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') return value === 'true' || value === '1';
  return undefined;
};

const mapMetadata = (metadata: unknown | null): Record<string, unknown> | undefined => {
  if (!metadata || typeof metadata !== 'object') {
    return undefined;
  }
  return metadata as Record<string, unknown>;
};

const mapMCode = (code: PrismaTypes.PrismaMCode): MCode => ({
  id: code.id,
  category: code.category,
  code: code.code,
  name: code.name,
  description: code.description ?? undefined,
  sortOrder: code.sortOrder,
  isActive: code.isActive,
  metadata: mapMetadata(code.metadata),
});

const mapSupplier = (supplier: PrismaTypes.PrismaSupplier | null | undefined): Supplier | undefined => {
  if (!supplier) {
    return undefined;
  }
  return {
    id: supplier.id,
    supplierNo: supplier.supplierNo,
    supplierName: supplier.supplierName,
    supplierZipCode: supplier.supplierZipCode ?? undefined,
    supplierAddress: supplier.supplierAddress ?? undefined,
    manager: supplier.manager ?? undefined,
    email1: supplier.email1 ?? undefined,
    email2: supplier.email2 ?? undefined,
  };
};

const mapStore = (store: PrismaTypes.PrismaStore | null | undefined): Store | undefined => {
  if (!store) {
    return undefined;
  }
  return {
    id: store.id,
    name: store.name,
    code: store.code ?? undefined,
    address: store.address ?? undefined,
    phone: store.phone ?? undefined,
    email: store.email ?? undefined,
    isActive: store.isActive,
    region: store.region ?? undefined,
    managerName: store.managerName ?? undefined,
  };
};

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

type HeavyFabricMasterResponse = PrismaTypes.PrismaHeavyFabricMaster;

const mapHeavyFabric = (item: HeavyFabricMasterResponse): HeavyFabricMaster => ({
  id: item.id,
  fabricManufacturer: item.fabric_manufacturer ?? undefined,
  fabricNo: item.fabric_no,
  color: item.color ?? undefined,
  fabricPattern: item.fabric_pattern ?? undefined,
  composition: item.composition ?? undefined,
  fabricProperties: item.fabric_properties ?? undefined,
  fairFabricPrice: toNumber(item.fair_fabric_price),
  fairFabricRank: item.fair_fabric_rank ?? undefined,
  regularFabricPrice: toNumber(item.regular_fabric_price),
  regularFabricRank: item.regular_fabric_rank ?? undefined,
  fabricDataUpdate: item.fabric_data_update ?? undefined,
  large: toBoolean(item.large) ?? undefined,
  fabricSheer: toBoolean(item.fabric_sheer) ?? undefined,
  stockFlag: toBoolean(item.stock_flag) ?? undefined,
  supplierId: item.supplierId,
  supplier: mapSupplier(item.supplier),
});

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
  itemTypeCode?: MCode;
  createdAt?: string;
  updatedAt?: string;
}

type PatternMasterResponse = PrismaTypes.PrismaPatternMaster;

const mapPatternMaster = (pattern: PatternMasterResponse): PatternMaster => ({
  id: pattern.id,
  itemTypeCodeId: pattern.itemTypeCodeId,
  patternNo: pattern.patternNo,
  size: pattern.size ?? undefined,
  length: toNumber(pattern.length),
  shoulderWidth: toNumber(pattern.shoulderWidth),
  bust: toNumber(pattern.bust),
  waist: toNumber(pattern.waist),
  hip: toNumber(pattern.hip),
  sleeveLength: toNumber(pattern.sleeveLength),
  sleeveWidth: toNumber(pattern.sleeveWidth),
  lapelWidth: toNumber(pattern.lapelWidth),
  crotchWidth: toNumber(pattern.crotchWidth),
  kneeWidth: toNumber(pattern.kneeWidth),
  hemWidth: toNumber(pattern.hemWidth),
  rise: toNumber(pattern.rise),
  inseam: toNumber(pattern.inseam),
  stitchSpec: pattern.stitchSpec ?? undefined,
  liningSpec: pattern.liningSpec ?? undefined,
  defaultButtonCount: pattern.defaultButtonCount ?? undefined,
  isActive: pattern.isActive,
  itemTypeCode: mapMCode(pattern.itemTypeCode),
  createdAt: pattern.createdAt ?? undefined,
  updatedAt: pattern.updatedAt ?? undefined,
});

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

export type StoreInput = Partial<Omit<Store, 'id'>> & { name: string };

export interface StaffMember {
  id: number;
  name: string;
  storeId: number;
  email?: string;
  phone?: string;
  role?: string;
  store?: {
    id: number;
    name: string;
    code?: string | null;
  };
}

export interface StaffInput {
  name: string;
  storeId: number;
  email?: string;
  phone?: string;
  role?: string;
}

type StaffResponse = PrismaTypes.PrismaStaffOfStore;

const mapStaffMember = (staff: StaffResponse): StaffMember => {
  const store = mapStore(staff.store);
  return {
    id: staff.id,
    name: staff.name,
    storeId: staff.storeId,
    email: staff.email ?? undefined,
    phone: staff.phone ?? undefined,
    role: staff.role ?? undefined,
    store: store ? { id: store.id, name: store.name, code: store.code ?? undefined } : undefined,
  };
};

// ===== API SERVICE =====
export class ApiService {
  // MCode APIs
  static async getMCodes(category?: string): Promise<MCode[]> {
    const url = category ? `/m-codes?category=${category}` : '/m-codes';
    const response = await httpClient.get<PrismaTypes.PrismaMCode[]>(url);
    return response.map(mapMCode);
  }

  static async getPlans(): Promise<Plan[]> {
    const response = await this.getMCodes('PLAN');
    return response.filter((item): item is Plan => item.category === 'PLAN');
  }

  static async getItemTypes(): Promise<ItemType[]> {
    const response = await this.getMCodes('ITEM_TYPE');
    return response.filter((item): item is ItemType => item.category === 'ITEM_TYPE');
  }

  // Heavy Fabric Master APIs
  static async getHeavyFabrics(params?: { skip?: number; take?: number; search?: string }): Promise<HeavyFabricMaster[]> {
    const queryParams = new URLSearchParams();
    if (params?.skip !== undefined) queryParams.append('skip', String(params.skip));
    if (params?.take !== undefined) queryParams.append('take', String(params.take));
    if (params?.search) queryParams.append('search', params.search);

    const url = `/heavy-fabric-master${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await httpClient.get<HeavyFabricMasterResponse[]>(url);
    return response.map(mapHeavyFabric);
  }

  static async getHeavyFabricById(id: number): Promise<HeavyFabricMaster> {
    const response = await httpClient.get<HeavyFabricMasterResponse>(`/heavy-fabric-master/${id}`);
    return mapHeavyFabric(response);
  }

  static async searchHeavyFabrics(query: string): Promise<HeavyFabricMaster[]> {
    const response = await httpClient.get<HeavyFabricMasterResponse[]>(`/heavy-fabric-master/search?q=${encodeURIComponent(query)}`);
    return response.map(mapHeavyFabric);
  }

  // Pattern Master APIs
  static async getPatterns(): Promise<PatternMaster[]> {
    const response = await httpClient.get<PatternMasterResponse[]>('/pattern-masters');
    return response.map(mapPatternMaster);
  }

  static async getPatternById(id: number): Promise<PatternMaster> {
    const response = await httpClient.get<PatternMasterResponse>(`/pattern-masters/${id}`);
    return mapPatternMaster(response);
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
    const response = await httpClient.get<PrismaTypes.PrismaStore[]>('/stores');
    return response.map((store) => mapStore(store)).filter((store): store is Store => !!store);
  }

  static async createStore(data: StoreInput): Promise<Store> {
    const response = await httpClient.post<PrismaTypes.PrismaStore, StoreInput>('/stores', data);
    const store = mapStore(response);
    if (!store) {
      throw new Error('店舗情報の変換に失敗しました');
    }
    return store;
  }

  static async updateStore(id: number, data: Partial<StoreInput>): Promise<Store> {
    const response = await httpClient.patch<PrismaTypes.PrismaStore, Partial<StoreInput>>(`/stores/${id}`, data);
    const store = mapStore(response);
    if (!store) {
      throw new Error('店舗情報の変換に失敗しました');
    }
    return store;
  }

  static async deleteStore(id: number): Promise<void> {
    await httpClient.delete(`/stores/${id}`);
  }

  // Supplier APIs
  static async getSuppliers(): Promise<Supplier[]> {
    const response = await httpClient.get<PrismaTypes.PrismaSupplier[]>('/suppliers');
    return response.map((supplier) => mapSupplier(supplier)).filter((supplier): supplier is Supplier => !!supplier);
  }

  // Staff APIs
  static async getStaff(): Promise<StaffMember[]> {
    const response = await httpClient.get<StaffResponse[]>('/staff');
    return response.map(mapStaffMember);
  }

  static async createStaff(data: StaffInput): Promise<StaffMember> {
    const response = await httpClient.post<StaffResponse, StaffInput>('/staff', data);
    return mapStaffMember(response);
  }

  static async updateStaff(id: number, data: Partial<StaffInput>): Promise<StaffMember> {
    const response = await httpClient.patch<StaffResponse, Partial<StaffInput>>(`/staff/${id}`, data);
    return mapStaffMember(response);
  }

  static async deleteStaff(id: number): Promise<void> {
    await httpClient.delete(`/staff/${id}`);
  }
}
