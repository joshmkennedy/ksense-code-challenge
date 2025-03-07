import App from './app';
export default {
	async fetch(request, env): Promise<Response> {
		// set up our application
		const app = new App(request, env);

		// Dead simple router
		switch (app.reqMethod) {
			case 'GET':
				switch (app.reqPath) {
					case '/secrets':
						return app.handleListSecrets();

					case '/secret':
						return app.handleGetSecret();

					case '/':
						return app.handleHome();

					default:
						return NotFound();
				}

			// the usual methods for nonidempotent requests
			case 'POST':
			case 'PUT':
				if (app.reqPath == '/store-secret') {
					return app.handleSaveSecret();
				}
				return NotAllowed();

			// If we get here we dont got it
			default:
				return NotFound();
		}
	},
} satisfies ExportedHandler<Env>;

const NotFound = () =>
	new Response(`Not found`, {
		status: 404,
	});
const NotAllowed = () =>
	new Response('Not Allowed', {
		status: 405,
	});
