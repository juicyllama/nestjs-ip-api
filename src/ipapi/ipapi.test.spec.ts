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
		it('Get IP Data with default fields', async () => {
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
			expect(ipdata.continent).toBeDefined()
			expect(ipdata.continentCode).toBeDefined()
		})

		it('Get IP Data with custom fields', async () => {
			const ip = faker.internet.ip()
			const ipdata = await ipapiService.get({ ip, fields: 'status,country,continent' })
			expect(ipdata).toBeDefined()
			expect(ipdata.status).toBe('success')
			expect(ipdata.country).toBeDefined()
			expect(ipdata.continent).toBeDefined()

			//* These fields should not be present as they are not requested
			expect(ipdata.city).toBeUndefined()
			expect(ipdata.lat).toBeUndefined()
		})

		it('Get IP Data with single field', async () => {
			const ip = faker.internet.ip()
			const ipdata = await ipapiService.get({ ip, fields: 'country' })
			expect(ipdata).toBeDefined()
			expect(ipdata.country).toBeDefined()

			//* These fields should not be present as they are not requested
			expect(ipdata.city).toBeUndefined()
			expect(ipdata.status).toBeUndefined()
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
