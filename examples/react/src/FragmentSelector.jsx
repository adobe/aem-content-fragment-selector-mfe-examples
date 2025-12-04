
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { FC } from "react";
import { FragmentSelector as FragmentSelectorPure } from "@aem-sites/fragment-selector";
import {
    FragmentFilter,
    ContentFragment,
    ResourceReadonlyFiltersField,
} from "@aem-sites/headless-sdk";
import { type UnifiedShellConfiguration } from "@aem-sites/commons-shell";
import { type Env } from "@aem-sites/content-fragment-selector";
import { mappedEnvs } from "../../utils/mappedEnvs";

// used only for testing localization
/* adobe-intl messages: testMessages */
export const testMessages = {
    header: {
        messageId: "test.messages",
        defaultMessage: "Test messages",
        description: "Test messages",
    },
};

type OnSubmitType = {
    contentFragments: { id: string; path: string }[];
    domainNames: string[];
    tenantInfo?: string;
};

type Props = {
    isOpen: boolean;
    onDismiss?: Function;
    onSubmit?: ({ contentFragments, domainNames }: OnSubmitType) => void;
    filters?: Partial<FragmentFilter>;
    maxItems?: number;
    imsToken?: string;
    imsOrg?: string;
    tenant?: string;
    locale?: string;
    repositories?: { label: string; value: string }[];
    repo?: string;
    env?: Env;
    theme?: string;
    dialogSize?: "fullscreen" | "fullscreenTakeover";
    readonlyFilters?: ResourceReadonlyFiltersField[];
};

const processContentFragmentSelection = (cfs: ContentFragment[]) => {
    return cfs.map((cf) => ({
        id: cf.fragmentId,
        path: cf.id,
        locale: cf.locale,
    }));
};

const FragmentSelector: FC<Props> = ({
    isOpen,
    onDismiss,
    onSubmit,
    filters = { folder: "/content/dam" },
    maxItems,
    imsToken,
    imsOrg,
    tenant,
    locale,
    repositories,
    repo,
    env,
    dialogSize,
    theme,
    readonlyFilters,
}) => {
    const unifiedShellEnv = mappedEnvs[env] || "qa";
    const userData: UnifiedShellConfiguration = {
        imsOrg: imsOrg,
        imsToken: imsToken,
        tenant,
        apiKey: "exc_app",
        locale: locale,
        basePath: "", // default value for basePath
        imsProfile: {} as any, // default value for imsProfile
        environment: unifiedShellEnv,
        theme,
    };

    const handleOnSubmit = (data: any) => {
        if (!data || data?.contentFragments.length === 0) {
            return null;
        }

        onSubmit({
            contentFragments: processContentFragmentSelection(
                data?.contentFragments
            ),
            domainNames: data?.domainNames,
            tenantInfo: data?.tenantInfo,
        });
    };

    return (
        <FragmentSelectorPure
            open={isOpen}
            onDismiss={() => onDismiss()}
            filters={filters}
            onSubmit={handleOnSubmit}
            shell={userData as any}
            features={
                !maxItems || maxItems > 0
                    ? {
                          TABLE_SELECTION_MODE: {
                              enabled: true,
                              meta: "multiple",
                          },
                      }
                    : {}
            }
            repositories={repositories}
            repo={repo}
            isUsedByFragmentSelectorMFE={true}
            dialogSize={dialogSize}
            readonlyFilters={readonlyFilters}
            {...(maxItems && maxItems > 0 ? { maxItems } : {})}
        />
    );
};

export default FragmentSelector;
