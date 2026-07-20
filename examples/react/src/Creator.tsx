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

import React, { useContext, useState } from 'react';
import { View, Flex, Text, ActionButton } from '@adobe/react-spectrum';
import { ContentFragmentCreatorWrapper } from './ContentFragmentCreatorWrapper';
import { EnvironmentContext } from './EnvironmentProvider';

interface ContentFragment {
    id: string;
    path: string;
    title: string;
    [key: string]: unknown;
}

// Replace with the repository you want to create fragments in.
const REPO_ID = 'author-p12345-e67890.adobeaemcloud.com';

export default function CreatorView() {
    const { imsAuthInfo } = useContext(EnvironmentContext);
    const [isOpen, setIsOpen] = useState(false);
    const [imsToken, setImsToken] = useState<string | undefined>(undefined);
    const [createdFragment, setCreatedFragment] = useState<ContentFragment | null>(null);

    const openDialog = async () => {
        const authService = imsAuthInfo.imsAuthService;

        // CreateContentFragmentDialog does not include a built-in sign-in flow
        // (unlike ContentFragmentSelectorWithAuthFlow), so sign in and fetch a
        // token from the already-registered ImsAuthService before opening it.
        if (!authService?.isSignedInUser()) {
            await authService?.signIn();
        }

        setImsToken(authService?.getImsToken());
        setIsOpen(true);
    };

    const handleCreate = (contentFragment: ContentFragment) => {
        console.log('Created content fragment:', contentFragment);
        setCreatedFragment(contentFragment);
        setIsOpen(false);
    };

    return (
        <View padding="size-400">
            <Flex direction="column" gap="size-200">
                <Flex direction="row" gap="size-200">
                    <ActionButton onPress={openDialog}>Create Content Fragment</ActionButton>
                </Flex>

                <ContentFragmentCreatorWrapper
                    open={isOpen}
                    imsToken={imsToken}
                    repoId={REPO_ID}
                    locale="en-US"
                    selectedFolder="/content/dam/my-project"
                    onDismiss={() => setIsOpen(false)}
                    onCreate={handleCreate}
                />

                {createdFragment && (
                    <View
                        borderWidth="thin"
                        borderColor="dark"
                        borderRadius="medium"
                        padding="size-200"
                    >
                        <Text>
                            <strong>Created Fragment:</strong>
                        </Text>
                        <View paddingStart="size-200" paddingTop="size-100">
                            <Text>
                                {createdFragment.title} — {createdFragment.path}
                            </Text>
                        </View>
                    </View>
                )}
            </Flex>
        </View>
    );
}
