---
permalink: /making-first-call
title: Making Your First Call to the Procore API
sub_header: Learn how to build and test your first Procore App.
layout: default
section_title: Getting Started
---

## Introduction
This guide walks you through the process of creating and testing a basic app with Procore's API, using **User-Level Authentication**. By following these steps, you’ll install your app in a Sandbox environment, configure components, and generate an access token—all within 15 minutes.
<br><br>

***
## Steps to Begin Making Your First API Call
### Prerequisites
1. A <a href="https://developers.procore.com/signup" target="_blank">Procore Developer Account</a>.
2. Basic knowledge of OAuth 2.0 and redirect URIs.
3. An API testing tool, such as <a href="https://www.postman.com/" target="_blank">Postman</a> or <a href="https://curl.se/" target="_blank">cURL</a>.
<br><br>

<details>
<summary class="collapseListTierOne">Step 1: Create Your App in the Developer Portal</summary>
<p>
  Before getting started, you will need to have created a Developer Account by signing up through the <a href="https://developers.procore.com/signup" target="_blank">Procore Developer Portal</a> and verify your information.
  <ol>
    <li>Log in to the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.</li>
    <li>Navigate to <b>My Apps</b> and click <b>Create New App</b>.</li>
    <li>Provide a meaningful app name (e.g., "QuickStart Test App").</li>
    <li>Click <b>Create App</b> to proceed.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Add a Data Connector Component</summary>
<p>
  A <b>Data Connector Component</b> enables your app to retrieve data from Procore’s API.
  <ol>
    <li>Click the down arrow to expand the <b>Data Connector Components</b> section.</li>
    <li>Select <b>Add Components</b>.</li>
    <li>On the right-hand side, select <b>User Level Authentication</b>.</li>
    <li>Click <b>Save Component</b> at the bottom-right of the side panel.</li>
    <li>Click <b>Create Version</b> in the near the top right then follow the prompts.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Update Your App’s URIs</summary>
<p>
  To handle authentication, update your app’s redirect URIs. It's important to note that this specific redirect URI is meant for testing purposes only.
  <ol>
    <li>In your app, select <b>OAuth Credentials</b> on the left hand side.</li>
    <li>Under <b>Sandbox OAuth Credentials</b>, click into the <b>Redirect URI</b> field.</li>
    <li>In this field, paste the following text: <code>urn:ietf:wg:oauth:2.0:oob</code></li>
    <li>Click <b>Update</b> in the bottom right corner.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 4: Install Your App in the Sandbox</summary>
<p>
  Every created app comes with a Developer Sandbox intended to be your primary testing environment. To access the Developer Sandbox, check your email inbox for a message prompting you to create a password. Additionally, you can find the URL to your Sandbox by navigating to the <b>Sandbox OAuth Credentials</b> section of your app.
  <br><br>
  Please note that only the App Creator will be automatically added to the Developer Sandbox. If you want to add internal and external testers to this environment, learn how to do so by visiting <a href="https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory" target="_blank">Add a User Account to the Company Directory</a>.
  <ol>
    <li>Log into your Developer Sandbox and select the corresponding Company</li>
    <li>Select <b>Company Tools</b> at the top, then click on the <b>Admin</b> tool.</li>
    <li>On the right-hand side, click <b>App Management.</b>.</li>
    <li>Click <b>Install App</b> and choose <b>Install Custom App.</b></li>
    <li>Paste the previously copied App Version Key.</li>
    <li>Click <b>Install.</b></li>
    <li>Click <b>Install</b> again to confirm the installation.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 5: Generate a Code for User Authentication</summary>
<p>
  Now that your app is installed, we need to generate a code, which will be exchanged for an access token.
  <ol>
    <li>In the following URL, replace the <b>CLIENT_ID</b> variable with that of your Sandbox Credentials, which can be found in your app through the Developer Portal:</li> 
      <ul>
        <li><code>https://login-sandbox.procore.com/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob</code></li>
      </ul>
    <li>Open the edited URL in your web browser.</li>
      <ul>
        <li>This may prompt you to log in, if you are already not signed into Procore.</li>
        <li>Additionally, you may have to select <b>Approve</b> if the app is accessing your information for the first time.</li>
      </ul>
    <li>Once successfully done, copy the code value as it’s required for the next step.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 6: Exchange the Code for an Access Token</summary>
<p>
  To retrieve an access token, you’ll exchange the code for a token using Postman (or any API client):
  <ol>
    <li>In Postman, create a POST request to: <code>https://login-sandbox.procore.com/oauth/token/</code>.</li>
    <li>Add the following to the <b>Body</b> as x-www-form-urlencoded:</li>
      <ul>
        <li><code>grant_type</code>: <code>authorization_code</code></li>
        <li><code>code</code>: Your authorization code (from Step 5).</li>
        <li><code>client_id</code>: Your app’s Client ID.</li>
        <li><code>client_secret</code>: Your app’s Client Secret.</li>
        <li><code>redirect_uri</code>: <code>urn:ietf:wg:oauth:2.0:oob</code>.</li>
      </ul>
    <li>Click <b>Send</b>.</li>
  </ol>
  <br>
  If successful, you’ll receive a response containing your access token similar to the example below:
  <pre>{
  "access_token": "dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781",
  "token_type": "bearer",
  "expires_in": 5400,
  "refresh_token": "76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c",
  "created_at": 1508271900
}</pre>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 7: Test API Requests</summary>
<p>
  Now that we have an access token, we can begin using the Procore APIs to it's full capabilities by calling on data that is in Procore, such as <a href="https://developers.procore.com/reference/rest/companies?version=latest#list-companies" target="_blank">List Available Companies</a> and <a href="https://developers.procore.com/reference/rest/projects?version=latest#list-projects" target="_blank">List Projects</a>.
  <br><br>
  Additionally, you can use the access token to create new data in Procore, or update existing data by using the corresponding <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">Procore REST APIs</a>.
  <br><br>
  <b>1. To generate a list of available companies based on your access token in Postman:</b>
  <ol>
    <li>In Postman, create a POST request to: <code>https://sandbox.procore.com/rest/v1.0/companies</code>.</li>
    <li>Add the following header: <code>Authorization</code>: <code>Bearer ACCESS_TOKEN</code>.</li>
    <li>Once successfully done, copy the ID of the company where your app is installed as it’s required for the next step.</li>
  </ol>

  <b>2. To generate a list of projects from a specific company based on your access token in Postman:</b>
  <ol>
    <li>In Postman, create a POST request to: <code>https://sandbox.procore.com/rest/v1.0/companies</code>.</li>
    <li>Add the following headers:</li>
      <ul>
        <li><code>Authorization</code>: <code>Bearer ACCESS_TOKEN</code>.</li>
        <li><code>Procore-Company-Id</code>: The ID of the company (from Step 7.1).</li>
      </ul>
  </ol>
</p>
</details>
