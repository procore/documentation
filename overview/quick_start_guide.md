---
permalink: /quick-start-guide
title: Quick Start Guide
sub_header: Learn how to build and test your first Procore App.
layout: default
section_title: overview
---

## Introduction
This guide walks you through the process of creating and testing a basic app with Procore's API, using User-Level Authentication. By following these steps, you’ll install your app in a Sandbox environment, configure components, and generate an access token—all within 15 minutes.
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
    <li>In this field, paste the following text: <code>urn:ietf:wg:oauth:2.0:oob</code>.</li>
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

<!-- <details>
<summary class="collapseListTierOne">Step 1: Create Your App in the Developer Portal</summary>
<p>
  <b>Prerequisite:</b> Active Developer Account.
  <br><br>
  Before getting started, you will need to have created a Developer Account by signing up through the <a href="https://developers.procore.com/signup" target="_blank">Procore Developer Portal</a> and verify your information.
  <br><br>
  Once you have an account, you will be able to create an app by selecting <b>Create a New App</b> in 'My Apps' and providing a name for the app.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Add a Data Connector Component</summary>
<p>
  <b>Prerequisite:</b> Active Developer Account and an App.
  <br><br>
  <b>Required Role:</b> App Owner or Admin.
  <br><br>
  Once you have a Developer Account and an app created, you will be able to select an available app type to build by expanding the <b>Data Connector Components</b> section.
  <br><br>
  <b>To Add The User-Level Authentication Component:</b>
  <ol>
    <li>Select the down arrow to expand 'Data Connector Components'.</li>
    <li>Click <b>Add Components</b> in the middle of the 'Data Connector Components'.</li>
    <li>In the side panel, select 'User-Level Authentication'.</li>
    <li>Click <b>Save Component</b> in the bottom right corner of the side panel.</li>
    <li>Click <b>Create Version</b> in the near the top right then follow the prompts.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Update Your App’s URIs</summary>
<p>
  <b>Prerequisite:</b> Active Developer Account and an App.
  <br><br>
  <b>Required Role:</b> App Owner or Admin.
  <br><br>
  Now that we have an app and a component added, you will need to change the <b>Redirect URI</b> of the app to help simplify the process of creating an access token. 
  <br><br>
  It's important to note that this specific redirect URI we will use in step is meant for testing purposes.
  <br><br>
  <b>Update the Redirect URI:</b>
  <ol>
    <li>Select <b>OAuth Credentials</b> on the left hand side.</li>
    <li>Under <b>Sandbox OAuth Credentials</b>, click into the <b>Redirect URI</b> field.</li>
    <li>In this field, paste the following text: <code>urn:ietf:wg:oauth:2.0:oob</code>.</li>
    <li>Click <b>Update</b> in the bottom right corner.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">4. Access the Procore Developer Sandbox</summary>
<p>
  <b>Prerequisite:</b> Active Developer Account and an App.
  <br><br>
  After creating an app, a Developer Sandbox will automatically be established as a testing environment. Check your email inbox for a message prompting you to create a password and access the Sandbox.
  <br><br>
  You can also find the Sandbox URL by navigating to the <b>Sandbox OAuth Credentials</b> section of your app.
  <br><br>
  Please note that only the App Creator will be automatically added to the Developer Sandbox. If you want to add internal and external testers to this environment, learn how to do so by visiting <a href="https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory" target="_blank">Add a User Account to the Company Directory</a>.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">5. Install Your Custom App</summary>
<p>
  <b>Prerequisite:</b> Active Developer Account, and an App with the 'User-Level Authentication' added.
  <br><br>
  After selecting the data connector component and saving a version, click on the copy icon under <b>Sandbox App Version Key</b> to copy the text. With the app version key copied to your clipboard, proceed to the Developer Sandbox Account where you wish to install your app.
  <br><br>
  To install your custom app, see <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">Install Custom App</a> or refer to the direct steps below.
  <br><br>
  <b>While in the Developer Sandbox Account:</b>
  <ol>
    <li>Navigate to the Company level Admin tool.</li>
    <li>Under 'Company Settings', click <b>App Management.</b></li>
    <li>Click <b>Install App</b> and choose <b>Install Custom App.</b></li>
    <li>Paste the previously copied App Version Key.</li>
    <li>Click <b>Install.</b></li>
    <li>Click <b>Install</b> again to confirm the installation.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">6. Create an Access Token</summary>
<p>
  <b>Prerequisite:</b> An app with 'User-Level Authentication' added and the app is installed in your Developer Sandbox.
  <br><br>

  To generate an access token using User-Level Authentication, you will need to first generate a 'code' from Procore, then exchange that code for an access token. Follow the steps below to generate a code and then create an access token.
  <br><br>

  <b>1. To generate a code with your web browser:</b>
  <ol>
    <li>In the following URL, replace the <b>client_id</b> variable with that of your Sandbox Credentials, which can be found in your app through the Developer Portal: <code>https://login-sandbox.procore.com/oauth/authorize?response_type=code&client_id=enterClientIdHere&redirect_uri=urn:ietf:wg:oauth:2.0:oob</code></li>
    <li>Open the link you just created in your web browser. This may prompt you to log in, if you are already not signed into Procore. Additionally, you may have to select <b>Approve</b> if the app is accessing your information for the first time.</li>
    <li>Once successfully done, copy the code that is provided.</li>
  </ol>

  <b>2. With the code, create an access token in an application like Postman:</b>
  <ol>
    <li>Open Postman and create a new collection by clicking <b>New</b> at the top left.</li>
    <li>Name the collection 'Procore API Getting Started' or similar.</li>
    <li>Add a request to the collection, naming it 'Create Procore Access Token'.</li>
    <li>Enter the URL as <code>https://login-sandbox.procore.com/oauth/token/</code>.</li>
    <li>Change the request method to <b>POST</b>.</li>
    <li>Refer to the Procore API documentation for the required key/value pairs; see <a href="https://developers.procore.com/reference/rest/authentication?version=latest#get-or-refresh-an-access-token" target="_blank">Get Access Token</a>.</li>
    <li>In the 'Body' tab of the Postman request, select <b>x-www-form-urlencoded</b>.</li>
    <li>Add four entries for <b>client_id</b>, <b>client_secret</b>, <b>code</b>, and <b>grant_type</b> in the <b>Key</b> section.</li>
    <li>Within the Procore Developer Portal, copy your Client ID and Client Secret from the <b>Sandbox OAuth Credentials</b> section in your app and paste them into the corresponding <b>Value</b> fields in Postman.</li>
    <li>Set the <b>grant_type</b> value field to following: <code>authorization_code</code>.</li>
    <li>Paste the previously copied <b>code</b> into the corresponding value field.</li>
    <li>Select <b>Save</b> near the top right corner, then select <b>Send</b>.</li>
  </ol>

  If the request returns a 200 response code, you'll receive a working access token in the response body.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">7. Use the Procore APIs</summary>
<p>
  <b>Prerequisite:</b> An app that is installed in your Developer Sandbox using 'User-Level Authentication', and a valid access token.
  <br><br>
  Now that we have an access token, we can begin using the Procore APIs to it's full capabilities by calling on data that is in Procore, such as <a href="https://developers.procore.com/reference/rest/companies?version=latest#list-companies" target="_blank">List Available Companies</a> and <a href="https://developers.procore.com/reference/rest/projects?version=latest#list-projects" target="_blank">List Projects</a>.
  <br><br>
  Additionally, you can use the access token to create new data in Procore, or update existing data by using the corresponding <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">Procore REST APIs</a>.
  <br><br>
  <b>1. To generate a list of available companies based on your access token in Postman:</b>
  <ol>
    <li>Add a new request to Postman, naming it 'List Available Companies'.</li>
    <li>Ensure the request method is set to <b>GET</b>.</li>
    <li>Enter the URL as <code>https://sandbox.procore.com/rest/v1.0/companies</code>.</li>
    <li>In the 'Header' tab of the Postman request, add <code>Authorization</code> to the <b>Key</b> field, followed by <code>Bearer yourAccessToken</code> in the value field.</li>
    <li>Replace <code>yourAccessToken</code> with the access token you previously generated.</li>
    <li>Select <b>Save</b> near the top right corner, then select <b>Send</b>.</li>
  </ol>

  <b>2. To generate a list of projects from a specific company based on your access token in Postman:</b>
  <ol>
    <li>Add a new request to Postman, naming it 'List Projects in a Company'.</li>
    <li>Ensure the request method is set to <b>GET</b>.</li>
    <li>Enter the URL as <code>https://sandbox.procore.com/rest/v1.1/projects?company_id=</code>.</li>
    <li>In the <b>Query Params</b> section, enter the <code>company_id</code> that was returned in the <b>List Available Companies</b> step.</li>
    <li>Navigate over to the 'Header' tab, add <code>Authorization</code> to the <b>Key</b> field, followed by <code>Bearer yourAccessToken</code> in the value field.</li>
    <li>Replace <code>yourAccessToken</code> with the access token you previously generated.</li>
    <li>In the 'Header' tab of the Postman request, add <code>Procore-Company-Id</code> to the <b>Key</b> field, followed by <code>company_id</code> in the value field, which was returned in the <b>List Available Companies</b> step.</li>
    <li>Select <b>Save</b> near the top right corner, then select <b>Send</b>.</li>
  </ol>
</p>
</details> -->


<!-- > HTTPS REQUIREMENT
>
> All Procore API resources are protected by the [Transport Layer Security (TLS) protocol](https://tools.ietf.org/html/rfc5246) for ensuring user interaction with Procore over the internet occurs securely without transmissions being vulnerable to outside entities.
TLS encrypts a channel between two endpoints (for example, between a web browser and web server) to provide privacy and reliability of data transmitted over the communications channel.
As a result, any call you make to a Procore API resource must use the `HTTPS` scheme in the URL.
See [Transport Layer Security Requirements]({{ site.url }}{{ site.baseurl }}{% link api_essentials/tls_reqs.md %}) for additional information. -->

<!-- ## cURL and Postman

Two popular web development test tools - cURL and Postman - can be used to explore the capabilities of the Procore API without having to fully build out your application.
In the following sections we use these tools to illustrate how you can make your first call to the Procore API.
If you are unfamiliar with these tools, here are some helpful resources to get you started.

- [cURL Home Page](https://curl.haxx.se/)
- [cURL GitHub Repository Readme](https://github.com/curl/curl/blob/master/README.md)
- [Postman Home Page](https://www.getpostman.com/)
- [Postman Documentation](https://www.getpostman.com/docs/v6/) -->

<!-- ### Procore OAuth 2.0 Postman Collection with cURL Examples

We've put together a helpful Postman collection of cURL examples for the Procore OAuth 2.0 Authentication endpoints that you can use while you build, test, and maintain your application.
Simply [visit this link](https://documenter.getpostman.com/view/3996804/SW7bzS65) to view the collection and begin exploring the Procore OAuth 2.0 authentication endpoints.
Each endpoint includes an explanation of its functionality along with a pre-formatted cURL example command that you can copy and paste as needed.

### Using cURL to Make Your First Procore API Call

In this section, the cURL command line tool is used to retrieve an OAuth 2.0 access token and make a simple call to the Procore API. -->

<!-- ### Getting Started
To get started with your first API calls, view the sections below.
<br><br> -->

<!-- ### 1. Obtain Authorization from the User

The first step to obtaining a token is to open your browser and make a call to the `/authorize` endpoint using a REST URL.
<br >(Note: If you are using the client credentials grant type, this Step 1 can be skipped and you can go straight to Step 2 below - Retrieve an Access Token.
See [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) for additional information.)

The syntax for this URL is shown here:

    https://login.procore.com/oauth/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>

Let’s break this URL into its constituent components, so we can examine it in more detail:

- The first piece of the URL - `https://login.procore.com/oauth` - is known as the Base URL. We include the Base URL with every call we make to the Procore API.
- Next, we see the endpoint definition itself - `/authorize`.
- Following that, three distinct query parameters are defined - `response_type`, `client_id`, and `redirect_uri`.

A question mark symbol is used to separate the query parameters from the rest of the URL.
Let’s have a look at each of these parameters:

- `response_type` - set to a value of ‘code’, indicates that we want the Procore API `/authorize` endpoint to return an authorization code for us.
- `client_id` - should match what you retrieve from your application page on the Developer Portal.
- `redirect_uri` - should be set to ‘urn:ietf:wg:oauth:2.0:oob’. This allows you to obtain an authorization code without having to run a web server locally

If we build up this URL in the address bar of our browser and send it, the Procore API responds with a panel displaying the returned authorization code.

![auth code]({{ site.baseurl }}/assets/guides/auth-code.png)

It is important to note that the authorization code you obtain is only valid for ten minutes.
As such, you must use this code to retrieve an access token within the 10 minute expiration period.
Otherwise, you will need to call the /authorize endpoint again to obtain a valid authorization code.

### 2. Retrieve an Access Token

Now that we have an authorization code, we can use that to retrieve an access token.
We’ll use the Procore API /token endpoint for this step.
Our cURL command for retrieving an access token will pass the following parameters:

- `client_id` - should match what you retrieve from your application page on the Developer Portal.
- `client_secret` - should match what you retrieve from your application page on the Developer Portal.
- `code` - is the authorization code string you captured in the previous step using the /authorize endpoint.
(only needed when using the authorization code grant type)
- `grant_type` - is set to “authorization_code” or "client_credentials" as appropriate.
- `redirect_uri` - should be set to “urn:ietf:wg:oauth:2.0:oob” to be consistent with our example.

Below is an example cURL command for retrieving an access token using the authorization code grant type:

```
curl -F grant_type=authorization_code \
  -F client_id=db0d63cfa7ac3ceed7166081542216ec51e36941234e5e879105e36bd76dbf63 \
  -F client_secret=0b57e8d87e35370307ba5f98ad135bd155cabacea56d12344afe083e2eb04b54 \
  -F code=8957b84a67f6ae55ab79c9767836a0af30b7fb7e4c36b27412343728cce71ec7 \
  -F redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -X POST https://login.procore.com/oauth/token
```

Here is an example cURL command for retrieving an access token using the client credentials grant type:

```
curl -F grant_type=client_credentials \
  -F client_id=db0d63cfa7ac3ceed7166081542216ec51e36941234e5e879105e36bd76dbf63 \
  -F client_secret=0b57e8d87e35370307ba5f98ad135bd155cabacea56d12344afe083e2eb04b54 \
  -F redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -X POST https://login.procore.com/oauth/token
```

Examining this command we see that we use -F command flags to specify each of the required parameters as being form field data.
In addition, we use backslash characters to denote line breaks which makes the example more readable.
Finally, we use the -X POST flag to tell cURL that we are sending a POST call to the Procore API `/token` endpoint.
Running this command returns a JSON block similar to the following.
Let’s take a look at it’s contents.

```
{
  "access_token":"dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781",
  "token_type":"bearer",
  "expires_in":5400,
  "refresh_token":"76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c",
  "created_at":1508271900
}
```

### 3. Making a Call to the Procore API

Now that we have successfully retrieved an access token, we can use it to make our first call to the Procore API.
For this example, we’ll use the simple /me endpoint to show that we can successfully contact the Procore API server and return information about the currently logged in user.
Again, we’ll use cURL to demonstrate this.

First, we’ll build up our cURL command using the following syntax, specifying the authorization code as a header parameter:

    curl -H "Authorization: Bearer <access token>” -X GET https://api.procore.com/rest/v1.0/me

Where `<access token>` is the string value for the access token we retrieved in the previous step.

If we execute this cURL command with a valid access token, it returns a JSON block similar to the following:

```
{
  "id": 1234567,
  "login": "joe.builder@acme.com",
  "name": "Joe Builder"
}
```

You have successfully made your first call to the Procore API! -->
