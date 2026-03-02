/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { useContext } from 'react';

import {
    registerContentFragmentSelectorAuthService as registerContentFragmentSelectorAuthServiceInternal,
    ContentFragmentSelectorWithAuthFlow,
} from '@aem-sites/content-fragment-selector';
import type { ContentFragmentSelectorProps } from '@aem-sites/content-fragment-selector';
import { EnvironmentContext } from './EnvironmentProvider';

interface ImsAuthProps {
    [key: string]: unknown;
}

export const registerContentFragmentSelectorAuthService = (
    imsAuthProps: ImsAuthProps,
    changeEnvironment = false
) => {
    if (imsAuthProps) {
        return registerContentFragmentSelectorAuthServiceInternal(imsAuthProps, changeEnvironment);
    }
};

export const ContentFragmentSelectorWrapper = (props: Partial<ContentFragmentSelectorProps>) => {
    const { imsAuthInfo } = useContext(EnvironmentContext);

    const contentFragmentSelectorProps: Partial<ContentFragmentSelectorProps> = {
        ...props,
        env: imsAuthInfo.env,
        orgId: imsAuthInfo.imsOrg,
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ContentFragmentSelectorWithAuthFlow {...contentFragmentSelectorProps} />
        </div>
    );
};
