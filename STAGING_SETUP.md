# Staging Environment Setup for GitHub Pages

This guide explains how to set up a staging environment for the documentation that deploys to `procore-staging.github.io/documentation`.

## Feature Branch Staging Workflow

Use the same repository with `staging-*` branch pattern for per-feature staging deployments:

1. **Work on your feature branch** (e.g., `my-feature-change-1`)
2. **Create a staging branch** with `staging-` prefix (e.g., `staging-my-feature-change-1`)
3. **Push the staging branch** - the `.github/workflows/staging.yml` workflow will automatically:
   - Detect branches matching `staging-*` pattern
   - Build with staging configuration (`_config_staging.yml`)
   - Deploy to `procore-staging.github.io/documentation/`

**How it works:**
- Any branch starting with `staging-` triggers the staging deployment workflow
- Each feature can have its own staging branch: `staging-feature-name`
- The workflow uses the staging config which sets `url: "https://procore-staging.github.io"`

**Example workflow:**
```bash
# 1. Work on your feature
git checkout -b my-feature-change-1
# ... make changes ...

# 2. When ready for staging, create staging branch
git checkout -b staging-my-feature-change-1

# 3. Push to trigger staging deployment
git push origin staging-my-feature-change-1
# → GitHub Actions automatically builds and deploys to procore-staging.github.io
```

## Main Branch Deployment to Staging

When the `main` branch is merged or pushed, it will also automatically deploy to `procore-staging.github.io/documentation/`:

- **Purpose**: Keeps the staging environment in sync with the latest production-ready code from `main`
- **Trigger**: Any push or merge to the `main` branch
- **Deployment**: Same staging subdomain (`procore-staging.github.io`) as feature branch deployments
- **Result**: Staging always reflects the current state of `main` branch

**Note**: This means `main` branch content will be available at `procore-staging.github.io/documentation/`, allowing you to test the latest production code in the staging environment before it goes to production.

## Setup Requirements

Before the workflow can deploy, you need to configure GitHub Pages in your repository:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions" (not "Deploy from a branch")
   - This enables GitHub Actions to deploy to Pages

2. **Verify Permissions**:
   - The workflow requires `pages: write` permission (already included in the workflow)
   - Make sure the repository allows GitHub Actions to write to Pages

## Troubleshooting

### Error: "Invalid deployment branch and no branch protection rules set in the environment"

**Solution**: 
- The workflow uses the default `github-pages` environment
- Make sure GitHub Pages is enabled with "GitHub Actions" as the source (not branch-based)
- Go to Settings → Pages → Source → Select "GitHub Actions"

### Error: "Resource not accessible by integration"

**Solution**:
- Check that the repository has GitHub Actions enabled
- Verify that the workflow has the correct permissions (`pages: write` is included)
- Make sure the repository settings allow GitHub Actions to deploy to Pages


