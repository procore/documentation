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

You can also define your own custom field variables for use as query parameters.
Values for custom parameters can be set by the user at time of app installation allowing you further personalize your application.


