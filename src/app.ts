// @ts-ignore Cloudflare workers can import html as strings
import Home from './index.html';

export default class App {
	public reqMethod: string;
	public url: URL;
	public reqPath: string;

	constructor(
		private request: Request,
		private env: Env,
	) {
		// normalize dependents
		this.reqMethod = this.setMethod();
		this.url = this.setURL();
		this.reqPath = this.setPath();
	}

	private setMethod(): string {
		return this.request.method.toUpperCase().trim();
	}

	private setURL(): URL {
		return new URL(this.request.url);
	}

	private setPath(): string {
		if (!this.url) {
			throw new Error('Please set the url first before setting path');
		}
		return this.url.pathname.toLowerCase();
	}

	// GET ROUTES

	public handleHome(): Response {
		return new Response(Home, {
			headers: {
				'Content-Type': 'text/html',
			},
		});
	}

	public async handleListSecrets(): Promise<Response> {
		const items = await this.env.SECRETS.list<string>();
		return Response.json(items);
	}

	public async handleGetSecret(): Promise<Response> {
		const key = this.url.searchParams.get('secret');
		if (!key) {
			console.log(`Yo! I didn't send the key wahhhhhhhaaaat`);
			return new Response("⚠️  Uh oh!, no key sent add ?secret=<secretname> to request")
		}
		const value = await this.getSecret(key);
		if(!value){
			return new Response("⚠️  Uh oh!, no secret was stored with that key")
		}
		return new Response(value)
	}

	// POST, PUT route
	// '/store-secret'
	public async handleSaveSecret(): Promise<Response> {
		const key = this.url.searchParams.get('secret');
		if (!key) {
			console.log(`Yo! They didn't send the key you put in the url wahhhhhhhaaaat`); // super helpful log message 😜
			return new Response('Bad Request', {
				status: 401,
			});
		}

		const value = await this.request.text(); // I have no clue what they are sending me.
		await this.saveSecret(key, value);

		return new Response('ok');
	}

	private async saveSecret(key: string, value: string): Promise<void> {
		if (key && value) {
			await this.env.SECRETS.put(key, value);
			return;
		}
		console.log('key or value were not truthy', key, value);
	}

	private async getSecret(key: string): Promise<string | null> {
		if (!key) {
			return null;
		}
		return this.env.SECRETS.get(key);
	}
}
