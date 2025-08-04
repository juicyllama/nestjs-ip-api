import { VALID_FIELDS } from './ipapi.constants'
import { IsString, IsOptional, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

function IsValidField(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isValidField',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					if (typeof value !== 'string') return false
					const fields = value.split(',').map(f => f.trim())
					return fields.every(field => VALID_FIELDS.includes(field))
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must contain only valid fields: ${VALID_FIELDS.join(', ')}`
				},
			},
		})
	}
}

export class IPAPIQuery {
	@IsString()
	ip!: string

	@IsOptional()
	@IsString()
	@IsValidField()
	fields?: string
}

export class IPAPIQueryParams {
	@IsOptional()
	@IsString()
	@IsValidField()
	fields?: string
}
