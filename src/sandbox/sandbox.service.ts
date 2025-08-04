import { IPAPIQuery } from '../ipapi/ipapi.dto'
import { IPAPIService } from '../ipapi/ipapi.service'
import { IPAPIResponse } from '../ipapi/ipapi.types'
import { faker } from '@faker-js/faker'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(private readonly ipapiService: IPAPIService) {}

	async run(query: IPAPIQuery): Promise<IPAPIResponse> {
		this.logger.log('Running sandbox service...')
		// Use provided IP or generate random one for testing
		const ip = query.ip || faker.internet.ip()
		const ipInfo = await this.ipapiService.get({ ip, fields: query.fields })
		this.logger.log(`IP Info for ${ip}:`, ipInfo)
		return ipInfo
	}
}
