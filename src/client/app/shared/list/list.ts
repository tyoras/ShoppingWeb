import { Item } from './item';

export class List {
  id: string;
	name: string;
  ownerId: string;
  creationDate: Date;
	lastUpdate: Date;
  itemList: Item[];
}
