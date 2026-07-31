---
permalink: /install-version-sandbox
title: Install a Version in Your Developer Sandbox
sub_header: Install an app version in your Developer Sandbox so you can test how Procore users will experience your app before promoting it to production.
layout: default
section_title: Build Your App
---

## Overview
Every app you create in the Developer Portal includes a **Developer Sandbox** — a Procore company preloaded with sample project data for building and testing. Before you promote a version to production, install it in your Developer Sandbox and run through it exactly as a Procore user would. You'll need the **Sandbox App Version Key** for the version you want to test.

For how installation works across sandbox and production environments, see <a href="/building-apps-install-arch">App Installation Overview</a>.

> **Note:** These steps cover the **Developer Sandbox**, which uses the Sandbox App Version Key. To test in a customer's **On-Demand** or **Monthly Sandbox**, install with the **Production** App Version Key instead — see [Procore Sandboxes]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/development_environments.md %}).
<br><br>

***
## Before You Begin
Only the **App Creator** is added to the Developer Sandbox by default. To let teammates install or test the app, add them to the sandbox company directory first. See <a href="https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory" target="_blank">Add a User Account to the Company Directory</a>.
<br><br>

***
## Install the Version
1. Sign in to your **Developer Sandbox** company.
1. Go to **Company Tools** &gt; **Admin** &gt; **App Management**.
1. Select **Install App** &gt; **Install Custom App**.
1. Paste the **Sandbox App Version Key** from your app in the Developer Portal.
1. Select **Install**, then confirm.

Your version is now installed. Open the app from the tool or module where its components are configured and test each one against the sample project data.
<br><br>

***
## Test a New Version
When you create a new version, you receive a new **Sandbox App Version Key**. Repeat the steps above with the new key to install and test the update in your sandbox before promoting it.
<br><br>

***
## Next Steps
Once the version behaves as expected in your sandbox, promote it to make it available for production use. See <a href="/building-apps-promote-manifest">App Versioning &amp; Production</a>.
