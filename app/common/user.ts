export class User {
	id: string;
	name: string;
	email: string;
	creationDate: Date;
	lastUpdate: Date;
	password: string;

	constructor(userAsJson : any) {
		if (userAsJson.id) {
			this.id = userAsJson.id;
		}
		this.name = userAsJson.name;
		this.email = userAsJson.email;
		if (userAsJson.creationDate) {
			this.creationDate = new Date(userAsJson.creationDate);
		}
		if (userAsJson.lastUpdate) {
			this.lastUpdate = new Date(userAsJson.lastUpdate);
		} 
	}
}