---
permalink: /building-apps-helper-library
title: Procore Iframe Helper Library
layout: default
section_title: Building Applications

---

To aid you in developing your embedded App, we have published an open-source Javascript library to help simplify the implementation of the required authorization and authentication components of your App.
The Procore Iframe Helper Library is available for download on GitHub at: [procore-iframe-helpers](https://github.com/procore/procore-iframe-helpers).

For general information on building embedded Apps see:
- [Understanding App Types]({{ site.url }}{{ site.baseurl }}/building-apps-app-types)
- [Creating a New App]({{ site.url }}{{ site.baseurl }}/building-apps-create-new)
- [Creating an App Manifest]({{ site.url }}{{ site.baseurl }}/building-apps-define-manifest)

## Install Using NPM

The Procore Iframe Helper Library is provided as an NPM package.
To install the package on your computer, run the following command in your project from the command line.

`npm i @procore/procore-iframe-helpers`

If you need to install `npm` to your computer, visit the [NPM website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and follow the installation instructions they provide for your particular operating system.

## Using the Library

The Procore Iframe Helper library provides functions that help simplify your implementation of OAuth 2.0 within your embedded App. We recommend reviewing [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) and related Developer Portal articles before incorporating the library into your application. Here are the high-level steps for implementing authorization and authentication via OAuth 2.0 with the Procore Iframe Helper library:

- On the landing page for your application, initialize the library using `const context = procoreIframeHelpers.initialize();`. This sets the proper context for subsequent calls to the library functions.
- Place a button or other clickable control on the page, which when clicked, runs the `context.authentication.authenticate()` function. This displays the Procore login panel through which your end user authorizes your application to connect to their Procore account. Upon successful authentication of the end user's credentials, `context.authentication.notifySuccess({})` is called from your main page causing the login panel to close and your embedded App to launch within the Procore web user interface.

The following diagram illustrates the general flow of the authorization and authentication process using the Procore Iframe Helper library:

![IFrame library flow]({{ site.baseurl }}/assets/guides/iframe-library-flow.png)

Here are some sample code pages to help you get started.

**Landing Page:**

```html
<html>
<head>
  <script type="text/javascript" src="/libraries/ProcoreIframeHelpers.js"></script>
  <script>
    $(document).ready(function() {

      const context = procoreIframeHelpers.initialize();

      $('#submit1').on('click', function() {

        context.authentication.authenticate({

        // Set this to a URL on your domain that will start the authentication process.
        // This URL points to a route that calls the /oauth/authorize endpoint with client_id,
        // response_type, and redirect_uri query parameters...
        // https://login.procore.com/oauth/authorize?client_id=<ClientID>&response_type=<ResponseType>&redirect_uri=<RedirectID>
        url: "/auth/procore",

        // Send the end user to the /main route of your embedded app if authentication is successful.
        // This can be any route you choose.
        // You can optionally include a payload as a function parameter (i.e., function(payload))
        onSuccess: function() {
          window.location = "/main"
        },

        // Error handling function that runs if authentication fails. Here we are just logging the error
        // to the console, but you will want to display an error to the user. This
        // function can be triggered by you, or will be triggered automatically if the
        // user closes the authenication window.
        onFailure: function(error) {
          console.log(error);
        }

        });
      });
    });
  </script>
</head>
<body>
  <div>
    <h1>Welcome to the Embedded App!</h1>
    <input id="submit1" type="button" value="Allow the Embedded App to Access Your Procore Data"/>
  </div>
</body>
</html>
```

**Main App Page:**

```html
<html>
<head>
  <script type="text/javascript" src="/libraries/ProcoreIframeHelpers.js"></script>
  <script>
    const context = procoreIframeHelpers.initialize();

    // Call notifySuccess to close the login panel. An optional payload to be passed to your
    // onSuccess handler can be included with the notifySuccess method...
    context.authentication.notifySuccess({})
  </script>
</head>
<body>
  <div>
    <h1>Here is the main page of your embedded App!</h1>
  </div>
</body>
</html>
```

## Things to Consider

Here are a few points to consider as you work with the Procore Iframe Helper library.

- If your application uses the [OAuth 2.0 Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}) flow, the user will be redirected to your application's registered `redirect_uri` with the authorization code included as a URL hash fragment. You will need to implement a callback function that parses this fragment in order to obtain the authorization code so that you can subsequently exchange it for an access token and successfully make calls to the Procore API.
- If your application uses the [OAuth 2.0 Implicit Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_implicit_flow.md %}) flow, the user will be redirected to your application's registered `redirect_uri` with the access token included as a URL hash fragment. You will need to implement a callback function that parses this fragment in order to obtain the access token so that you can successfully make calls to the Procore API.
