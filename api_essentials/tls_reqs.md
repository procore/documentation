---
permalink: /tls-reqs
title: Transport Layer Security Requirements
layout: default
section_title: API Essentials

---

## Overview

Network security architecture relies on the [Transport Layer Security (TLS) protocol](https://tools.ietf.org/html/rfc5246){:target="_blank" rel="noopener"} for ensuring user interaction with Procore over the internet occurs securely without transmissions being vulnerable to outside entities. TLS encrypts a channel between two endpoints (for example, between a web browser and web server) to provide privacy and reliability of data transmitted over the communications channel. The primary benefit of TLS is the protection of web application data from unauthorized disclosure and modification when it is transmitted between clients (web browsers) and the web application server, and between the web application server and back end or other non-browser based enterprise components.

## New TLS Requirements

Out of concern for protecting your data and to comply with industry standards, beginning May 1, 2019 Procore will only support TLS 1.2 network connections from your integrations and applications. From that point forward, Procore will refuse connections from integrations and applications that are not TLS 1.2 compliant. Your systems will need to connect to Procore using the TLS 1.2 protocol by 11:59 PM UTC on May 1, 2019 to avoid any interruption in service to your customers. Support for TLS 1.0/1.1 will be discontinued at that time.

## Checking for TLS 1.2 Server Compatibility

The Qualys SSL Labs site provides a tool for checking your server compatibility with TLS 1.2. Open your browser and navigate to the [SSL Server Test](https://www.ssllabs.com/ssltest/index.html){:target="_blank" rel="noopener"} page, enter the hostname for your application and click Submit.

> NOTE
>
> If you are unable to reach the SSL Labs site listed above, check with your IT team to verify that the www.ssllabs.com domain is appropriately whitelisted in your environment.

## Framework and Language Requirements

In planning for the migration to TLS 1.2, developers and system administrators should be aware of the potential for incompatible protocol versions in applications developed by their employees and partners. If you have developed applications or integrations that connect to the Procore API, you should take steps to ensure that they will continue to function with TLS 1.2. Of course every development framework and language is different with regard to how TLS is handled, but some general guidelines are provided in the following sections that should help you in determining what impacts the TLS 1.2 requirement may have on your systems.

### Microsoft .NET

In order to support TLS 1.2 you must be running .NET Framework v4.5 or later for your .NET application development. Microsoft provides a helpful knowledge base article - [Transport Layer Security (TLS) best practices with the .NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls){:target="_blank" rel="noopener"} - to assist you in determining the best course of action depending on your particular situation. Additionally, the following points may help you in supporting TLS 1.2 in your .NET applications.

- If you are using .NET 4.5, you can explicitly set the Security Protocol to TLS 1.2: `ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;`
- TLS 1.2 is not supported in .NET 4.0. However, you can install .NET 4.5 (or later) and set the Security Protocol to TLS 1.2 by using the explicit value 3072: `ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072;`
- If you have applications that target .NET 3.5, they do not include support for TLS 1.2. However, Microsoft Security Update 3 includes TLS 1.2 and can be installed on older servers so that the registry can be configured to use the operating system defaults for SSL and TLS.

### Java

TLS1.2 is enabled by default in Java 1.8 so no action should be required if you are using Java 1.8. If you are using Java 1.7, TLS1.2 is disabled by default so you must explicitly enable it or specify the protocol when creating your SSLContext. The most reliable way to address this condition is to pass in the TLS protocol version you want when creating your SSLContext. For more details see the Java Platform Group, Product Management Blog: [Diagnosing TLS, SSL, and HTTPS](https://blogs.oracle.com/java-platform-group/diagnosing-tls,-ssl,-and-https){:target="_blank" rel="noopener"}.

## OpenSSL

OpenSSL contains an open-source implementation of the TLS protocol. TLS 1.2 was first supported in OpenSSL version 1.0.1. You can quickly determine the version of OpenSSL you are running by executing `openssl version` at the command line. Wrappers allowing the use of the OpenSSL library are available in a number of popular languages. TLS 1.2 support considerations for Python and Ruby are described below.

#### Python

If you are using Python 2.7.9 or higher, TLS 1.2 is enabled by default. Please note that support for Python 2 is scheduled to end by 2020, so please consider upgrading to Python 3.4 or higher. For more details, see [Porting Python 2 Code to Python 3](https://docs.python.org/3/howto/pyporting.html){:target="_blank" rel="noopener"}.

#### Ruby

Ruby 2.0.0

When used with OpenSSL 1.0.1 or higher, TLS 1.2 is enabled by default. Using the :TLSv1_2 symbol with an SSLContext's ssl_version helps ensure that TLS 1.0 or earlier is disabled.

Ruby 1.9.3 and below

The :TLSv1_2 symbol does not exist in 1.9.3 and below, but it is possible to patch Ruby to add that symbol and compile Ruby with OpenSSL 1.0.1 or higher. To check if your current Ruby environment supports TLS 1.2, simply execute the following command in your terminal:

```
ruby -ropenssl -e 'puts "TLS v1.2 support: #{OpenSSL::SSL::SSLContext::METHODS.include?(:TLSv1_2)}"'
```

## Additional Information

If you need help understanding how the new TLS v1.2 requirement may impact your integration or application, please reach out to our API Support Team at <apisupport@procore.com> for assistance. If you want to understand how this change may impact end users of your application, please see [How does the Transport Layer Security v1.2 requirement impact users?](https://support.procore.com/faq/how-does-tls-1-2-impact-users){:target="_blank" rel="noopener"}.
