import { IPAPIResponse } from '../ipapi/ipapi.types'
import { SandboxService } from './sandbox.service'
import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class SandboxController {
	constructor(private readonly sandboxService: SandboxService) {}

	@Get()
	async sandbox(): Promise<IPAPIResponse> {
		return await this.sandboxService.run()
	}
}
