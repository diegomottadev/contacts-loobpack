import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Contact,
  Address,
} from '../models';
import {ContactRepository} from '../repositories';

export class ContactAddressController {
  constructor(
    @repository(ContactRepository) protected contactRepository: ContactRepository,
  ) { }

  @get('/contacts/{id}/address', {
    responses: {
      '200': {
        description: 'Contact has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.contactRepository.address(id).get(filter);
  }

  @post('/contacts/{id}/address', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Contact.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInContact',
            exclude: ['id'],
            optional: ['contactId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.contactRepository.address(id).create(address);
  }

  @patch('/contacts/{id}/address', {
    responses: {
      '200': {
        description: 'Contact.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.contactRepository.address(id).patch(address, where);
  }

  @del('/contacts/{id}/address', {
    responses: {
      '200': {
        description: 'Contact.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.contactRepository.address(id).delete(where);
  }
}
