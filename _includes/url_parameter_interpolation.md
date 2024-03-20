_URL Parameter Interpolation_ is a method used in web development to insert variable data into a URL.
In the context of a Procore integration application, it is used to add specific values to the URL that can then be used to request specific data from the application server.
This technique is often used in HTTP GET requests, where data is passed as parameters in the URL itself.

Interpolation comes into play when these parameter values are dynamic - that is, they change based on user input or some other variable.
Developers can use interpolation to insert these variable values into the URL.
The Procore platform supports URL parameter interpolation for different sections of the URL, which you define when adding a component.
You can interpolate values for the URL subdomain, path parameters, and query parameters.
For example:

**Subdomain**

```{% raw %}
https://{{subdomain}}.domain.com
```{% endraw %}

**Path Parameters**

```{% raw %}    
https://example.domain.com/{{my_path1}}/{{my_path2}}
```{% endraw %}

**Query Parameters**

```{% raw %}  
?companyId={{procore.company.id}}&companyName={{procore.company.name}}&projectId={{procore.project.id}}&projectName={{procore.project.name}}&customField={{CustomField}}
```{% endraw %}

The Procore platform provides the following built-in variables for use as query parameters.

* `procore.company.id` - ID of the company where the App is installed.
* `procore.company.name` - Name of the company where the App is installed.
* `procore.project.id` - ID of the project in which the App has been configured.
* `procore.project.name` - Name of the project in which the App has been configured.

When included as URL parameters for your embedded (full screen or side panel) application, these values can be used to determine which company and project a user is working in.
The `procore.project.id` variable is commonly used in scenarios where data for the same Procore project lives in an external system and allows the embedded application to access the externally mapped/synced project.

You can also define your own custom field variables for use as query parameters.
Custom field variables can be specified as required _or_ optional.
Values for custom parameters are set by the user during installation allowing you further personalize your application.
Custom parameters are extremely flexible and can be used for any number of purposes. Some common uses for custom parameters include entering an ID number for a specific device in a drone/site camera application, specifying a membership or subscription ID for an application, or defining the locale in which an application will be used.
