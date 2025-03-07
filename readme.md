# My Ksense Code Challenge

Thank you for taking the time to checkout my submission.

[Project's Home](https://ksense-code-challange.space-monkeys.workers.dev/)

## Why Cloudflare?

I chose to put this on Cloudflare workers because its super fast to develop on.
Its super dead simple to deploy and can all be done from the CLI. Cloudflare
workers are perfect for webhooks, has they are super flexiable and are super
cheap.

## Why didn't you use a framework like Express

Thank you for asking. I thought it was over kill for the project. I wasnt going
to need what makes Express js useful like middleware, or expressive error
handling. I do have several routes and I could have benefited from using a
frameworks router, however keeping it simple allowed me to get started faster
and prototype quicker.


## Want to run it locally?

1. Clone done the project

```sh
git clone joshmkennedy/ksense-code-challenge
```

2. Install the dependencies with your package manager of choice

```sh
bun install
```

3. Use the wrangler command to run the worker

```sh
bunx wrangler dev
```

4. Vist http://localhost:8787/


### THANKS 👋
