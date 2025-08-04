import { IPAPIField } from './ipapi.constants'
import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator'

export class IPAPIQuery {
	@IsString()
	ip!: string

	@IsOptional()
	@Transform(({ value }) => {
		if (typeof value === 'string') {
			return value.split(',').map(field => field.trim())
		}
		return value
	})
	@IsArray()
	@IsEnum(IPAPIField, { each: true })
	fields?: IPAPIField[]
}

export class IPAPIQueryParams {
	@IsOptional()
	@Transform(({ value }) => {
		if (typeof value === 'string') {
			return value.split(',').map(field => field.trim())
		}
		return value
	})
	@IsArray()
	@IsEnum(IPAPIField, { each: true })
	fields?: IPAPIField[]
}
