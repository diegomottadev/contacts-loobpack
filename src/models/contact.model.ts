import {Entity, hasOne, model, property} from '@loopback/repository';
import {Address} from './address.model';

//import {Address, AddressWithRelations} from './address.model';

@model()
export class Contact extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
  })
  age?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'string',
  })
  celphone?: string;

  @property({
    type: 'string',
  })
  telphone?: string;

  @property({
    type: 'string',
  })
  work?: string;

  @property({
    type: 'string',
  })
  siteWeb?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasOne(() => Address)
  address: Address;

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
  //address?: AddressWithRelations;
}

export type ContactWithRelations = Contact & ContactRelations;
