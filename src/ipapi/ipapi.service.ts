import { IPAPI_FIELDS } from './ipapi.constants'
import { IPAPIQuery } from './ipapi.dto'
import { IPAPIResponse } from './ipapi.types'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class IPAPIService {
	private readonly logger = new Logger(IPAPIService.name)

	constructor(private readonly configService: ConfigService) {}

	async get(query: IPAPIQuery): Promise<IPAPIResponse> {
		let url: string
		const fields = query.fields || IPAPI_FIELDS.join(',')

		// Note: IP-API.com allows free access without a key, but using a key is recommended for higher rate limits.
		// Only paid plans allow for secure HTTPS requests.
		if (!this.configService.get<string>('IP_API_KEY')) {
			this.logger.warn(
				`You're using the free version of IP-API.com, which has limited features and rate limits. Consider using a paid plan for better performance.`,
			)
			url = `http://ip-api.com/json/${query.ip}?fields=${fields}`
		} else {
			url = `https://pro.ip-api.com/json/${query.ip}?key=${this.configService.get<string>('IP_API_KEY')}&fields=${fields}`
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorText = await response.text()
			this.logger.error(`API Call failed for IP ${query.ip}: ${response.status} - ${errorText}`)
			throw new Error(`API Call failed for IP ${query.ip}: ${response.status}`)
		}

		return (await response.json()) as IPAPIResponse
	}
}
