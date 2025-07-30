import { IPAPIService } from '../ipapi/ipapi.service'
import { IPAPIResponse } from '../ipapi/ipapi.types'
import { faker } from '@faker-js/faker'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(private readonly ipapiService: IPAPIService) {}

	async run(): Promise<IPAPIResponse> {
		this.logger.log('Running sandbox service...')
		// Generate a random IP address for testing
		const ip = faker.internet.ip()
		const ipInfo = await this.ipapiService.get({ ip })
		this.logger.log(`IP Info for ${ip}:`, ipInfo)
		return ipInfo
	}
}
