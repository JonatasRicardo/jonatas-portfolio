# Cloud Run Deployment

## Overview

This project is configured to deploy to Google Cloud Run using GitHub Actions.

## Architecture

GitHub Actions → Build Docker image → Push to Artifact Registry → Deploy to Cloud Run

## Required setup (GCP)

1. Enable APIs:

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com iamcredentials.googleapis.com
```

2. Create Artifact Registry:

```bash
gcloud artifacts repositories create next-app \
  --repository-format=docker \
  --location=us-central1
```

3. Create service account:

```bash
gcloud iam service-accounts create github-deployer
```

Grant roles:

```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:github-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"
```

## GitHub Secrets

Add in repo settings:

- GCP_WORKLOAD_IDENTITY_PROVIDER
- GCP_SERVICE_ACCOUNT

## GitHub Variables

Add in repo variables:

- GCP_PROJECT_ID

## First deploy

Push to main branch (or run manually via **Actions → Deploy to Cloud Run**):

```bash
git push origin main
```

## Notes

- Uses Next.js standalone output
- SSR fully supported
- Health endpoint available at /healthz (rewritten to /api/health)
