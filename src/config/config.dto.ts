import { IsOptional, IsString } from 'class-validator'

export class IPAPIConfigDto {
	@IsString()
	@IsOptional()
	IP_API_KEY?: string
}
