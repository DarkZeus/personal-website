# Cloudflare Workers deployment

This site is generated ahead of time and deployed as a static-assets-only Cloudflare Worker. No Worker script or Node.js compatibility layer is needed.

The build command pins Nitro's `static` preset so platform auto-detection cannot replace the assets-only deployment with a server Worker.

## Local commands

```bash
pnpm dev      # Nuxt development server
pnpm preview  # Production build served by the local Workers runtime
pnpm deploy   # Production build and deployment with Wrangler
```

The first local deployment requires `pnpm exec wrangler login`.

## Workers Builds

Create a Worker by importing the GitHub repository in **Workers & Pages**, or connect this repository under an existing Worker's **Settings > Builds**. Use:

- Worker name: `fuad-work`
- Production branch: `master`
- Build command: `pnpm build`
- Deploy command: `pnpm exec wrangler deploy --config wrangler.jsonc`
- Non-production deploy command: `pnpm exec wrangler versions upload --config wrangler.jsonc`

The Worker name must match the `name` in `wrangler.jsonc`.

## Production cutover

1. Validate the generated `workers.dev` deployment, including `/`, a blog post, static images, and an unknown URL returning the custom 404 page with status 404.
2. Remove `fuad.work` from the Pages project's custom domains. This releases the existing Pages CNAME.
3. In the `fuad-work` Worker, open **Settings > Domains & Routes**, choose **Add > Custom Domain**, and add `fuad.work`.
4. Verify `fuad.work`, then delete the old Pages project. Keep the Pages project until the Worker domain is serving production traffic successfully.

Cloudflare requires the `fuad.work` DNS zone to use Cloudflare nameservers for a Worker Custom Domain.
