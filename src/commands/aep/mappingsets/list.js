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
const BaseCommand = require('../about')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class ListMappingSetsCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(ListMappingSetsCommand)
    let result

    try {
      result = await this.listMappingSets(flags.limit, flags.start, flags.orderBy)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async listMappingSets(limit = null, start = null, orderBy = null) {
    return this.getAdobeAep().listMappingSets(limit, start, orderBy)
  }
}

ListMappingSetsCommand.description = 'Retrieve the list of mappingsets associated with this organization'
ListMappingSetsCommand.hidden = false
ListMappingSetsCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  limit: flags.string({
    char: 'l',
    description: 'Limit response to a specified positive number of objects. Ex. limit=10.',
  }),
  orderBy: flags.string({
    char: 'o',
    description: 'Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated.',
  }),
  start: flags.string({
    char: 's',
    description: 'Returns results from a specific offset of objects. This was previously called offset. Ex. start=3..',
  }),
}

ListMappingSetsCommand.aliases = [
  'aep:mappingsets:ls',
  'aep:mappingsets:list']
module.exports = ListMappingSetsCommand
