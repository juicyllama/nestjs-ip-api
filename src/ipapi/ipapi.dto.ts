import { IsString } from 'class-validator'

export class IPAPIQuery {
	@IsString()
	ip!: string
}
