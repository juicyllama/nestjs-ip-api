import { IPAPIQuery } from '../ipapi/ipapi.dto'
import { IPAPIService } from '../ipapi/ipapi.service'
import { IPAPIResponse } from '../ipapi/ipapi.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(private readonly ipapiService: IPAPIService) {}

	async run(query: IPAPIQuery): Promise<IPAPIResponse> {
		this.logger.log('Running sandbox service...')
		const ipInfo = await this.ipapiService.get(query)
		this.logger.log(`IP Info for ${query.ip}:`, ipInfo)
		return ipInfo
	}
}
