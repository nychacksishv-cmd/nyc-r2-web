# Get200 Web

Next.js frontend for the Get200 hackathon starter stack. It is wired to Clerk auth, the FastAPI backend, Kubernetes deployment, HTTPS ingress, and autoscaling.

Live app:

- Frontend: <https://get200.qd.je>
- Backend API: <https://api.get200.qd.je>
- Backend docs: <https://api.get200.qd.je/docs>

## What is already built

- Clerk sign-in and sign-up pages.
- Protected dashboard, create, profile, and admin routes.
- Server-side backend API helper that attaches the Clerk session token.
- Simple DB write/read/delete flow through notes.
- Admin page that gracefully explains when the user is not admin yet.
- Loading and error states for protected pages.
- Dockerfile for standalone Next.js output.
- Cloud Build pipeline that builds, pushes, applies Kubernetes manifests, and rolls out.
- GKE deployment with 2 replicas and HPA.
- HTTPS ingress with a Google-managed certificate.

## Routes

- `/`: landing page.
- `/sign-in`: Clerk sign-in.
- `/sign-up`: Clerk sign-up.
- `/dashboard`: protected command center with DB-backed notes.
- `/create`: protected DB write example.
- `/profile`: protected app profile synced from Clerk.
- `/admin`: protected admin starter page.

## Environment variables

Copy the example:

```bash
cp .env.example .env.local
```

Required values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_or_pk_live_here"
NEXT_PUBLIC_API_URL="https://api.get200.qd.je"
CLERK_SECRET_KEY="sk_test_or_sk_live_here"
```

Notes:

- `NEXT_PUBLIC_*` values are compiled into the browser bundle during `npm run build`.
- `CLERK_SECRET_KEY` is server-only and must never be exposed in client code.
- Do not commit `.env.local`.

## Local development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Before committing:

```bash
npm run lint
npm run build
```

## How frontend calls the backend

Use `callBackend()` from Server Components or Server Actions:

```ts
import { callBackend } from '@/lib/api'

const profile = await callBackend('/api/me')
```

That helper:

1. Reads the current Clerk session.
2. Gets a session token.
3. Sends `Authorization: Bearer <token>` to FastAPI.
4. Uses `NEXT_PUBLIC_API_URL` as the backend base URL.

For protected pages, start with:

```ts
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  await auth.protect()
}
```

## Adding a new frontend feature

Recommended flow:

1. Add the backend endpoint first, including DB migration if needed.
2. Add TypeScript types in `lib/types.ts`.
3. Add the protected page or component.
4. Use `callBackend()` for reads.
5. Use a Server Action for writes when possible.
6. Run `npm run lint`.
7. Run `npm run build`.
8. Commit the frontend feature.
9. Push/merge when ready so Cloud Build redeploys.

## Deployment flow

Cloud Build does this when the `nyc-r2-web` trigger runs:

1. Builds the Docker image.
2. Passes these build args:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_API_URL`
3. Tags the image with `$SHORT_SHA` and `latest`.
4. Pushes both tags to Artifact Registry.
5. Applies Kubernetes manifests.
6. Sets the deployment image to the new `$SHORT_SHA`.

Current Cloud Build substitutions:

```yaml
_REGION: us-central1
_CLUSTER_NAME: nyc-r2-web
_NEXT_PUBLIC_API_URL: https://api.get200.qd.je
```

If the backend domain changes, update `_NEXT_PUBLIC_API_URL` in `cloudbuild.yaml` before deploying.

## Kubernetes secret

The frontend deployment reads `CLERK_SECRET_KEY` from the `frontend-secrets` secret.

Create or update it:

```bash
gcloud container clusters get-credentials nyc-r2-web \
  --region=us-central1 \
  --project=project-2505dfd6-33dd-47f2-ab6

kubectl create namespace get200 --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic frontend-secrets \
  -n get200 \
  --from-literal=CLERK_SECRET_KEY="sk_test_or_sk_live_here" \
  --dry-run=client -o yaml | kubectl apply -f -
```

Restart after changing the secret:

```bash
kubectl rollout restart deployment/get200-frontend -n get200
kubectl rollout status deployment/get200-frontend -n get200
```

## GCP resources

- Project: `project-2505dfd6-33dd-47f2-ab6`
- Frontend cluster: `nyc-r2-web`
- Frontend region: `us-central1`
- Namespace: `get200`
- Frontend static IP: `34.36.114.119`
- Frontend host: `get200.qd.je`
- Frontend managed certificate: `frontend-cert`
- Artifact Registry image: `asia-south1-docker.pkg.dev/project-2505dfd6-33dd-47f2-ab6/get200-app-api-repo/frontend`

DNS records:

- `get200.qd.je` A record → `34.36.114.119`
- `api.get200.qd.je` A record → `8.232.50.93`

## Useful production checks

Get frontend cluster credentials:

```bash
gcloud container clusters get-credentials nyc-r2-web \
  --region=us-central1 \
  --project=project-2505dfd6-33dd-47f2-ab6
```

Check pods and autoscaling:

```bash
kubectl get pods -n get200
kubectl get hpa -n get200
```

Check rollout:

```bash
kubectl rollout status deployment/get200-frontend -n get200
```

Check ingress and certificate:

```bash
kubectl get ingress -n get200
kubectl get managedcertificate frontend-cert -n get200
kubectl describe managedcertificate frontend-cert -n get200
```

Test from outside:

```bash
curl -I https://get200.qd.je
curl -I https://api.get200.qd.je/health
```

## Clerk production checklist

In Clerk dashboard, make sure production URLs include:

- Home URL: `https://get200.qd.je`
- Sign-in URL: `https://get200.qd.je/sign-in`
- Sign-up URL: `https://get200.qd.je/sign-up`
- Allowed origins / domains: `https://get200.qd.je`

If you switch from test keys to live keys:

1. Update Cloud Build `_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
2. Update the GKE `frontend-secrets` secret.
3. Update the backend `get200-secrets` secret.
4. Restart frontend and backend deployments.

## Security notes

- Do not commit `.env.local`.
- If a secret was committed or pasted publicly, rotate it.
- Keep only `.env.example` in Git.
- Use GKE Secrets for runtime server-side secrets.
- Public Clerk publishable keys can be in build args, but Clerk secret keys must stay server-side only.
