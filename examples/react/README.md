## README

This example showcases how to integrate the Content Fragment Selector and the Content Fragment Creator in a React app.

### Launching the React Example

:warning: This repository is intended to serve as a supplemental documentation describing the available APIs and usage examples for integrating the Content Fragment Selector. Before attempting to install or use the Content Fragment Selector, ensure that your organization has been provisioned to access the Content Fragment Selector as part of the AEM as a Headless CMS Cloud Service (CS) profile. If you have not been provisioned, you will not be able to successfully integrate or use these components. To request provisioning, your program admin should raise a support ticket marked as P2 from Admin Console and include the following information:

- Program ID and Environment ID for the AEM CS instance
- Domain names where the integrating application is hosted

After provisioning, your organization will be provided with an `imsClientId`, `imsScope`, and a `redirectUrl` corresponding to the environment that you request —which are essential for the configuration of Content Fragment Selector to work end-to-end. Without those valid properties, you will not be able to run this example

---

The React example app can be launched using the following steps:

1. Make sure you have `npm` or `yarn` installed on your system.
2. Install the dependencies

   ``` bash
   yarn install
    # OR
   npm install
   ```

3. Start the app:

   ``` bash
   yarn dev --host localhost
    # OR
   npm run dev --host localhost
   ```

   This will start a local HTTP server on port 8080.
4. Open a web browser and navigate to `http://localhost:8080` to view the app.

### Using the Web App

The app renders two independent demos, one per package.

#### Content Fragment Selector

1. Once the app is launched, click on the "Show Selector" button to launch the ContentFragmentSelector dialog with auth flow.
2. If the user is signed in, the ContentFragmentSelector dialog will be rendered.
3. If the user is not signed in, the app will open a popup/full page reload to prompt the user to sign in before accessing the ContentFragmentSelector dialog.
   - Note: By default, if the user is not signed in, we show a popup for the user to login. However, the popup must be enabled for this to work. Alternatively, you can check if the user's browser popup is disabled and instead trigger the full page reload to sign in. You can control that flow by passing the prop `modalMode: false` to `registerContentFragmentSelectorAuthService`.
4. You can now select the desired content fragments, and the app will output data related to your selection.

#### Content Fragment Creator

1. Click on the "Create Content Fragment" button to launch the `CreateContentFragmentDialog`.
2. Unlike the Selector, the Creator dialog has no built-in sign-in flow — see [`Creator.tsx`](./src/Creator.tsx). Before opening the dialog, the app reuses the `ImsAuthService` registered for the Selector demo (see [`EnvironmentProvider.tsx`](./src/EnvironmentProvider.tsx)) to sign the user in and obtain an `imsToken`.
3. Update the placeholder `REPO_ID` in [`Creator.tsx`](./src/Creator.tsx) to point at a repository you have access to.
4. Fill in the dialog and confirm — the created fragment's `id`, `path`, and `title` are logged to the console and displayed in the app.

See the [`@aem-sites/content-fragment-creator` section of the root README](../../README.md#content-fragment-creator) and the [CreateContentFragmentDialog Props documentation](../../docs/CreateContentFragmentDialogProps.md) for the full API reference.