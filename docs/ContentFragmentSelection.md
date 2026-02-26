# ContentFragmentSelection Type

## Overview

The `ContentFragmentSelection` type represents the structure of content fragments returned by the Content Fragment Selector when a user selects fragments.

## Type Definitions

### ContentFragmentSelection

```typescript
type ContentFragmentSelection = {
    id: string;
    path: string;
    title: string;
    model: ContentFragmentModel;
    variations: string[];
    status: string;
    publishedBy: string;
    publishedByFullName: string;
    publishedDate: number | undefined;
    modifiedBy: string;
    modifiedByFullName: string;
    modifiedDate: number;
    createdBy: string;
    createdByFullName: string;
    createdDate: number;
}[];
```

### ContentFragmentModel

```typescript
type ContentFragmentModel = {
    name: string;
    id: string;
    path?: string;
    tagIds?: string[];
};
```

## Properties

### ContentFragmentSelection Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the content fragment |
| `path` | string | Yes | Full path to the fragment in the DAM (e.g., `/content/dam/my-project/article-fragment`) |
| `title` | string | Yes | Display title of the content fragment |
| `model` | ContentFragmentModel | Yes | Complete Content Fragment Model information |
| `variations` | string[] | Yes | Array of variation names available for this fragment (e.g., `["master", "mobile", "tablet"]`) |
| `status` | string | Yes | Publication status of the fragment (e.g., "PUBLISHED", "MODIFIED", "DRAFT", "NEW", "UNPUBLISHED") |
| `publishedBy` | string | Yes | Email/username of the user who published the fragment |
| `publishedByFullName` | string | Yes | Full name of the user who published the fragment |
| `publishedDate` | number \| undefined | Yes | Timestamp (in milliseconds) when the fragment was published, or undefined if never published |
| `modifiedBy` | string | Yes | Email/username of the user who last modified the fragment |
| `modifiedByFullName` | string | Yes | Full name of the user who last modified the fragment |
| `modifiedDate` | number | Yes | Timestamp (in milliseconds) when the fragment was last modified |
| `createdBy` | string | Yes | Email/username of the user who created the fragment |
| `createdByFullName` | string | Yes | Full name of the user who created the fragment |
| `createdDate` | number | Yes | Timestamp (in milliseconds) when the fragment was created |

### ContentFragmentModel Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `name` | string   | Yes | Display name of the Content Fragment Model |
| `id` | string   | Yes | Unique identifier for the model |
| `path` | string   | No | Full path to the model definition (e.g., `/conf/my-project/settings/dam/cfm/models/article`) |
| `tagIds` | string[] | No | Array of tag IDs associated with the model |

## Example Usage

### Basic Example

```javascript
PureJSContentFragmentSelectors.renderContentFragmentSelectorWithAuthFlow(
    container,
    {
        orgId: "YOUR_ORG_ID@AdobeOrg",
        onSubmit: ({ contentFragments, domainName, repoId }) => {
            // contentFragments is of type ContentFragmentSelection
            contentFragments.forEach(fragment => {
                console.log('Fragment ID:', fragment.id);
                console.log('Fragment Path:', fragment.path);
                console.log('Fragment Title:', fragment.title);
                console.log('Model Name:', fragment.model?.name);
                console.log('Model Path:', fragment.model?.path);
                console.log('Variations:', fragment.variations);
                console.log('Status:', fragment.status);
                console.log('Published By:', fragment.publishedBy);
                console.log('Published By Full Name:', fragment.publishedByFullName);
                console.log('Published Date:', new Date(fragment.publishedDate));
                console.log('Modified By:', fragment.modifiedBy);
                console.log('Modified By Full Name:', fragment.modifiedByFullName);
                console.log('Modified Date:', new Date(fragment.modifiedDate));
                console.log('Created By:', fragment.createdBy);
                console.log('Created By Full Name:', fragment.createdByFullName);
                console.log('Created Date:', new Date(fragment.createdDate));
            });
        }
    }
);
```

### Complete Example Response

```javascript
{
    contentFragments: [
        {
            id: "fragment-uuid-123",
            path: "/content/dam/my-project/article-fragment",
            title: "My Article Fragment",
            model: {
                name: "Article",
                id: "model-id-456",
                path: "/conf/my-project/settings/dam/cfm/models/article",
                tagIds: ["tag:product", "tag:news"]
            },
            variations: ["master", "mobile", "tablet"],
            status: "PUBLISHED",
            publishedBy: "publisher@adobe.com",
            publishedByFullName: "Jane Publisher",
            publishedDate: 1765728541321,
            modifiedBy: "editor@adobe.com",
            modifiedByFullName: "Jane Editor",
            modifiedDate: 1765728541320,
            createdBy: "author@adobe.com",
            createdByFullName: "John Author",
            createdDate: 1754035541525
        },
        {
            id: "fragment-uuid-789",
            path: "/content/dam/my-project/blog-post",
            title: "Sample Blog Post",
            model: {
                name: "Blog Post",
                id: "model-id-789",
                path: "/conf/my-project/settings/dam/cfm/models/blog-post",
                tagIds: ["tag:blog"]
            },
            variations: ["master"],
            status: "MODIFIED",
            publishedBy: "user@adobe.com",
            publishedByFullName: "John Doe",
            publishedDate: 1765728541321,
            modifiedBy: "admin@adobe.com",
            modifiedByFullName: "Admin User",
            modifiedDate: 1765728541322,
            createdBy: "admin@adobe.com",
            createdByFullName: "Admin User",
            createdDate: 1754035541525
        }
    ],
    domainName: "author-p12345-e67890.adobeaemcloud.com",
    repoId: "repository-id",
    tenantInfo: "tenant-info"
}
```

## TypeScript Integration

If you're using TypeScript, you can import the type from the package:

```typescript
import type { 
    ContentFragmentSelection, 
    ContentFragmentModel 
} from '@aem-sites/content-fragment-selector';

const handleSubmit = (data: { 
    contentFragments: ContentFragmentSelection 
}) => {
    data.contentFragments.forEach(fragment => {
        const title: string = fragment.title;
        const modelName: string = fragment.model.name;
    });
};
```
