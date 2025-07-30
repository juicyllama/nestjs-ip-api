export type IPAPIResponse = {
	query: string
	status: 'success' | 'fail'
	country: string
	countryCode: string
	region: string
	regionName: string
	city: string
	zip: string
	lat: number
	lon: number
	timezone: string
	isp: string
	org: string
	as: string
}
