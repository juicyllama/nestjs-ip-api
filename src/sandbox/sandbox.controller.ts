import { IPAPIQuery } from '../ipapi/ipapi.dto'
import { IPAPIResponse } from '../ipapi/ipapi.types'
import { SandboxService } from './sandbox.service'
import { Controller, Get, Query } from '@nestjs/common'

@Controller('/')
export class SandboxController {
	constructor(private readonly sandboxService: SandboxService) {}

	@Get()
	async sandbox(@Query() query: IPAPIQuery): Promise<IPAPIResponse> {
		return await this.sandboxService.run(query)
	}
}
