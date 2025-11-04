---
permalink: /building-apps-install-arch
title: App Install & Setup Overview
sub_header: Understand installation, post-install notes, configurations, and permissions for data connector and embedded apps.
layout: default
section_title: Platform Concepts

---

## Overview
This page explains the full app installation and setup flow for a Procore company:
1. **Install app** — from the Marketplace or as a Custom App.
2. **View post‑installation notes** — review the developer’s instructions and links.
3. **Finalize app setup** — complete configuration based on your app type:
   - **Data connector apps**: connect from your external system; verify auth and permissions.
   - **Embedded apps**: create a configuration in Procore and enable projects.
<br><br>

***
<details>
  <summary class="collapseListH2">
    Step 1. App Installation
    <span class="collapseSubhead">All apps must be installed in the customer’s Procore company before they can run. Until installed, API requests that need company or project context return 4xx errors. If your app serves multiple customers, install it in <b>each</b> customer company you call.</span>
  </summary>
  <div markdown="1">

<!-- Setup path chooser -->
<div class="setup-paths-intro">
  <strong>Choose your setup path:</strong> Your app can be a <span class="pill pill--dc">Data Connector</span>, an <span class="pill pill--emb">Embedded</span>, or <strong>both</strong>. Complete the steps that apply.
  Jump to: <a href="#data-connector">Data Connector</a> · <a href="#embedded-apps">Embedded</a>
</div>

  <h3>Typical Symptoms Before Installation</h3>
  If the app isn’t installed in the Procore company, you may see:
  - 401 Unauthorized or 403 Forbidden when calling company- or project‑scoped endpoints
  - Inability to create embedded configurations in **App Management**
  - The app not appearing in a project’s **Select an App** menu
  - Successful user sign‑in but API calls still failing due to missing install
  - Webhooks or background jobs receiving repeated 4xx responses

  **Caution:** If 401/403 responses persist, don’t keep calling the company until it works. Implement graceful backoff (for example, exponential backoff with jitter and a retry cap) or pause requests until installation is confirmed. This prevents unnecessary load and avoids repeated failures before the app is installed.

  </div>
</details>

***
<details>
  <summary class="collapseListH2">
    Step 2. View Post‑Installation Notes
    <span class="collapseSubhead">After install, Procore shows the developer‑provided post‑installation notes. Use these to tell installers what to do next in your product and in Procore.</span>
  </summary>
  <div markdown="1">

  <h3>What the Installer Will See</h3>
  1. **Instructions URL** — a link to step‑by‑step setup on the developer’s site.
  2. **Instructions Page Name** — the label shown for that link.
  3. **Post‑installation Notes** — any additional steps (for example, create an account, enter an API key, connect a project).

  Installers can reopen these notes anytime in **Company Admin** > **App Management** by selecting the app.

  > **For developers:** Define these in the **Developer Portal** under **Instructions and Post‑Installation Notes** so installers know exactly what to do next.

  ![Post Install Steps]({{ site.baseurl }}/assets/guides/app-install-instructions-final.png)

  </div>
</details>

***
<details>
  <summary class="collapseListH2">
    Step 3. Finalize App Setup
    <span class="collapseSubhead">Installation enables access, but most apps still require setup. Follow the pattern for your app capabilities.</span>
  </summary>
  <div markdown="1">

  <h3 id="data-connector"><strong>[DATA CONNECTOR]</strong> Configuration, Setup, and Permissions</h3>
  Data connector apps exchange data via the API and are typically connected from the external system after the app is installed in Procore (for example, a **Connect to Procore** flow). Your authentication method influences the setup steps required.

  <h4>User‑level OAuth (authorization code)</h4>
  Access mirrors the signed‑in user’s company and project membership and permissions. Ensure the authorizing user is a member of the relevant projects and has the required permissions.

  <h4>Service account (client credentials / DMSA)</h4>
  Access is based on the service account user’s company and project membership and permissions. After installation, the service account is automatically generated in the customer’s **Company Directory**; the Procore customer may need to add it to each target project and assign a permission template based on the integration requirements.

  <h4>Common errors and fixes — Data connector apps</h4>
  - **401 Unauthorized** — App not installed, or token invalid/expired, or wrong grant. → Install the app or re‑authenticate.
  - **403 Forbidden** — Principal lacks project membership or permissions. → Add the user or service account to the project or verify the permissions.
  - **404 Not Found** — Resource is outside the authenticated principal’s access. → Verify IDs and membership.
<div class="details-bottom-spacing"></div>

***
  <h3 id="embedded-apps"><strong>[EMBEDDED]</strong> Configuration and Setup (Side Panel, Full Screen)</h3>
  Embedded apps run inside Procore and require a configuration that links the installed app to one or more projects.

  <h4>Create a Configuration</h4>
  1. Open **Company Admin** > **App Management**.
  2. Under **Installed Apps**, select your app, then open the **Configurations** tab.
  3. Select **Create Configuration**.
  4. Enter a **Title** and complete any **Configurable fields** your app requires.
  5. Select **Create**.

  <h4>Common errors and fixes — Embedded apps</h4>
  - **App not visible in project:** No configuration exists or it wasn’t applied to this project. → Create or apply a configuration and confirm projects are selected.
  <div class="details-bottom-spacing"></div>

  </div>
</details>

***
## Related Articles
- <a href="https://support.procore.com/faq/what-is-app-management" target="_blank">What is App Management?</a>
- <a href="https://support.procore.com/faq/what-are-app-configurations" target="_blank">What are App Configurations and How Do I Work With Them?</a>
- <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-app-from-marketplace" target="_blank">Install an App from the Marketplace</a>
- <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">Install a Custom App</a>
- <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/create-app-configuration" target="_blank">Create an App Configuration and Apply it to Projects</a>
- <a href="https://support.procore.com/products/online/user-guide/project-level/home/tutorials/launch-embedded-app" target="_blank">Launch an Embedded App in a Project</a>