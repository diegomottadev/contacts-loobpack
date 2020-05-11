import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_address_contactId: {
        name: 'fk_address_contactId',
        entity: 'Contact',
        entityKey: 'id',
        foreignKey: 'contactid',
      },
    },
  },
})
export class Address extends Entity {
  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'number',
  })
  postalCode?: number;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  contactId?: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
