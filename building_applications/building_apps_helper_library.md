---
permalink: /building-apps-helper-library
title: Embedded App Helper Library
layout: default
section_title: Building Applications

---

To aid you in developing your embedded App, we have published an open-source Javascript library to help simplify the implementation of the required authorization and authentication components of your App. The library is available for download on GitHub at: [procore-iframe-helpers](https://github.com/procore/procore-iframe-helpers){:target="_blank" rel="noopener"}.

## Building the Library

The Procore Embedded App Helper Library is provided as Typescript source code that you can compile into a Javascript (*.js) library for use in your application. We recommend the yarn package manager for building the library from the Typescript source. If you need to install `yarn` to your computer, visit the [yarn website](https://yarnpkg.com/en/docs/install){:target="_blank" rel="noopener"} and follow the installation instructions they provide for your particular operating system.

Once you have `yarn` installed, you can use the following steps to download and build the Procore Embedded App Helper Library:

1. Open your browser and navigate to [procore-iframe-helpers](https://github.com/procore/procore-iframe-helpers){:target="_blank" rel="noopener"}.
1. Open your favorite terminal application and run `git clone git@github.com:procore/procore-iframe-helpers.git` from the command line. The master branch of the library source code is cloned to your computer.
1. From the root of the source code tree, run `yarn install`. This command installs all the dependent packages you need to build the library.
1. Run `yarn build`. This command creates a new `/dist` subdirectory that contains the compiled Javascript library file - `ProcoreIframeHelpers.js`.

## Using the Library

The Procore Embedded App Helper library provides functions that help simplify your implementation of OAuth 2.0 within your embedded App. We recommend reviewing [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) and related Developer Portal articles before incorporating the library into your application. Here are the high-level steps for implementing authorization and authentication via OAuth 2.0 with the Procore Embedded App Helper library:

- To begin using the library you must first place a copy of `ProcoreIframeHelpers.js` in your project so that you can reference it from your code to access the library functions. Then, include it in your code using a <script> tag (e.g., `<script type="text/javascript" src="/libraries/ProcoreIframeHelpers.js"></script>`)
- On the landing page for your application, initialize the library using `const context = procoreIframeHelpers.initialize();`. This sets the proper context for subsequent calls to the library functions.
- Place a button or other clickable control on the page, which when clicked, runs the `context.authentication.authenticate()` function. This displays the Procore login panel through which your end user authorizes your application to connect to their Procore account. Upon successful authentication of the end user's credentials, `context.authentication.notifySuccess({})` is called from your main page causing the login panel to close and your embedded App to launch within the Procore web user interface.

The following diagram illustrates the general flow of the authorization and authentication process using the Procore Embedded App Helper library:

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

Here are a few points to consider as you work with the Procore Embedded App Helper library.

- If your application uses the [OAuth 2.0 Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}) flow, the user will be redirected to your application's registered `redirect_uri` with the authorization code included as a URL hash fragment. You will need to implement a callback function that parses this fragment in order to obtain the authorization code so that you can subsequently exchange it for an access token and successfully make calls to the Procore API.
- If your application uses the [OAuth 2.0 Implicit Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_implicit_flow.md %}) flow, the user will be redirected to your application's registered `redirect_uri` with the access token included as a URL hash fragment. You will need to implement a callback function that parses this fragment in order to obtain the access token so that you can successfully make calls to the Procore API.
