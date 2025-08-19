---
permalink: /api-activity-export
title: Export API Activity for Your App
sub_header: Learn how to generate a 30-day summary of your app’s API usage to monitor behavior, debug issues, and improve performance.
layout: default
section_title: App Management & Monitoring
---

## Introduction
The **Performance Metrics** tab is now available for all apps in the Procore Developer Portal—covering both **Custom Apps** and **Marketplace Apps**.  

This feature gives you direct access to a **30-day CSV export** of your app’s API activity in the production environment. It’s designed to help you quickly understand how your app is using Procore APIs, so you can troubleshoot issues, optimize performance, and track usage trends.
<br><br>

***
## Why This Matters
Before this update, app performance data was limited and not universally available. Now, you can:

- **Optimize efficiency** – See which endpoints are called most often and reduce unnecessary calls.
- **Troubleshoot issues faster** – Identify failed requests and when they occurred.
- **Validate expected behavior** – Confirm your app is making the right calls at the right time.
- **Track usage trends** – Monitor daily API activity to spot anomalies or spikes.
<br><br>

***
## How It Works
1. **Open the Performance Metrics tab**  
   - In the Developer Portal, navigate to your app and click the **Performance Metrics** tab.
2. **Request your API activity CSV**  
   - Click **Generate CSV Export**.  
   - You’ll receive an email with your CSV file attached.  
3. **Review your API activity**  
   - The CSV includes the last 30 days of your app’s **production** API calls, organized by day.
<br><br>

***
## What’s in the CSV

| Column             | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Date               | The date of activity                                                  |
| Response Code    | Indicates whether the call was successful or failed                         |
| HTTP Method        | The HTTP method used (GET, POST, PUT, DELETE, etc.)                         |
| Normalized Route   | The standardized API route (e.g., `/v1.0/projects/:project_id/observations`)|
| Count              | The total number of calls for that route, method, and status on that day    |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Tips for Using This Data
- **Spot errors quickly** – Filter by failed calls to identify problem endpoints.  
- **Improve performance** – Reduce unnecessary calls to high-traffic endpoints.  
- **Monitor adoption** – See if your most important features are being used.  
- **Detect unusual patterns** – Look for spikes or drops in usage that may indicate issues.

By regularly reviewing your app’s API activity, you can maintain reliability, improve user experience, and ensure efficient API usage.