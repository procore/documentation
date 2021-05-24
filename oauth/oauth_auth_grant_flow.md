---
permalink: /oauth-auth-grant-flow
title: OAuth 2.0 Authorization Code Grant Flow
layout: default
section_title: OAuth 2.0 Authentication
---

> IMPORTANT
>
> Prior to working through this tutorial you should review the previous topics in this section to ensure your have a solid understanding of how OAuth 2.0 is implemented in the Procore API:
> - [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %})
> - [Understanding OAuth 2.0 Roles]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_roles.md %})
> - [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
> - [Procore API Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})


## Introduction

If you are developing a web server-based solution, then you will want to implement the Authorization Code grant type. Web server applications are written in a server-side language where the source code of the application is not visible to the public. This means the application is able to take advantage of the Client Secret when communicating with the authorization server, which provides more robust security. The authorization grant type is considered a “redirection-based” flow. As such, your application must be capable of interacting with the user’s web browser as well as receiving incoming requests (via redirection) from the Procore authorization server.

In the following sections we examine the Oauth 2.0 Authorization Code Grant flow in the context of the Procore API and present a tutorial with an example application.

## Authorization Code Grant Activity Diagram

The diagram below illustrates the interaction between the various entities comprised by the Authorization Code Grant flow.

![Diagram]({{ site.baseurl }}/assets/guides/auth-code-grant-type-activity-diagram.png)

Let's summarize the flow as depicted in the diagram:

1. The Procore user opens a browser and navigates to your App's web page.
1. Your App displays a page with a button, link, or other control that allows the user to initiate the authorization step with the Procore authentication server.
1. The user clicks the control on the page served from the authentication server and initiates the flow.
1. The Procore authentication server presents the user with Procore login panel.
1. The user enters their Procore credentials and logs in.
1. The Procore authentication server responds by displaying the consent dialog.
1. The user elects to either allow or deny your App access to their data in Procore.
1. Once authorized by the user, the Procore authentication server redirects control back to your App with the authorization included in the hash fragment of the redirect URL.
1. Your App extracts the authorization code from the hash fragment of the redirect URL.
1. Your App uses the extracted authorization code and initiates a request to the authentication server to obtain an access token.
1. The authentication server returns a JSON object that includes the access token.
1. Your App extracts the access token from the JSON response.
1. Your App makes a call to the Procore API to access a resource.
1. The Procore API processes the request and responds with a JSON object.
1. Your App displays the contents of the JSON response object in the user's browser.
1. The user views the results of the API call in their browser.

## Tutorial: Sign-Up and Sign-In Flows for a Sample Application

This tutorial describes how to create sign-up and sign-in flows for use in a sample web application using the OAuth 2.0 Authorization Code grant type. By using calls to Procore's OAuth 2.0 endpoints triggered by button-clicks, you can allow Procore users to quickly set up an account and access your application. The workflow described here is similar to the social login signup experience with Facebook, Google, or Twitter buttons you may have seen in other web applications.

> PRODUCTION VS. SANDBOX ENVIRONMENTS
>
> It is important to note that access/refresh tokens are not shared across production and sandbox environments.
> API calls you make to Procore resources in your production environment must use a separate set of authentication keys (client ID and client secret) from those used for your sandbox environment.
> In addition, API calls to production must use the `https://api.procore.com` base URI, while calls to your sandbox must use the `https://sandbox.procore.com` base URI.
> Keep in mind that the examples presented below use the production base URI, rather than the sandbox base URI.

### Prerequisites

There are a number of prerequisites you will need to satisfy in order to successfully complete this tutorial:

- If you have not done so yet, sign up for an account on the [Procore Developer Portal](https://developers.procore.com/).
- Create a sample application and make sure the OAuth Redirect URI is set to `http://localhost:4567/callback`.
- Install and configure a local web server (apache, IIS, etc.)
- Install and configure a local database server (mySQL, SQLite, etc.)

### Step 1: Implement Sign-Up Flow

1. Create a root landing page in your sample application accessible at `http://localhost:4567`.
1. Create a button on your landing page with the label "Sign Up with Procore".
1. Create a hyperlink for the button that points to `https://login.procore.com/oauth/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=<REDIRECT_URI>`. Where:
    - `<CLIENT_ID>` is the Client ID value from your sample application page on the Developer Portal.
    - `<REDIRECT_URI>` is the Redirect URI value from your sample application page on the Developer Portal (http://localhost:4567/callback as defined above).

Visiting the landing page will display the linked button:

![Sign Up Button Here]({{ site.baseurl }}/assets/guides/oauth-sign-up.png)

When a user clicks the button they are forwarded to the [Grant App Authorization](https://developers.procore.com/reference/rest/v1/authentication#grant-app-authorization) API endpoint. As part of the hyperlink URI, you are passing your sample application's Client ID and the URI the application is currently running on (Redirect URI). At this point, the user is presented with a Procore login screen. After the user successfully signs in to Procore and authorizes your application to access their account, they are redirected back to the REDIRECT_URI parameter sent with the request.

### Step 2: Exchange Authorization Code for an Access Token

As mentioned above, after the user signs into Procore they are redirected back to your application.
Along with the redirect comes a code parameter, which represents an OAuth _Authorization Code_.
You will exchange this Authorization Code for an _Access Token_. An Access Token is what will give you the ability to make requests against the Procore API and get information about the user.
To understand this exchange, take a look at the [Get Access Token](https://developers.procore.com/reference/rest/v1/authentication#get-or-refresh-an-access-token) endpoint reference page.

1. Create a `/callback` function (endpoint) in your application.
1. In the `/callback` function, add code to parse the response from the call to [Grant App Authorization](https://developers.procore.com/reference/authentication#grant-app-authorization) and store the value of the `code` parameter in a variable.
1. Add code to the `/callback` function to exchange the Authorization Code for an Access Token by making a POST call to the [Get Access Token](https://developers.procore.com/reference/rest/v1/authentication#get-or-refresh-an-access-token) endpoint with the following payload:

```
{
  "grant_type":"authorization_code",
  "client_id":"<CLIENT_ID>",
  "client_secret":"<CLIENT_SECRET>",
  "code":"<authorization_code>",
  "redirect_uri":"<REDIRECT_URI>"
}
```

Where:

- `<CLIENT_ID>` is the Client ID value from your sample application page on the Developer Portal.
- `<CLIENT_SECRET>` is the Client Secret value from your sample application page on the Developer Portal.
- `<authorization_code>` is the value of the `code` parameter that you obtained in Step 1.
- `<REDIRECT_URI>` is the Redirect URI value from your sample application page on the Developer Portal.

### Step 3: Gather User Information

Now that you have successfully exchanged the Authorization Code for an Access Token, you can use it to query the Procore API for data about the current user. The Me endpoint retrieves the current user’s Procore ID and their email address, which is exactly the information you need to create a user account in your system!

1. Add code to your `/callback` function to set the Authorization Header value to be used for calling the Me endpoint. The value of the Authorization Header should be `Authorization: Bearer <ACCESS_TOKEN>` where `<ACCESS_TOKEN>` is the value for the token you obtained in previous section.
1. Add code to your `/callback` function to call the Me endpoint using syntax desribed in the [Me reference page](https://developers.procore.com/reference/rest/v1/me) and print the response to the user's browser.

Now when a user clicks the Sign-Up button on the Home page of your sample application, their user information - id, login (email address), and name - displays in the browser.

### Step 4: Persist the User Data

Now that you have information about who is trying to sign up, you will need to persist that data in a database for later retrieval. You can use any data store you wish - SQLite, mySQL, etc.

1. Initialize a new local database called `test.db` and create a users table with the following schema:
    ```
    id INTEGER PRIMARY KEY
    procore_id INTEGER
    email varchar(255)
    ```
1. Add code to your `/callback` function to connect to the database.
1. Next, add code to insert a new user into the table you created above:
    - Parse the response from the GET call to the [Me endpoint](https://developers.procore.com/reference/rest/v1/me)
    - Insert the value of `id` into the `procore_id` table field.
    - Insert the value of `login` into the `email` table field.

### Step 5: Redirect to Application Home

Now that you have saved the user to the database, it is time to log them in and proceed to the home page of your application. To log the user into your application, you simply set the user_id value in the browser session. The rest of your application will know if a user is signed in if the user_id value is present in the session.

1. Add code to the bottom of your `/callback` function to set the session `user_id` value equal to that of the `id` field stored in the database for the current user. As a last step in the `/callback` function, add code to redirect back to a `/home` function that you will add in the next step.
1. Add the `/home` function to your application and include the following:
    - Add code to open a connection to the database.
    - Add code to pull the current user `id` out of the database, who's `id` matches the session's `user_id`.
    - Add code to print the user information to the browser.

Now when the user is redirected back to the home of your application you would see something similar to `[1, 11111, "joecontractor@procore.com"]`.

### Step 6: Implement Sign-In Flow

Now that Procore users can sign up for your application, how do they sign in later? Well, thankfully you can reuse most of the work you have done up to this point. Building the Sign-in flow only involves making a few modifications to the existing code. Some things to keep in mind:

- Sign-in requests will also go through the `/oauth/authorize` endpoint.
- Sign-in and Sign-up requests both redirect back to the `/callback` endpoint in your application.

1. Create a Sign-in page that can be accessible at `http://localhost:4567/signin`.
1. Create a button on this page with the label "Sign In with Procore".
1. Create a hyperlink for the button that points to `https://login.procore.com/oauth/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=<REDIRECT_URI>` where:
    - `<CLIENT_ID>` is the Client ID value from your sample application page on the Developer Portal.
    - `<REDIRECT_URI>` is the Redirect URI value from your sample application page on the Developer Portal (http://localhost:4567/callback as defined above).
    Visiting the Sign-in page will display the linked button:

    ![Sign In Button Here]({{ site.baseurl }}/assets/guides/oauth-sign-in.png)
1. Modify your `/callback` function to have a conditional block that tests for the existance of the user in the database. Since the JSON response from the Me endpoint contains the `id` and `email` of the user who just signed in, and we save that `id` as the `procore_id` column in the database, you can easily check for the user in the database by querying for the matching `procore_id`.
    - If the user does not already exist in the database, create an entry for them as you did in the Step 4 Section above.
    - If the user does exist in the database, sign them into your application by setting the session `user_id` equal to their `id` in the database.

## Additional Suggestions

- If you want to keep making calls to the Procore API you should save the access and refresh tokens so they persist somewhere across requests.
- Most languages/frameworks usually have a library to wrap most of the OAuth logic for you. See this [list of client libraries](https://oauth.net/code/#client-libraries) for additional information.

## APPENDIX: A Ruby Example

For your reference, here is some ruby source code that implements the workflows described above.

```ruby
require 'sinatra'
require 'net/http'
require 'json'
require 'SQLite3'

CLIENT_ID ='073f626ee2c9602d7baea8dfb8080f6d24127fb9c55ae9acc4df4fba2813cfe2'
CLIENT_SECRET='1fe96a2a623fd085cd39cbf704796f1d0f4355adfe219e9f336deaf7da4c7c26'
REDIRECT_URI = 'http://localhost:4567/callback'

enable :sessions

get '/' do
  # This will render the HTML markup below
  erb :index
end

get '/signin' do
  erb :signin
end

get '/callback' do
  # Pull the authorization code from the code parameter
  authorization_code = params["code"]

  # Exchange endpoint
  uri = URI.parse("https://login.procore.com/oauth/token")

  # Post to /oauth/token with required information
  response = Net::HTTP::post_form(uri, {
    "grant_type" => "authorization_code",
    "client_id" => CLIENT_ID,
    "client_secret" => CLIENT_SECRET,
    "code" => authorization_code,
    "redirect_uri" => REDIRECT_URI
  })

  # Parse JSON response
  json = JSON.parse(response.body)

  # Me Endpoint
  me_uri = URI.parse("https://api.procore.com/rest/v1.0/me")
  me_request = Net::HTTP::Get.new(me_uri)

  # Set authorization header
  me_request["authorization"] = "Bearer #{json['access_token']}"

  me_response = Net::HTTP.start(me_uri.hostname, me_uri.port, use_ssl: true) do |http|
    http.request(me_request)
  end

  # Parse response
  me_json = JSON.parse(me_response.body)

  # Establish connection to database
  db = SQLite3::Database.new("test.db")

  # Look up user by ProcoreID
  user = db
    .execute("select * from users where procore_id = ?", me_json["id"])
    .first

  # User does not exist - create them in the database
  if user.nil?
    db.execute(
      "INSERT INTO users (procore_id, email) VALUES (?, ?)",
      [me_json["id"], me_json["login"]]
    )
    session["user_id"] = db.last_insert_row_id
  else
    # User already exists, sign them in
    session["user_id"] = user[0]
  end

  redirect to('/home')
end

get '/home' do
  # Open a connection to the database
  db = SQLite3::Database.new("test.db")

  # Pull the current user out of the database - user who’s id matches the id
  # stored in the session
  user = db
    .execute("select * from users where id = ?", session["user_id"])
    .first

  # Print the user as a string for the browser
  user.to_s
end

__END__

@@index
  <style>
    .signup-form {
      margin: 48px 0;
      text-align: center;
    }

    a {
      background-color: #f47e42;
      color: #fff;
      font-family: sans-serif;
      padding: 12px;
      text-decoration: none;
    }
  </style>
  <div class="signup-form">
    <a href='<%= "https://login.procore.com/oauth/authorize?client_id=#{CLIENT_ID}&response_type=code&redirect_uri=#{REDIRECT_URL}" %>'>
      Sign Up with Procore
    </a>
  </div>

@@signin
  <style>
    .signin-form {
      margin: 48px 0;
      text-align: center;
    }

    a {
      background-color: #f47e42;
      color: #fff;
      font-family: sans-serif;
      padding: 12px;
      text-decoration: none;
    }
  </style>
  <div class="signin-form">
    <a href='<%= "https://login.procore.com/oauth/authorize?client_id=#{CLIENT_ID}&response_type=code&redirect_uri=#{REDIRECT_URL}" %>'>
        Sign In with Procore
    </a>
  </div>
```
