import { promises as fs } from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';

const OUTPUT_PATH = path.resolve(__dirname, '../../frontend/src/types/prisma-types.ts');

const SCALAR_TYPE_MAP: Record<string, string> = {
  String: 'string',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'string | number | { toString(): string }',
  Boolean: 'boolean',
  DateTime: 'string',
  Json: 'unknown',
  Bytes: 'string',
};

const HEADER_COMMENT = `/**
 * THIS FILE IS AUTO-GENERATED.
 * Run \`npm run generate:frontend-types\` from the backend directory after updating prisma schema.
 */
/* eslint-disable */`;

type DMMFModel = (typeof Prisma.dmmf)['datamodel']['models'][number];
type DMMFEnum = (typeof Prisma.dmmf)['datamodel']['enums'][number];

const enumsByName = new Map<string, DMMFEnum>(Prisma.dmmf.datamodel.enums.map((enm) => [enm.name, enm]));
const models = Prisma.dmmf.datamodel.models as readonly DMMFModel[];

function resolveScalarType(fieldType: string): string {
  return SCALAR_TYPE_MAP[fieldType] ?? 'unknown';
}

function resolveEnumType(enumName: string): string {
  return `Prisma${enumName}`;
}

function resolveObjectType(modelName: string): string {
  return `Prisma${modelName}`;
}

function renderFieldType(field: DMMFModel['fields'][number]): string {
  let type: string;

  switch (field.kind) {
    case 'scalar':
      type = resolveScalarType(field.type);
      break;
    case 'enum':
      type = resolveEnumType(field.type);
      break;
    case 'object':
      type = resolveObjectType(field.type);
      break;
    default:
      type = 'unknown';
  }

  if (field.isList) {
    type = `${type}[]`;
  }

  const allowsNull = ((!field.isRequired && !field.isList) || ((field as unknown as { isNullable?: boolean }).isNullable === true));
  if (allowsNull) {
    type = `${type} | null`;
  }

  return type;
}

function renderEnum(enumModel: DMMFEnum): string {
  const union = enumModel.values.map((value) => `'${value.name}'`).join(' | ') || 'never';
  return `export type Prisma${enumModel.name} = ${union};`;
}

function renderModel(model: DMMFModel): string {
  const fields = model.fields
    .map((field) => `  ${field.name}: ${renderFieldType(field)};`)
    .join('\n');

  return `export interface Prisma${model.name} {\n${fields}\n}`;
}

async function main() {
  const enumBlocks = enumsByName.size > 0 ? Array.from(enumsByName.values()).map(renderEnum) : [];
  const modelBlocks = models.map(renderModel);

  const fileContents = [HEADER_COMMENT, '', ...enumBlocks, enumBlocks.length ? '' : '', ...modelBlocks, '']
    .filter((line, index, arr) => !(line === '' && arr[index - 1] === ''))
    .join('\n');

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${fileContents}\n`, 'utf8');

  // eslint-disable-next-line no-console
  console.log(`✅ Prisma types generated at ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error('Failed to generate frontend Prisma types:', error);
  process.exitCode = 1;
});

