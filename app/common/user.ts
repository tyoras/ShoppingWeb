export class User {
	id: string;
	name: string;
	email: string;

	constructor(userAsJson: any) {
		this.id = userAsJson.rel;
		this.name = userAsJson.name;
		this.email = userAsJson.email;
	}
}