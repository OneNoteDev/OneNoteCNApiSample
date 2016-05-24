OneNote Class Notebook APIs Sample
===================================

The OneNote Class Notebook APIs let you programmatically create and edit class notebooks. This sample 
demonstrates the basics on how you would call these APIs using JavaScript, jQuery and ADAL for authentication.
To learn more about ADAL you can visit its 
[GitHub page](https://github.com/AzureAD/azure-activedirectory-library-for-js). For full documentation on 
the class notebook APIs take a look at our 
[article on MSDN](https://msdn.microsoft.com/office/office365/howto/onenote-classnotebook).

Please keep in mind that this sample is meant to illustrate how you would reach our APIs in JavaScript
and does not necessarily contain all the code you would want for a production-ready application. In a 
more complete web app you would probably use a framework like AngularJS, add more specific error handling,
 etc.

If you would like to see a live version of this app we have an instance running on Azure that 
you can access [here](http://onenoteedusample.azurewebsites.net/).

## How To Run This Sample

### Step 1. You will need the following
- An Azure subscription
- An Office 365 subscription

The Azure subscription should be associated with the Office 365 subscription. 
[Authenticate using Azure AD (enterprise apps)](https://msdn.microsoft.com/office/office365/howto/onenote-auth#aad-auth)
has details on how to do just that.

### Step 2. Register your app in Azure and add permissions
Again, follow the instructions under 
[Authenticate using Azure AD (enterprise apps)](https://msdn.microsoft.com/office/office365/howto/onenote-auth#aad-auth)
to register your application in Azure. You will also need to give your app Notes.ReadWrite permissions.

Since this web app uses OAuth 2's implicit grant flow, you should 
enable it in your app's manifest in Azure. 
[This article](https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios/#single-page-application-spa)
has details on the implicit grant flow and how to enable in Azure. In particular, you'll want to download
your app's manifest in the Azure Management Portal, set the "oauth2AllowImplicitFlow" field to true, and 
upload the manifest to the portal.

### Step 3. Fill in your clientId in app.js
You will need to specify the clientId for your app in app.js. You can get the clientId in the Azure Management
Portal. 

### Step 4. Run your application
If you are using Visual Studio, build and run your application. To test your application locally you will
also need to add the local URL as a reply URL in your app's page in the Azure Management Portal. The sample is
set to run at localhost:55407.