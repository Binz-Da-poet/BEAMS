import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiTags } from '@nestjs/swagger';
import { z } from 'zod';

const CreateCustomerSchema = z.object({
  name: z.string().min(1),
  kana: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  note: z.string().optional().nullable(),
});

type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customers: CustomersService) {}

  @Get()
  list() {
    return this.customers.list();
  }

  @Post()
  create(@Body() body: unknown) {
    const parsed = CreateCustomerSchema.parse(body);
    return this.customers.create(parsed as CreateCustomerDto);
  }
}
