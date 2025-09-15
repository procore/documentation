---
permalink: /marketplace-policy
title: Procore Developer Policy
layout: default
section_title: App Marketplace
---
<style>
  :root {
    /* Adjust these to change spacing between list items */
    --alpha-li-spacing: 0.5rem;  /* lettered lists */
    --roman-li-spacing: 0.25rem; /* roman numeral sub-lists */
  }
  ol.alpha { margin-left: 1.25rem; padding-left: 1.25rem; }
  ol.alpha > li { margin-bottom: var(--alpha-li-spacing); }
  ol.alpha > li:last-child { margin-bottom: 0; }
  ol.roman { margin-left: 1.25rem; padding-left: 1.25rem; }
  ol.roman > li { margin-bottom: var(--roman-li-spacing); }
  ol.roman > li:last-child { margin-bottom: 0; }
</style>

### Effective: September 30, 2025

Welcome to the Procore developer ecosystem! Our goal is to foster a vibrant community where developers can create innovative Applications that connect seamlessly with the Procore Services and enable our Customers to enhance their construction management capabilities. This Developer Policy (“Policy”) outlines the rules and standards aimed at ensuring that any Applications you wish to Commercially Distribute provide a secure, user-friendly, and high-quality experience for all users within the Procore ecosystem. By developing Applications that utilize Procore's APIs you agree to comply with this Procore Developer Policy, as well as the <a href="https://www.procore.com/legal/api-terms-and-conditions" target="_blank">API Terms of Use</a>, which govern the use of our APIs and related services. Please read on to understand how to align your development practices with our expectations and contribute positively to the Procore ecosystem. Terms not defined in this Policy are defined in the API Terms.
<br><br>

***
### 1. Security

At Procore, we take the security of our Customers’ data very seriously, and we expect the highest standards from our developers. Your Applications, operating systems, networks, and web services must be configured to operate securely, and all Data must be stored within your system using strong encryption.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Degrade or compromise security in any way.</li>
  <li>Provide access to the Procore Services or APIs in any fraudulent or unauthorized manner, including bypassing or circumventing Procore protocols, access controls, or policies.</li>
  <li>Disrupt, interfere with, or attempt to gain unauthorized access to services, servers, devices, or networks, that connect to, or which can be accessed via the APIs. </li>
  <li>Take any action that could limit, impair, harm, or damage Procore, the APIs, any of the Procore Services or Procore’s other products or services, including anyone’s use of the APIs, the Procore Services, or software.</li>
  <li>Transmit any viruses or other code that may damage any system or data.</li>
  <li>Attempt to reverse engineer, disassemble, decompile, decode, adapt, or otherwise derive or gain access to any software component of the APIs, in whole or in part.</li>
  <li>Remove any proprietary notices from the APIs.</li>
  <li>Use or attempt to use unpublished APIs.</li>
  <li>Requesting permissions beyond what is strictly necessary for your Application's operation.</li>
  <li>Make any calls to the APIs that are not driven by a request from a Customer or the Application itself, except as part of the reasonable testing of your Application.</li>
  <li>Fail to enforce a form of authentication for your Application and auditing logins to secure your Application with the Procore Services.</li>
  <li>Fail to securely handle any Customer credentials using industry-standard protocols.</li>
  <li>Take or attempt any action that does or could create, in Procore’s sole discretion, an unreasonable privacy or information security risk to Customers or others.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 2. Use of Data

Protecting API Data is paramount at Procore, and it must be for you as well. You are responsible for good API Data stewardship practices, and you have no independent rights to any API Data.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Collect, store, and/or use API Data without obtaining proper, explicit consent from Customers.</li>
  <li>Fail to be transparent about the collection, use, and sharing of API Data, limiting your use of API Data to the practices you disclose.</li>
  <li>Fail to have an industry-standard privacy policy in place that accurately describes the specifics of data usage, that meets applicable legal and consent requirements and is publicly available and easily accessible. The privacy policy must explain how API Data will be collected, processed, and stored, and what control users have over their API Data.</li>
  <li>Sell, rent, exploit, or distribute API Data to external parties without express consent from the Customer, unless to comply with applicable laws, or as part of a merger or acquisition.</li>
  <li>Ask Customers to provide sensitive, private, or confidential personal information, such as payment card numbers, government IDs, or passwords, unless specifically necessary as part of the Application’s legitimate function and purpose.</li>
  <li>Create Applications that encourage or allow Customers to circumvent or interfere with their own data privacy and security policies in a negative way.</li>
  <li>Use API Data to train, re-train, fine-tune, or benchmark any machine learning or artificial intelligence algorithm, model, software, or system.</li>
  <li>Scrape, parse, harvest, build databases, bulk export, or otherwise create copies of any API Data accessed or obtained using the APIs by your Application or otherwise without Procore’s express consent.</li>
  <li>Use API Data collected from one organization to directly benefit a different organization or any third party.</li>
  <li>Combine API Data with data gathered from other sources for any purposes unrelated to the use of the Application.</li>
  <li>Use API Data to contact users outside of Procore, unless Customer permission is gained through a clear and separate process.</li>
  <li>Ignore a Customer’s or individual’s request for deletion of their API Data or content.</li>
  <li>Store Data for longer than is reasonably necessary or legally allowed.</li>
  <li>Fail to erase or update Customer Data if the Customer modifies their data.</li>
  <li>Access API Data for surveillance purposes or allowing any entity to conduct surveillance or obtain API Data using your access to the Procore APIs.</li>
  <li>Otherwise exploit API Data in a way not approved by Procore and not disclosed to and permitted by Customers.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 3. User Experience

Every Application must meet a legitimate business need, respect user privacy, and provide a positive user experience.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Degrade or compromise the performance of the Procore Services.</li>
  <li>Create poor user experiences that do not add value to Customers or that detract from the overall utility of the Procore Services and the overall application ecosystem.</li>
  <li>Use vulgar or obscene language or images. Your Application will not contain or offer content that is violent, extreme, sexually oriented, pornographic, harmful, illegal, indecent, or that a reasonable person would consider inappropriate for the workplace.</li>
  <li>Display inappropriate communications through your Application. Examples include, but are not limited to, hate speech, shaming, and messages that promote harmful or illegal behavior.</li>
  <li>Display language or images that disparage, or in a way that is reasonably likely to allow others to disparage, Procore, its Customers or their users.</li>
  <li>Neglect appropriate Customer assistance and support. In such case, every Application must be complemented with clear instructions on how to contact customer support.</li>
  <li>Fail to keep your Application updated and provide timely and accurate support to Customers.</li>
  <li>Fail to ensure your Application operates and functions in accordance with the documentation you make available to the Customer.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 4. Business Integrity

While using Procore APIs, developers must agree to respect our business and operate in accordance with appropriate and accepted business conduct.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Circumvent Procore’s intended branding or limitations, including, but not limited to, pricing, features, and access structures.</li>
  <li>Use the Procore APIs to create, develop, or build a competitive product or offering, or a product or offering that substantially replicates any features or functionality of the Procore Services or Procore’s other products or services (in whole or in part), except as expressly authorized by Procore in writing.</li>
  <li>Migrate or attempt to migrate Customers of your Application away from any Procore Service, products, or services.</li>
  <li>Make your Application available for use in a manner that circumvents the need for Customers to obtain a valid subscription or license to the Procore Services, products, or services.</li>
  <li>Advertise, including displaying ads, within the Application experience or Procore Services. In addition, Applications will not use API Data or content from Procore in any advertisements, or for purposes of targeting advertisements or contacting users.</li>
  <li>Imply a Procore endorsement, certification, affiliation, or partnership unless you have explicit permission from Procore to do so.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 5. Design

Good design is an important part of product development, and we want all users to enjoy a delightful experience. We support developers in their efforts to build applications that provide meaningful and relevant user experiences.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Infringe any intellectual property rights in your design.</li>
  <li>Violate the <a href="https://brand.procore.com" target="_blank">Procore Brand Guidelines</a> or <a href="https://www.procore.com/legal/trademark" target="_blank">Procore Trademark Use Guidelines</a>.</li>
  <li>If applicable, fail to include a well-designed, high-quality, distinctive icon that does not resemble Procore’s brand elements.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 6. Legal Compliance & Safety

Applications must not create unsafe environments or hardships for Customers. Each Application must comply with all applicable laws and legal requirements in all locations where it is made available.

Developers and their Applications will not, directly or indirectly:

<ol type="a" class="alpha">
  <li>Spam, harass, stalk, intimidate, or threaten Customers or other developers or users.</li>
  <li>Allow impersonation of users or otherwise allow for false representations within the Application.</li>
  <li>Facilitate violations of applicable laws or regulations including, but not limited to:
    <ol type="i" class="roman">
      <li>Illegal activities, such as child pornography, gambling, piracy, violation of copyright, trademark or other intellectual property laws.</li>
      <li>Intending to exploit minors in any way.</li>
      <li>Accessing or authorizing any access to the APIs or Procore Services or other products or services from a country prohibited by the U.S. government and other applicable export control laws and regulations.</li>
      <li>Violating applicable laws or regulations pertaining to privacy, information security, or data protection.</li>
    </ol>
  </li>
  <li>Represent that your Application is authorized by or produced by another company or organization without explicit permission.</li>
  <li>Allow or facilitate financial transactions conducted in an insecure and unapproved manner, or otherwise in violation of applicable laws and regulations.</li>
  <li>Permit use of your Application by children under the age of 16.</li>
</ol>
<div class="details-bottom-spacing"></div>

***
### 7. Data Breach

If API Data is breached, exposed, exploited, or otherwise compromised through your Application or company, you must immediately inform all affected Customers and Procore in accordance with the API Terms. Please contact us at <a href="mailto:security@procore.com">security@procore.com</a> immediately.
<br><br>

***
### 8. Compliance and Consequences of Violations

Developers who wish to Commercially Distribute their Applications are required to comply with this Policy, as well as all other Procore guidelines and policies, including the API Terms. We expect developers to exercise good judgment, build and submit Applications with reasonable work-related purposes, and ensure they are a good fit for Procore Customers. You will also notify us immediately if you materially change the function of or discontinue your Application.

Violations of this Policy may result in your Application being blocked from connecting to the APIs/Procore Services, removal from the Procore App Marketplace, Developer Credential revocation, developer suspension, customer/user notification, legal action, or any other action deemed necessary by Procore. If requested, you will provide us with proof of compliance with this Policy. Procore may periodically audit Applications, and if you fail an audit before notifying us of any issues, penalties may be more severe. We reserve the right to make changes to this Policy with or without notification to you. 

This Policy will evolve as the Procore platform grows and develops. Please check back regularly for updates. We may use your email address or a notice through the APIs to communicate any material changes to this policy.