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

import React, { useState } from 'react';
import { View, Flex, Text, ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import { ContentFragmentSelectorWrapper } from './ContentFragmentSelectorWrapper';

interface SelectorViewProps {
    colorScheme?: string;
}

interface ContentFragmentSelection {
    id: string;
    path: string;
    title: string;
}

interface SelectionPayload {
    contentFragments: ContentFragmentSelection[];
    domainName?: string;
    tenantInfo?: string;
    repoId?: string;
}

export default function SelectorView({ colorScheme }: SelectorViewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFragments, setSelectedFragments] = useState<ContentFragmentSelection[]>([]);

    const handleSelection = (data: SelectionPayload) => {
        console.log('Selected fragments:', data);
        setSelectedFragments(data.contentFragments);
        setIsOpen(false);
    };

    return (
        <View padding="size-400">
            <Flex direction="column" gap="size-200">
                <Flex direction="row" gap="size-200">
                    <DialogTrigger type="fullscreen">
                        <ActionButton onPress={() => setIsOpen(true)}>Show Selector</ActionButton>
                        <ContentFragmentSelectorWrapper
                            isOpen={isOpen}
                            noWrap={false}
                            theme={colorScheme as 'light' | 'dark'}
                            selectionType="multiple"
                            dialogSize="fullscreen"
                            onDismiss={() => setIsOpen(false)}
                            onSubmit={handleSelection}
                            onSelectionChange={(data: SelectionPayload) => {
                                console.log('Selection changed:', data);
                            }}
                        />
                    </DialogTrigger>
                </Flex>

                {selectedFragments.length > 0 && (
                    <View
                        borderWidth="thin"
                        borderColor="dark"
                        borderRadius="medium"
                        padding="size-200"
                    >
                        <Text>
                            <strong>Selected Fragments:</strong>
                        </Text>
                        {selectedFragments.map((fragment) => (
                            <View key={fragment.id} paddingStart="size-200" paddingTop="size-100">
                                <Text>
                                    {fragment.title} — {fragment.path}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </Flex>
        </View>
    );
}
