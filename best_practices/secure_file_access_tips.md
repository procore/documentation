---
permalink: /secure-file-access-tips
title: Working with Secure File Access
layout: default
section_title: Best Practices

---

## Overview

Below are a some valuable tips for working with secure file access and the Procore API.

## Handling URL Schema Changes

As indicated in the ["File Link URL Schema Change"]({{ site.url }}{{ site.baseurl }}{% link overview/announcements.md %}#file-link-url-schema-change) announcement posted 06/28/2023, developers should not assume any particular hostnames for download links because they can change in future, both due to Procore backend changes as well as changes from our cloud service partner, Amazon Web Services.

## Passing the Bearer Token for File Downloads

As described in the ["Bearer Token to be Required for File Access Authorization"]({{ site.url }}{{ site.baseurl }}{% link overview/announcements.md %}#bearer-token-to-be-required-for-file-access-authorization) announcement posted 06/10/2022, we require developers to include the Procore Bearer Token for accessing any file or document URL.
One important detail is that files are not necessarily served directly by those URLs.
For example, clients currently get redirected to our cloud service partner, Amazon Web Services, to actually fetch file content.
It is therefore important to only include Procore Bearer Tokens in requests to Procore domains (*.procore.com) and not to include them in requests going elsewhere (also due to automatic redirection).
Different HTTP clients behave differently with respect to re-attaching “Authorization” HTTP header in case of redirects.
You should check the documentation for your particular client.
For convenience, we include below an explicit implementation using the standard `java.net.http.HttpClient`.

### Example Implementation

The following example implementation is based on `java.net.http.HttpClient` from Java 17.0.2.

Downloading occurs in the `downloadFile` method that accepts:

1. `fileUrl` is a link for file download.
You can obtain it from a Procore API response.
For example, the response for `GET /rest/v1.0/folders` contains this url under `files[].file_versions[].url` (Note: most of the fields are omitted in the example below):

    ```
    {
        "id": 1,
        "files": [
          {
            "id": 12,
            "name": "file.pdf",
            "file_versions": [
              {
                "id": 12,
                "notes": "These are notes about the current file version.",
                "url": "www.file.com",
              }
            ]
          }
        ]
    }
    ```

2. `bearerTokenValue` is a valid Procore [OAuth 2.0 Access Token]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_access_tokens.md %}).

### Complete Listing

```
package com.procore.file_access_demo;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.Set;

public class DownloaderApp {
    // Can be taken from response body of
    // https://developers.procore.com/reference/rest/v1/project-folders-and-files?version=1.0#list-project-folders-and-files
    private static final String FILE_URL = "";
    private static final String BEARER_TOKEN_VALUE = "";

    public static void main(String[] args) throws Exception {
        downloadFile(FILE_URL, BEARER_TOKEN_VALUE);
    }

    private static void downloadFile(String fileUrl, String bearerTokenValue) throws URISyntaxException, IOException, InterruptedException {
        // Create an HttpClient that doesn't follow redirects
        // to make sure we don't send Bearer token to non-Procore domains
        HttpClient client = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.NEVER)
                .build();

        // Perform the initial request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(fileUrl))
                .header("Authorization", "Bearer %s".formatted(bearerTokenValue))
                .build();
        HttpResponse<InputStream> response = client.send(request, HttpResponse.BodyHandlers.ofInputStream());

        // Loop through redirects preventing infinite loops
        int maxRedirects = 5;
        int redirectCount = 0;
        while (Set.of(301, 302, 303, 307, 308).contains(response.statusCode())
                && (redirectCount++ < maxRedirects)) {
            Optional<String> location = response.headers().firstValue("Location");
            if (location.isEmpty()) {
                throw new RuntimeException("Redirect response did not contain Location header");
            } else {
                URI redirectLocation = new URI(location.get());

                HttpRequest.Builder redirectRequestBuilder = HttpRequest.newBuilder()
                        .uri(redirectLocation);

                // Only include Bearer token for Procore domains
                String procoreDomain = ".procore.com";
                if (redirectLocation.getHost().endsWith(procoreDomain)) {
                    redirectRequestBuilder.header("Authorization", "Bearer %s".formatted(bearerTokenValue));
                }

                // Follow the redirect
                response = client.send(redirectRequestBuilder.build(), HttpResponse.BodyHandlers.ofInputStream());
            }
        }

        if (response.statusCode() == 200) {
            // Save the file to disk
            Files.copy(response.body(), Path.of("/tmp/file.bin"), StandardCopyOption.REPLACE_EXISTING);
        }
    }
}

```

## Testing Your Integration

We are currently working on enabling this new functionality in Monthly and Developer Sandboxes where you will be able to test your integrations.
