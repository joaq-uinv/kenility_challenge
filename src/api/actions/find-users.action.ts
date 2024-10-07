import { Controller, Get, Query } from '@nestjs/common';

import { FindUsersHandler } from '../../application/commands/find-users.handler';
import { FindUsersQuery } from '../../application/queries/find-users.query';

@Controller({ path: '/users', version: '1' })
export class FindUsersAction {
  constructor(private service: FindUsersHandler) {}

  @Get()
  public async execute(
    @Query('filters') filters: any,
    @Query('page') page = 1,
  ): Promise<any> {
    const query = new FindUsersQuery(filters, Number(page));

    const result = await this.service.handle(query);

    return result;
  }
}
