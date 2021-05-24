---
permalink: /building-apps-install-arch
title: App Installation Architecture
layout: default
section_title: Building Applications

---

Before diving into the specifics of building an App, it is important to understand the architecture of App installation in Procore. The following diagram depicts how Apps are installed, configured, and launched in Procore.

![Install Architecture]({{ site.baseurl }}/assets/guides/iframe-install-arch.png)

The illustration above shows that Apps are installed at the company level in Procore and then configured at the project level. Procore company administrators first install an App for their entire company. Then, Procore company administrators or project users can create _App configurations_ and apply them to projects they want the App to be available in.

After a new App is installed in a company, it is listed under the **Installed Apps** tab on the App Management page in the Procore Company Admin tool. Subsequently, a Procore administrator or project user can **View** the App and use **Create New Configuration** on the **Configurations** tab to configure the App for use in one or more specific Projects. Procore end users are then able to launch the App at the Project level using the **Select an App** menu in the Procore navigation header. If a Procore administrator wants to suspend usage of the App across all Projects, they simply navigate to the **View** page for the App and click **Uninstall**. This moves the App to the **Uninstalled Apps** tab.

To summarize, here are the high-level steps for installing an App in a Company:

1. As a Procore administrator, log in to Procore and go to the **Company Admin** tool.
1. Under **Administrative Settings**, select **App Management**.
1. Click **Install App**.
1. If you want to install a custom App, choose **Install Custom App**. Otherwise, choose **Install from Marketplace**.

Here are the high-level steps for creating an App configuration and applying it to a project:

1. As a Procore administrator, log in to Procore and go to the **Company Admin** tool.
1. Under **Administrative Settings**, select **App Management**.
1. Under **Installed Apps**, locate the App you want to create a configuration for and click **View**.
1. From the **Configurations** tab, click **Create New Configuration**.
1. Select one or more projects to apply the new App configuration to.
1. Enter a **Title** for the new App configuration.
1. Provide values for any **Configurable Fields** that may be required for the App.
1. Click **Create**.

Here is the End-User Flow:

1. As a Procore end user, log in to Procore and go to the Project you want to work in.
1. In the navigation header, open the **Select an App** menu and choose the App you want to launch.

### App Management in Procore

The following Procore Support Site articles cover how Procore company administrators and project users work with the App Management feature.

- [What is App Management?](https://support.procore.com/faq/what-is-app-management){:target="_blank" rel="noopener"}
- [What are App Configurations and how do I work with them?](https://support.procore.com/faq/what-are-app-configurations){:target="_blank" rel="noopener"}
- [Install an App from the Marketplace](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-app-from-marketplace){:target="_blank" rel="noopener"}
- [Install a Custom App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app){:target="_blank" rel="noopener"}
- [Uninstall an App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/uninstall-app){:target="_blank" rel="noopener"}
- [Reinstall an App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/reinstall-an-app){:target="_blank" rel="noopener"}
- [Update an Installed App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/update-installed-app){:target="_blank" rel="noopener"}
- [Create an App Configuration and Apply it to Projects](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/create-app-configuration){:target="_blank" rel="noopener"}
- [View Projects with App Configurations](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/view-project-configs){:target="_blank" rel="noopener"}
- [Edit an App Configuration](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/edit-app-configuration){:target="_blank" rel="noopener"}
- [Delete an App Configuration](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/delete-app-configuration){:target="_blank" rel="noopener"}
- [Create an App Configuration in a Project](https://support.procore.com/products/online/user-guide/project-level/home/tutorials/configure-app-in-project){:target="_blank" rel="noopener"}
- [Launch an Embedded App in a Project](https://support.procore.com/products/online/user-guide/project-level/home/tutorials/launch-embedded-app){:target="_blank" rel="noopener"}
- [View API Request Metrics](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/view-api-request-metrics){:target="_blank" rel="noopener"}
