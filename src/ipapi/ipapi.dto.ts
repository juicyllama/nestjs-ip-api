import { IsString, IsOptional } from 'class-validator'

export class IPAPIQuery {
	@IsString()
	ip!: string

	@IsOptional()
	@IsString()
	fields?: string
}
