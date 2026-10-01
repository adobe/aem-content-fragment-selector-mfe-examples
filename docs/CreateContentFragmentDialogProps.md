# CreateContentFragmentDialog Props

Props for the `CreateContentFragmentDialog` component from [`@aem-sites/content-fragment-creator`](https://www.npmjs.com/package/@aem-sites/content-fragment-creator).

## Accepted props

| Property             | Type                                                        | Required | Default | Description                                                                                                                 |
| -------------------- | ------------------------------------------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `open`                | boolean                                                       | Yes      |         | Controls whether the dialog is visible.                                                                                       |
| `onDismiss`           | () => void                                                   | Yes      |         | Callback when the dialog is dismissed (cancel or close).                                                                      |
| `env`                 | `Env` ("QA" \| "DEV" \| "DEV_443" \| "STAGE" \| "PROD")       | No       |         | Deployment environment for the embedded dialog. If not provided, it is inferred from the current page's hostname.             |
| `imsToken`            | string                                                        | No       |         | IMS token for authentication. When provided together with `repoId`, the dialog renders without needing repository discovery. |
| `repoId`              | string                                                        | No       |         | Repository ID (AEM host). When provided together with `imsToken`, the dialog uses this repo and skips discovery.              |
| `orgId`               | string                                                        | No       |         | Organization ID used for repository discovery.                                                                                |
| `locale`              | string                                                        | No       |         | Locale (e.g. `"en-US"`).                                                                                                       |
| `selectedFolder`      | string                                                        | No       |         | Pre-selected folder path for the new fragment (e.g. the current folder in an inventory view).                                 |
| `meta`                | Record<string, unknown>                                       | No       |         | Optional metadata passed to the create operation (e.g. `useHeadlessEditor`, resource type).                                   |
| `allowedModels`       | string[]                                                      | No       |         | Optional list of allowed content fragment model paths/IDs. When provided, only these models can be selected when creating a fragment. |
| `allowedModelsTags`   | string[]                                                      | No       |         | Optional list of allowed content fragment model tags, used to filter the models offered in the dialog.                        |
| `onCreate`            | (contentFragment: `ContentFragment`) => void                  | No       |         | Callback invoked when a content fragment is successfully created. Receives the created fragment (see below).                  |
| `theme` | `"light"` \| `"dark"` | No | Unified Shell theme | Color theme of the dialog. |
| `noWrap` | boolean | No | `false` | When `true`, renders only the form fields (no heading, no action buttons) and drops the full-viewport overlay, so the host can wrap the dialog in its own modal and own the buttons. The host drives the dialog through the [ref handle](#ref-handle-nowrap-mode) and `onStateChange`. See the [host-owned dialog example](../README.md#example---host-owned-dialog-nowrap). |
| `onStateChange` | (state: { step, isValid, isPending, isPathValid }) => void | No | | `noWrap` only. Fired whenever the active step or its actionability changes, so the host can render and enable its own buttons (see below). |

### `ContentFragment` shape (passed to `onCreate`)

```typescript
type ContentFragment = {
    id: string;
    path: string;
    title: string;
    [key: string]: unknown;
};
```

### State passed to `onStateChange` (`noWrap` mode)

```typescript
{
    /** Which step is showing: the create form or the destination folder picker. */
    step: 'form' | 'pickPath';
    /** `form` step: the form is valid and can be submitted. */
    isValid: boolean;
    /** `form` step: a create operation is in progress. */
    isPending: boolean;
    /** `pickPath` step: a valid destination folder is selected. */
    isPathValid: boolean;
}
```

Fields for the inactive step are reported as their neutral value (`false`).

## Ref handle (`noWrap` mode)

`CreateContentFragmentDialog` forwards a ref of type `CreateContentFragmentDialogRef` so a host that renders its own buttons can drive the dialog.

| Method                       | Step       | Description                                                                                                       |
| ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `submit(redirect?: boolean)` | `form`     | Creates the fragment. Pass `true` to also open the new fragment in the editor in a new tab ("Create and open"). |
| `confirmDestination()`       | `pickPath` | Commits the selected folder and returns to the form.                                                              |
| `cancelDestination()`        | `pickPath` | Discards the selection and returns to the form.                                                                   |

In `noWrap` mode the embed sizes itself to the form's content height, so the host dialog can size to content and scroll at its maximum height. While the form is loading, the embed keeps a minimum height of `NOWRAP_MIN_HEIGHT_PX` (320px, exported from the package).

## Related

- [Content Fragment Creator example](../examples/react#content-fragment-creator)
- [`@aem-sites/content-fragment-creator` on npm](https://www.npmjs.com/package/@aem-sites/content-fragment-creator)
