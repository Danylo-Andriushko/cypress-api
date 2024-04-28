import { ApiController } from "../fixtures/apiController"
import { ApiData } from "../fixtures/apiData"

const apiController = new ApiController()
const apiData = new ApiData()

describe('check devices by API', () => {

  it('check allowed methods to "bycat" endpoint', () => {
    apiController.options(`/bycat`).then(response => {
      apiController.checkStatusCode(response)
      const allowedMethods = response.headers.allow
      apiController.allowMethod(allowedMethods, apiData.data.bycatAllowMethods)
    });
  })

  it('check allowed methods to "entries" endpoint', () => {
    apiController.options(`/entries`).then(response => {
      apiController.checkStatusCode(response)
      const allowedMethods = response.headers.allow
      apiController.allowMethod(allowedMethods, apiData.data.entriesAllowMethods)
    });
  })

  it('check allowed methods to "view" endpoint', () => {
    apiController.options(`/view`).then(response => {
      apiController.checkStatusCode(response)
      const allowedMethods = response.headers.allow
      apiController.allowMethod(allowedMethods, apiData.data.viewtAllowMethods)
    });
  })

  it('check phones to exist', () => {
    const expectedPhones = apiData.data.phoneTitles
    apiController.read(`/entries`).then(response => {
      apiController.checkStatusCode(response)
      const phones = response.body.Items.filter(item => item.cat === "phone")
      const actualPhones = phones.map(item => item.title)
      expect(expectedPhones).to.deep.equal(actualPhones)
    });
  })

  it('check phones quantity', () => {
    apiController.read(`/entries`).then(response => {
      apiController.checkStatusCode(response)
      const actualPhones = response.body.Items.filter(item => item.cat === "phone")
      expect(actualPhones.length).to.equal(7)
    });
  })

  it('check phone prices', () => {
    const expectedPrices = apiData.data.phonePrices
    apiController.read(`/entries`).then(response => {
      apiController.checkStatusCode(response)
      const actualPrices = response.body.Items.map(item => item.price)
      expect(expectedPrices).to.deep.equal(actualPrices)
    });
  })

  it('check creating of new category', () => {
    const pcValue = 'PC';
    apiController.create(`/bycat`, { cat: pcValue })
      .then(
      (response) => {
      apiController.checkStatusCode(response)
      let arrResponse = response.allRequestResponses
      arrResponse.forEach(element => {
        let responseValue = Object.values(element)[0]
        expect(responseValue).to.deep.includes('PC')
      });
      })
});
})
