/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const fetch = require('node-fetch')

const { isEmpty } = require('./adobe-helpers')
const { endPoints, baseUrl } = require('./adobe-aep-constants')
const { isValidOfferName, isValidOfferContent, isValidWorkspace } = require('./adobe-aep-helpers')

let Client = {
  tenantName: null,
  accessToken: null,
  apiKey: null,

  init: function (config = null) {
    if (config) {
      this.tenantName = config.tenantName
      this.accessToken = config.accessToken
      this.apiKey = config.apiKey
    }
    return true
  },

  _doRequest: async function (path, method, contentType, body = null) {
    const options = {
      method: method,
      // headers: {
      //   'authorization': `Bearer ${this.accessToken}`,
      //   'cache-control': 'no-cache',
      //   'content-type': contentType,
      //   'x-api-key': this.apiKey,
      //   'x-gw-ims-org-id' :
      // }

      headers: {
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiJ9.ew0KICAgICJleHAiOiAxNTc0MjExOTkyLA0KICAgICJpc3MiOiAiQzM3QzBBMTI1QjA0NThDMjBBNDk1RDk1QEFkb2JlT3JnIiwNCiAgICAic3ViIjogIjBEMDc2Q0VCNUREMzJFN0EwQTQ5NUMwNkB0ZWNoYWNjdC5hZG9iZS5jb20iLA0KICAgICJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vcy9lbnRfZGF0YXNlcnZpY2VzX3NkayI6IHRydWUsDQogICAgImF1ZCI6ICJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vYy9iOWNlYjNmZmJiNDQ0MTVhYWVjNTM2NDdiMDgzZWIwMCINCn0.lIaZR7NLN5kWxNVX7qdh9UEzVkDxCfg-9d6T7ksR2FXznFaMAqNNICczTPtNB2yQr0vs5qAgu_lhUhpnqGKJlsHi2Rxxm4fb2g6xyRgpR5Qr5tQbpwsVktMJlsYMwXEjgPcGi91ONaQt9FUq8Gly2URppdNMzUUXfkWvcXccrnSsBYNwpT4btegrCMwOfpziABCdwQkNEneFgF29evD24RaiG4X6G8IGYHYP9gaFWSN53VQ6ecMCjGS0iTA0CFLqW3diPlDDUwAvU5g-pG8IENmo2bS2A16AtEoGgdlYrLmXt5ldCiHMdP5dbRAm4qf_wmZVUKd6hRw7RZluc-_VQA`,
        'cache-control': 'no-cache',
        'Accept' : 'application/json',
        'Content-type': 'application/json',
        'x-api-key': 'b9ceb3ffbb44415aaec53647b083eb00',
        'x-gw-ims-org-id' : 'C37C0A125B0458C20A495D95@AdobeOrg'
      }
    }
    if (method !== 'GET' && (body !== null || body !== undefined)) {
      options.body = JSON.stringify(body)
    }
    return fetch(path, options)
  },

  get: async function (path, contentType) {
    return this._doRequest(path, 'GET', contentType)
  },

  put: async function (path, contentType, body) {
    return this._doRequest(path, 'PUT', contentType, body)
  },

  post: async function (path, contentType, body) {
    return this._doRequest(path, 'POST', contentType, body)
  },

  delete: async function (path, contentType) {
    return this._doRequest(path, 'DELETE', contentType)
  },

  // _listOffers: async function () {
  //  // let listOffersUrl = new URL(`https://platform.adobe.io/data/foundation/catalog/batches`)
  //   const https = require('https');
  //   https.
  //   https
  //     .get('https://platform.adobe.io/data/foundation/catalog/accounts')
  //     .on('response', function(response) {
  //       console.log(response.statusCode) // 200
  //       console.log(response.headers['content-type']) // 'image/png'
  //     })
  // },


  _listOffers: async function () {
    let listOffersUrl = new URL(`https://platform.adobe.io/data/foundation/catalog/batches`)
    // if (limit) {
    //   listOffersUrl.searchParams.append(endPoints.targetOffers.parameters.limit, limit)
    // }
    // if (offset) {
    //   listOffersUrl.searchParams.append(endPoints.targetOffers.parameters.offset, offset)
    // }
    // if (sortBy) {
    //   listOffersUrl.searchParams.append(endPoints.targetOffers.parameters.sortBy, sortBy)
    // }
    return this.get(`${listOffersUrl.toString()}`).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(`Cannot retrieve data from call: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  // _getOffer: async function (id) {
  //   if (isEmpty(id)) {
  //     throw new Error('The id cannot be empty.')
  //   }
  //   const getOfferUrl = new URL(`${baseUrl}${this.tenantName}${endPoints.targetOfferContent.name}${id}`)
  //   return this.get(`${getOfferUrl.toString()}`, endPoints.targetOfferContent.contentType).then((res) => {
  //     if (res.ok) return res.json()
  //     else throw new Error(`Cannot retrieve offer: ${res.url} (${res.status} ${res.statusText})`)
  //   })
  // },

  // _createOffer: async function (name, content, workspace) {
  //   if (!isValidOfferName(name)) {
  //     throw new Error('The name cannot be empty. Max length is 250 characters.')
  //   }
  //   if (!isValidOfferContent(content)) {
  //     throw new Error('The content cannot be empty.')
  //   }
  //   if (!isValidWorkspace(workspace)) {
  //     throw new Error('The workspace max length is 250 characters.')
  //   }
  //   const createOfferUrl = new URL(`${baseUrl}${this.tenantName}${endPoints.targetOfferContent.name}`)
  //   const body = {
  //     name: name,
  //     content: content,
  //     workspace: workspace
  //   }
  //   return this.post(`${createOfferUrl.toString()}`, endPoints.targetOfferContent.contentType, body).then((res) => {
  //     if (res.ok) return res.json()
  //     else throw new Error(`Cannot create offer: ${res.url} ${JSON.stringify(body)} (${res.status} ${res.statusText})`)
  //   })
  // },

  // _updateOffer: async function (id, name, content) {
  //   if (isEmpty(id)) {
  //     throw new Error('The id cannot be empty.')
  //   }
  //   if (!isValidOfferName(name)) {
  //     throw new Error('The name cannot be empty. Max length is 250 characters.')
  //   }
  //   if (!isValidOfferContent(content)) {
  //     throw new Error('The content cannot be empty.')
  //   }
  //   const updateOfferUrl = new URL(`${baseUrl}${this.tenantName}${endPoints.targetOfferContent.name}${id}`)
  //   const body = {
  //     name: name,
  //     content: content
  //   }
  //   return this.put(`${updateOfferUrl.toString()}`, endPoints.targetOfferContent.contentType, body).then((res) => {
  //     if (res.ok) return res.json()
  //     else throw new Error(`Cannot update offer: ${res.url} (${res.status} ${res.statusText})`)
  //   })
  // },
  //
  // _deleteOffer: async function (id) {
  //   if (isEmpty(id)) {
  //     throw new Error('The id cannot be empty.')
  //   }
  //   const deleteOfferUrl = new URL(`${baseUrl}${this.tenantName}${endPoints.targetOfferContent.name}${id}`)
  //   return this.delete(`${deleteOfferUrl.toString()}`, endPoints.targetOfferContent.contentType).then((res) => {
  //     if (res.ok) return res.json()
  //     else throw new Error(`Cannot delete offer: ${res.url} (${res.status} ${res.statusText})`)
  //   })
  // },

  listOffers: async function () {
    const result = await this._listOffers()
    return (result && result.offers) || []
  },

  // getOffer: async function (id) {
  //   const result = await this._getOffer(id)
  //   return result || {}
  // },
  //
  // createOffer: async function (name, content, workspace) {
  //   const result = await this._createOffer(name, content, workspace)
  //   return result || {}
  // },
  //
  // updateOffer: async function (id, name, content) {
  //   const result = await this._updateOffer(id, name, content)
  //   return result || {}
  // },
  //
  // deleteOffer: async function (id) {
  //   const result = await this._deleteOffer(id)
  //   return result || {}
  // }
}

module.exports = Client
