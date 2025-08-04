import { IPAPIQueryParams } from '../ipapi/ipapi.dto'
import { IPAPIResponse } from '../ipapi/ipapi.types'
import { SandboxService } from './sandbox.service'
import { Controller, Get, Query, Param } from '@nestjs/common'

@Controller('/')
export class SandboxController {
	constructor(private readonly sandboxService: SandboxService) {}

	@Get(':ip')
	async sandbox(@Param('ip') ip: string, @Query() query: IPAPIQueryParams): Promise<IPAPIResponse> {
		return await this.sandboxService.run({ ip, fields: query.fields })
	}
}
