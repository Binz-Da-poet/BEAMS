/**
 * THIS FILE IS AUTO-GENERATED.
 * Run `npm run generate:frontend-types` from the backend directory after updating prisma schema.
 */
/* eslint-disable */

export type PrismaUserRole = 'ADMIN' | 'STORE' | 'FACTORY_STAFF';

export interface PrismaUser {
  id: number;
  username: string;
  password: string;
  role: PrismaUserRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  storeId: number | null;
  store: PrismaStore | null;
  staffId: number | null;
  staff: PrismaStaff | null;
  orderLogs: PrismaOrderLog[];
  notifications: PrismaNotification[];
  deletedStores: PrismaStore[];
}
export interface PrismaOrderLog {
  id: number;
  orderId: number;
  userId: number;
  statusId: number;
  action: string;
  description: string | null;
  oldValues: unknown | null;
  newValues: unknown | null;
  createdAt: string;
  order: PrismaOrder;
  user: PrismaUser;
  status: PrismaMCode;
}
export interface PrismaDocument {
  id: number;
  typeId: number;
  type: PrismaMCode | null;
  fileName: string;
  filePath: string;
  fileSize: number | null;
  generatedAt: string;
  generatedBy: number;
}
export interface PrismaNotification {
  id: number;
  userId: number;
  title: string;
  message: string;
  typeId: number;
  type: PrismaMCode | null;
  isRead: boolean;
  data: unknown | null;
  createdAt: string;
  readAt: string | null;
  user: PrismaUser;
}
export interface PrismaMCode {
  id: number;
  category: string;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  orderPlanCodes: PrismaOrder[];
  orderPickupMethodCodes: PrismaOrder[];
  orderItemTypeCodes: PrismaOrder[];
  orderStatusCodes: PrismaOrder[];
  orderLogStatusCodes: PrismaOrderLog[];
  measurementTypeItemTypeCodes: PrismaMeasurementType[];
  patternMasterItemTypeCodes: PrismaPatternMaster[];
  coatSeasonCodes: PrismaCoatDetails[];
  suitSeasonCodes: PrismaSuitDetails[];
  pantsSeasonCodes: PrismaPantsDetails[];
  vestSeasonCodes: PrismaVestDetails[];
  jacketBodyLiningOrientationCodes: PrismaJacketDetails[];
  jacketSleeveLiningOrientationCodes: PrismaJacketDetails[];
  coatBodyLiningOrientationCodes: PrismaCoatDetails[];
  coatSleeveLiningOrientationCodes: PrismaCoatDetails[];
  suitBodyLiningOrientationCodes: PrismaSuitDetails[];
  suitSleeveLiningOrientationCodes: PrismaSuitDetails[];
  vestBodyLiningOrientationCodes: PrismaVestDetails[];
  documents: PrismaDocument[];
  notifications: PrismaNotification[];
}
export interface PrismaStore {
  id: number;
  name: string;
  code: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: number | null;
  orders: PrismaOrder[];
  users: PrismaUser[];
  staffOfStores: PrismaStaffOfStore[];
  deletedByUser: PrismaUser | null;
}
export interface PrismaStaffOfStore {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  role: string | null;
  storeId: number;
  store: PrismaStore;
  orders: PrismaOrder[];
}
export interface PrismaOrder {
  id: number;
  storeId: number;
  planCodeId: number;
  statusId: number;
  receptionDate: string;
  expectedStoreArrivalDate: string | null;
  pickupMethodCodeId: number | null;
  salesPrice: number | null;
  orderNo: string | null;
  notes: string | null;
  customerSurname: string | null;
  customerName: string | null;
  customerSurnameFurigana: string | null;
  customerNameFurigana: string | null;
  customerPhone: string | null;
  customerZipCode: string | null;
  customerAddress: string | null;
  beamsClubId: string | null;
  estimatedCompletionDate: string | null;
  actualCompletionDate: string | null;
  isUrgent: boolean;
  internalNotes: string | null;
  itemTypeCodeId: number;
  staffOfStoreId: number | null;
  unitPrice: number | null;
  orderPeriodStart: string | null;
  orderPeriodEnd: string | null;
  createdAt: string;
  updatedAt: string;
  planCode: PrismaMCode;
  pickupMethodCode: PrismaMCode | null;
  store: PrismaStore;
  status: PrismaMCode;
  itemTypeCode: PrismaMCode;
  staffOfStore: PrismaStaffOfStore | null;
  jacketDetails: PrismaJacketDetails | null;
  coatDetails: PrismaCoatDetails | null;
  suitDetails: PrismaSuitDetails | null;
  pantsDetails: PrismaPantsDetails | null;
  vestDetails: PrismaVestDetails | null;
  logs: PrismaOrderLog[];
}
export interface PrismaStaff {
  id: number;
  staffNumber: string;
  name: string;
  email: string | null;
  phone: string | null;
  users: PrismaUser[];
}
export interface PrismaJacketDetails {
  orderId: number;
  fabricId: number | null;
  patternId: number | null;
  bodyLiningId: number | null;
  bodyLiningColorNo: string | null;
  bodyLiningOrientationCodeId: number | null;
  sleeveLiningId: number | null;
  sleeveLiningColorNo: string | null;
  sleeveLiningOrientationCodeId: number | null;
  liningSpec: string | null;
  buttonId: number | null;
  buttonColorNo: string | null;
  optionsId: number | null;
  optionsText: string | null;
  cuffSpec: string | null;
  cuffButtonCount: number | null;
  cuffButtonStartPos: string | number | { toString(): string } | null;
  sizeLabel: string | null;
  bastedFitting: boolean | null;
  remarks: string | null;
  measurements: PrismaMeasurement[];
  bodyLining: PrismaBodyLiningMaster | null;
  bodyLiningOrientationCode: PrismaMCode | null;
  button: PrismaHeavyFabricButtonMaster | null;
  fabric: PrismaHeavyFabricMaster | null;
  options: PrismaOptionMaster | null;
  order: PrismaOrder;
  pattern: PrismaPatternMaster | null;
  sleeveLining: PrismaSleeveLiningMaster | null;
  sleeveLiningOrientationCode: PrismaMCode | null;
}
export interface PrismaMeasurementType {
  id: number;
  itemTypeCodeId: number;
  code: string;
  name: string;
  unit: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  itemTypeCode: PrismaMCode;
  measurements: PrismaMeasurement[];
}
export interface PrismaMeasurement {
  id: number;
  detailsId: number;
  typeId: number;
  standardValue: string | number | { toString(): string } | null;
  adjustValue: string | number | { toString(): string } | null;
  finalValue: string | number | { toString(): string } | null;
  createdAt: string;
  updatedAt: string;
  type: PrismaMeasurementType;
  jacketDetails: PrismaJacketDetails | null;
  coatDetails: PrismaCoatDetails | null;
  suitDetails: PrismaSuitDetails | null;
  pantsDetails: PrismaPantsDetails | null;
  vestDetails: PrismaVestDetails | null;
}
export interface PrismaCoatDetails {
  orderId: number;
  seasonCodeId: number | null;
  supplierId: number | null;
  fabricId: number | null;
  patternId: number | null;
  bodyLiningId: number | null;
  bodyLiningColorNo: string | null;
  bodyLiningOrientationCodeId: number | null;
  sleeveLiningId: number | null;
  sleeveLiningColorNo: string | null;
  sleeveLiningOrientationCodeId: number | null;
  liningSpec: string | null;
  buttonId: number | null;
  buttonColorNo: string | null;
  optionsId: number | null;
  optionsText: string | null;
  cuffSpec: string | null;
  cuffButtonCount: number | null;
  cuffButtonStartPos: string | number | { toString(): string } | null;
  sizeLabel: string | null;
  bastedFitting: boolean | null;
  remarks: string | null;
  measurements: PrismaMeasurement[];
  bodyLining: PrismaBodyLiningMaster | null;
  bodyLiningOrientationCode: PrismaMCode | null;
  button: PrismaHeavyFabricButtonMaster | null;
  fabric: PrismaHeavyFabricMaster | null;
  options: PrismaOptionMaster | null;
  order: PrismaOrder;
  pattern: PrismaPatternMaster | null;
  seasonCode: PrismaMCode | null;
  sleeveLining: PrismaSleeveLiningMaster | null;
  sleeveLiningOrientationCode: PrismaMCode | null;
  supplier: PrismaSupplier | null;
}
export interface PrismaHeavyFabricMaster {
  id: number;
  fabric_manufacturer: string | null;
  fabric_no: string;
  color: string | null;
  fabric_pattern: string | null;
  composition: string | null;
  fabric_properties: string | null;
  fair_fabric_price: number | null;
  fair_fabric_rank: string | null;
  regular_fabric_price: number | null;
  regular_fabric_rank: string | null;
  fabric_data_update: string | null;
  large: boolean | null;
  fabric_sheer: boolean | null;
  stock_flag: boolean | null;
  supplierId: number;
  createdBy: number | null;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string;
  coatDetails: PrismaCoatDetails[];
  supplier: PrismaSupplier;
  jacketDetails: PrismaJacketDetails[];
  pantsDetails: PrismaPantsDetails[];
  suitDetails: PrismaSuitDetails[];
  vestDetails: PrismaVestDetails[];
}
export interface PrismaPatternMaster {
  id: number;
  itemTypeCodeId: number;
  patternNo: string;
  size: string | null;
  length: string | number | { toString(): string } | null;
  shoulderWidth: string | number | { toString(): string } | null;
  bust: string | number | { toString(): string } | null;
  waist: string | number | { toString(): string } | null;
  hip: string | number | { toString(): string } | null;
  sleeveLength: string | number | { toString(): string } | null;
  sleeveWidth: string | number | { toString(): string } | null;
  lapelWidth: string | number | { toString(): string } | null;
  crotchWidth: string | number | { toString(): string } | null;
  kneeWidth: string | number | { toString(): string } | null;
  hemWidth: string | number | { toString(): string } | null;
  rise: string | number | { toString(): string } | null;
  inseam: string | number | { toString(): string } | null;
  stitchSpec: string | null;
  liningSpec: string | null;
  defaultButtonCount: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  itemTypeCode: PrismaMCode;
  jacketDetails: PrismaJacketDetails[];
  coatDetails: PrismaCoatDetails[];
  suitJacketDetails: PrismaSuitDetails[];
  suitPantsDetails: PrismaSuitDetails[];
  vestDetails: PrismaVestDetails[];
  pantsDetails: PrismaPantsDetails[];
}
export interface PrismaBodyLiningMaster {
  id: number;
  productNo: string;
  colorNo: string | null;
  orientation: string | null;
  stockFlag: boolean | null;
  coatDetails: PrismaCoatDetails[];
  jacketDetails: PrismaJacketDetails[];
  suitDetails: PrismaSuitDetails[];
  vestDetails: PrismaVestDetails[];
}
export interface PrismaSleeveLiningMaster {
  id: number;
  productNo: string;
  colorNo: string | null;
  orientation: string | null;
  stockFlag: boolean | null;
  coatDetails: PrismaCoatDetails[];
  jacketDetails: PrismaJacketDetails[];
  suitDetails: PrismaSuitDetails[];
}
export interface PrismaHeavyFabricButtonMaster {
  id: number;
  productNo: string;
  colorNo: string | null;
  pantsProductNo: string | null;
  pantsColorNo: string | null;
  cost1: number | null;
  cost2: number | null;
  cost3: number | null;
  cost4: number | null;
  cost5: number | null;
  cost6: number | null;
  cost7: number | null;
  cost8: number | null;
  retailPrice1: number | null;
  retailPrice2: number | null;
  retailPrice3: number | null;
  retailPrice4: number | null;
  retailPrice5: number | null;
  retailPrice6: number | null;
  retailPrice7: number | null;
  retailPrice8: number | null;
  coatDetails: PrismaCoatDetails[];
  jacketDetails: PrismaJacketDetails[];
  pantsDetails: PrismaPantsDetails[];
  suitJacketDetails: PrismaSuitDetails[];
  suitPantsDetails: PrismaSuitDetails[];
  vestDetails: PrismaVestDetails[];
}
export interface PrismaOptionMaster {
  id: number;
  optionName: string;
  cost: number | null;
  retailPrice: number | null;
  textContent: string | null;
  coatDetails: PrismaCoatDetails[];
  jacketDetails: PrismaJacketDetails[];
  pantsDetails: PrismaPantsDetails[];
  suitDetails: PrismaSuitDetails[];
  vestDetails: PrismaVestDetails[];
}
export interface PrismaSupplier {
  id: number;
  supplierNo: string;
  supplierName: string;
  supplierZipCode: string | null;
  supplierAddress: string | null;
  manager: string | null;
  email1: string | null;
  email2: string | null;
  heavyFabrics: PrismaHeavyFabricMaster[];
  coatDetails: PrismaCoatDetails[];
  suitDetails: PrismaSuitDetails[];
  pantsDetails: PrismaPantsDetails[];
  vestDetails: PrismaVestDetails[];
}
export interface PrismaSuitDetails {
  orderId: number;
  seasonCodeId: number | null;
  supplierId: number | null;
  fabricId: number | null;
  jacketPatternId: number | null;
  pantsPatternId: number | null;
  bodyLiningId: number | null;
  bodyLiningColorNo: string | null;
  bodyLiningOrientationCodeId: number | null;
  sleeveLiningId: number | null;
  sleeveLiningColorNo: string | null;
  sleeveLiningOrientationCodeId: number | null;
  liningSpec: string | null;
  jacketButtonId: number | null;
  jacketButtonColorNo: string | null;
  pantsButtonId: number | null;
  pantsButtonColorNo: string | null;
  optionsId: number | null;
  cuffSpec: string | null;
  cuffButtonCount: number | null;
  cuffButtonStartPos: string | number | { toString(): string } | null;
  jacketSizeLabel: string | null;
  pantsSizeLabel: string | null;
  pantsHemSpec: string | null;
  pantsDoubleWidth: string | number | { toString(): string } | null;
  bastedFitting: boolean | null;
  remarks: string | null;
  measurements: PrismaMeasurement[];
  bodyLining: PrismaBodyLiningMaster | null;
  bodyLiningOrientationCode: PrismaMCode | null;
  fabric: PrismaHeavyFabricMaster | null;
  jacketButton: PrismaHeavyFabricButtonMaster | null;
  jacketPattern: PrismaPatternMaster | null;
  options: PrismaOptionMaster | null;
  order: PrismaOrder;
  pantsButton: PrismaHeavyFabricButtonMaster | null;
  pantsPattern: PrismaPatternMaster | null;
  seasonCode: PrismaMCode | null;
  sleeveLining: PrismaSleeveLiningMaster | null;
  sleeveLiningOrientationCode: PrismaMCode | null;
  supplier: PrismaSupplier | null;
}
export interface PrismaPantsDetails {
  orderId: number;
  seasonCodeId: number | null;
  supplierId: number | null;
  fabricId: number | null;
  patternId: number | null;
  liningSpec: string | null;
  buttonId: number | null;
  pantsButtonColorNo: string | null;
  optionsId: number | null;
  pantsSizeLabel: string | null;
  pantsHemSpec: string | null;
  pantsDoubleWidth: string | number | { toString(): string } | null;
  bastedFitting: boolean | null;
  remarks: string | null;
  measurements: PrismaMeasurement[];
  button: PrismaHeavyFabricButtonMaster | null;
  fabric: PrismaHeavyFabricMaster | null;
  options: PrismaOptionMaster | null;
  order: PrismaOrder;
  pattern: PrismaPatternMaster | null;
  seasonCode: PrismaMCode | null;
  supplier: PrismaSupplier | null;
}
export interface PrismaVestDetails {
  orderId: number;
  seasonCodeId: number | null;
  supplierId: number | null;
  fabricId: number | null;
  patternId: number | null;
  bodyLiningId: number | null;
  bodyLiningColorNo: string | null;
  bodyLiningOrientationCodeId: number | null;
  liningSpec: string | null;
  buttonId: number | null;
  buttonColorNo: string | null;
  optionsId: number | null;
  sizeLabel: string | null;
  bastedFitting: boolean | null;
  remarks: string | null;
  measurements: PrismaMeasurement[];
  bodyLining: PrismaBodyLiningMaster | null;
  bodyLiningOrientationCode: PrismaMCode | null;
  button: PrismaHeavyFabricButtonMaster | null;
  fabric: PrismaHeavyFabricMaster | null;
  options: PrismaOptionMaster | null;
  order: PrismaOrder;
  pattern: PrismaPatternMaster | null;
  seasonCode: PrismaMCode | null;
  supplier: PrismaSupplier | null;
}

