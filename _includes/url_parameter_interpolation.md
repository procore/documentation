## Overview
_URL Parameter Interpolation_ makes your app's External URL adapt to each install — inserting dynamic, context-specific values instead of hardcoding them. This is how an embedded app responds to the **current company or project** and to setup values the installing admin provides.

There are two kinds of values you can interpolate:

- **Built-in Procore values** — provided automatically by Procore. Just add them to your URL; there's nothing to define.
- **Custom parameters** — values *you* define, which the admin installing your app enters during setup (for example, a Box folder ID).
<br><br>

***

## Where Interpolation Works
You can interpolate values in these parts of a component's URL in the Developer Portal:

- **Subdomain**
- **Path parameters**
- **Query parameters**

This is most common in HTTP GET requests, where data is passed in the URL.
<br><br>

***

## Built-in Procore Values
These variables are supplied automatically — add them to your URL and Procore fills in the value at runtime. No setup required.

- `procore.company.id` – ID of the company where the app is installed
- `procore.company.name` – Name of that company
- `procore.project.id` – ID of the project where the app is used
- `procore.project.name` – Name of that project

**Why use them?** They save time and prevent mistakes. For example, use `procore.project.id` to fetch project-specific data from your system without asking the user to enter it.
<br><br>

***

## Custom Parameters
> **Custom keys are your own namespace.** A custom parameter's key is a name you choose — it is *not* part of the `procore.*` built-in set. For instance, a custom `{% raw %}{{project_id}}{% endraw %}` you define is a separate value from the built-in `{% raw %}{{procore.project.id}}{% endraw %}`. To avoid confusion, don't reuse `procore.`-style names for custom keys.
{: .callout .callout--note}

Custom parameters are values the installing admin enters during setup. You define each one in your component, then reference it in your URL as a token. They can be required or optional, and are useful for things like a Box folder ID, a device ID (drone, camera), a subscription or user ID, or a region/locale.
<br><br>

***

## Interpolation Examples

**Subdomain** — pass a value into the subdomain dynamically.
```{% raw %}
https://{{subdomain}}.domain.com
```{% endraw %}

**Path parameters** — insert dynamic values directly into the path (built-in or custom).
```{% raw %}
https://box.app/{{folderID}}
```{% endraw %}

**Query parameters** — send Procore context and custom values as query string values.
```{% raw %}
?companyId={{procore.company.id}}&projectId={{procore.project.id}}&customField={{CustomField}}
```{% endraw %}

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***

## How to Add Custom URL Parameters

1. In your component configuration, click **Add Parameter**.  
   ![Component Add Param]({{ site.baseurl }}/assets/guides/form-based-component-add-param.png)

2. Define the **Name**, **Type**, **Key**, and **Description**.  
   ![Component Add Param Field]({{ site.baseurl }}/assets/guides/form-based-component-add-param-custom.png)

3. Mark the parameter as **Required** (or leave it optional) for installation.

4. Click **Save Parameter**.

Once saved, reference your custom parameter in the URL as a token (`{% raw %}{{YourKey}}{% endraw %}`), the same way you use built-in values — so your app delivers the right data in the right context.
