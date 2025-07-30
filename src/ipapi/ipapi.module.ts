import { IPAPIConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { IPAPIService } from './ipapi.service'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
		}),
		ConfigValidationModule.register(IPAPIConfigDto),
	],
	providers: [IPAPIService],
	exports: [IPAPIService],
})
export class IPAPIModule {}
