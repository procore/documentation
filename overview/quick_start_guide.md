---
permalink: /quick-start-guide
title: Quick Start Guide
sub_header: Learn how to build and test your first Procore app.
layout: default
section_title: Overview
---

## Overview
This guide walks you through creating and testing a basic app using **User‑level Authentication** in the Procore Developer Sandbox. You'll create an app, add a data connector component, install it in your Sandbox company, obtain an access token, and make your first API calls.
<br><br>

***
## Steps to Make Your First API Call
### Prerequisites
1. A <a href="https://developers.procore.com/signup" target="_blank">Procore Developer Account</a> (email verified).
2. Basic understanding of OAuth 2.0 (authorization code flow) and redirect URIs.
3. An API client such as <a href="https://www.postman.com/" target="_blank">Postman</a> or <a href="https://curl.se/" target="_blank">cURL</a>.
<br><br>

<details>
<summary class="collapseListTierOne">Step 1: Create Your App in the Developer Portal</summary>
<p>
  <ol>
    <li>Sign in to the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.</li>
    <li>Go to <b>My Apps</b> and select <b>Create New App</b>.</li>
    <li>Enter a meaningful name (for example, <i>QuickStart Test App</i>).</li>
    <li>Select <b>Create App</b>.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Add a Data Connector Component</summary>
<p>
  A <b>Data Connector Component</b> enables your app to access Procore's REST APIs.
  <ol>
    <li>In your app, expand <b>Data Connector Components</b>.</li>
    <li>Select <b>Add Components</b>.</li>
    <li>Select <b>User‑level Authentication</b>.</li>
    <li>Select <b>Save Component</b>.</li>
    <li>Select <b>Create Version</b> near the top right and follow the prompts.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Update Your App's Redirect URI (for testing)</summary>
<p>
  For quick testing, set a temporary out‑of‑band Redirect URI.
  <ol>
    <li>In your app, select <b>OAuth Credentials</b>.</li>
    <li>Under <b>Sandbox OAuth Credentials</b>, edit the <b>Redirect URI</b>.</li>
    <li>Enter <code>urn:ietf:wg:oauth:2.0:oob</code> (testing only).</li>
    <li>Select <b>Update</b>.</li>
  </ol>
  <i>Note:</i> Use a proper HTTPS redirect URI in production.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 4: Install Your App in the Developer Sandbox</summary>
<p>
  Each app includes a Developer Sandbox for testing. Only the App Creator is added by default. To add testers, see <a href="https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory" target="_blank">Add a User Account to the Company Directory</a>.
  <ol>
    <li>Sign in to your Developer Sandbox company.</li>
    <li>Go to <b>Company Tools</b> &gt; <b>Admin</b> &gt; <b>App Management</b>.</li>
    <li>Select <b>Install App</b> &gt; <b>Install Custom App</b>.</li>
    <li>Paste the <b>Sandbox App Version Key</b> from your app in the Developer Portal.</li>
    <li>Select <b>Install</b>, then confirm.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 5: Generate an Authorization Code</summary>
<p>
  Replace <b>CLIENT_ID</b> with your Sandbox Client ID and open the URL in your browser to authorize.
  <ul>
    <li><code>https://login-sandbox.procore.com/oauth/authorize?response_type=code&amp;client_id=CLIENT_ID&amp;redirect_uri=urn:ietf:wg:oauth:2.0:oob</code></li>
  </ul>
  If prompted, sign in and select <b>Allow</b>. Copy the displayed <b>code</b> for the next step.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 6: Exchange the Code for an Access Token</summary>
<p>
  Use Postman (or any API client) to exchange the code for a token.
  <ol>
    <li>Create a <b>POST</b> request to <code>https://login-sandbox.procore.com/oauth/token/</code>.</li>
    <li>In the <b>Body</b> (x-www-form-urlencoded), add:</li>
      <ul>
        <li><code>grant_type</code>: <code>authorization_code</code></li>
        <li><code>code</code>: the authorization code from Step 5</li>
        <li><code>client_id</code>: your Sandbox Client ID</li>
        <li><code>client_secret</code>: your Sandbox Client Secret</li>
        <li><code>redirect_uri</code>: <code>urn:ietf:wg:oauth:2.0:oob</code></li>
      </ul>
    <li>Select <b>Send</b>.</li>
  </ol>
  If successful, the response includes <code>access_token</code>, <code>token_type</code>, <code>expires_in</code>, and <code>refresh_token</code>.
  <pre>{
  "access_token": "dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781",
  "token_type": "bearer",
  "expires_in": 5400,
  "refresh_token": "76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c",
  "created_at": 1508271900
}</pre>
  <i>Tip:</i> Store client credentials securely. Do not commit secrets to source control.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 7: Test API Requests</summary>
<p>
  With a valid access token, you can call Procore's REST APIs. Use the <b>Authorization</b> header with the Bearer token. API calls use the <code>https://sandbox.procore.com</code> base URL.
  <br><br>
  <b>1) List available companies</b>
  <ol>
    <li>Method: <b>GET</b></li>
    <li>URL: <code>https://sandbox.procore.com/rest/v1.0/companies</code></li>
    <li>Headers:
      <ul>
        <li><code>Authorization</code>: <code>Bearer ACCESS_TOKEN</code></li>
      </ul>
    </li>
  </ol>
  Copy the <code>id</code> of the company where your app is installed for the next request.
  <br><br>
  <b>2) List projects in a company</b>
  <ol>
    <li>Method: <b>GET</b></li>
    <li>URL: <code>https://sandbox.procore.com/rest/v1.1/projects?company_id=COMPANY_ID</code></li>
    <li>Headers:
      <ul>
        <li><code>Authorization</code>: <code>Bearer ACCESS_TOKEN</code></li>
        <li><code>Procore-Company-Id</code>: <code>COMPANY_ID</code></li>
      </ul>
    </li>
  </ol>
  For more endpoints, see the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Overview</a>.
</p>
</details>
<br><br>

***
## You Just Made Your First Procore API Call
You've created an app, authenticated with OAuth 2.0, and retrieved real data from Procore. From here:

- **Plan your integration:** [Available App Types]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %})
- **Explore the full API:** <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a>
- **Set up webhooks:** [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %})
- **Publish to the Marketplace:** [Technology Partner Overview]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %})
