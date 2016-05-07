export class APILink {
	rel: string;
	href: string;

	constructor(linkAsJson: any) {
		this.rel = linkAsJson.rel;
		this.href = linkAsJson.href;
	}
}