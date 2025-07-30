import { IPAPIModule } from './ipapi.module'
import { IPAPIService } from './ipapi.service'
import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('IP API', () => {
	let app: INestApplication
	let ipapiService: IPAPIService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), IPAPIModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		ipapiService = moduleRef.get<IPAPIService>(IPAPIService)
	})

	describe('Get', () => {
		it('Get IP Data', async () => {
			const ip = faker.internet.ip()
			const ipdata = await ipapiService.get({ ip })
			expect(ipdata).toBeDefined()
			expect(ipdata.city).toBeDefined()
			expect(ipdata.country).toBeDefined()
			expect(ipdata.query).toBe(ip)
			expect(ipdata.status).toBe('success')
			expect(ipdata.lat).toBeDefined()
			expect(ipdata.lon).toBeDefined()
			expect(ipdata.timezone).toBeDefined()
			expect(ipdata.org).toBeDefined()
			expect(ipdata.as).toBeDefined()
			expect(ipdata.countryCode).toBeDefined()
			expect(ipdata.regionName).toBeDefined()
			expect(ipdata.zip).toBeDefined()
			expect(ipdata.isp).toBeDefined()
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
