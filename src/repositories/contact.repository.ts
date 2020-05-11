import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ContactsDataSource} from '../datasources';
import {Address, Contact, ContactRelations} from '../models';
import {AddressRepository} from './address.repository';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {
  public readonly address: HasOneRepositoryFactory<
    Address,
    typeof Contact.prototype.id
  >;

  constructor(
    @inject('datasources.contacts') dataSource: ContactsDataSource,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Contact, dataSource);
    this.address = this.createHasOneRepositoryFactoryFor(
      'address',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
