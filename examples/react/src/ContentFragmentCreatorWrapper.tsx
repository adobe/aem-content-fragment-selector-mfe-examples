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

import { CreateContentFragmentDialog } from '@aem-sites/content-fragment-creator';
import type { CreateContentFragmentDialogProps } from '@aem-sites/content-fragment-creator';
import { EnvironmentContext } from './EnvironmentProvider';

// Unlike ContentFragmentSelectorWithAuthFlow, CreateContentFragmentDialog has no built-in
// auth flow — it expects a valid imsToken to already be available. Use the ImsAuthService
// registered by EnvironmentProvider to sign the user in and obtain one before opening it.
export const ContentFragmentCreatorWrapper = (props: Partial<CreateContentFragmentDialogProps>) => {
    const { imsAuthInfo } = useContext(EnvironmentContext);

    const createContentFragmentDialogProps: Partial<CreateContentFragmentDialogProps> = {
        ...props,
        env: imsAuthInfo.env.toUpperCase() as CreateContentFragmentDialogProps['env'],
        orgId: imsAuthInfo.imsOrg,
    };

    return (
        <CreateContentFragmentDialog
            {...(createContentFragmentDialogProps as CreateContentFragmentDialogProps)}
        />
    );
};
