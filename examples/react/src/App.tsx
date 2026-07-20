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

import { Provider, defaultTheme, Flex, Heading, Divider } from '@adobe/react-spectrum';
import { Provider as ProviderS2 } from '@react-spectrum/s2';

import EnvironmentProvider from './EnvironmentProvider';
import SelectorView from './Selector';
import CreatorView from './Creator';

function App() {
    return (
        <Provider theme={defaultTheme} colorScheme="light" height="100%">
            <ProviderS2 colorScheme="light">
                <EnvironmentProvider>
                    <Flex direction="column" gap="size-200">
                        <Heading level={2} marginStart="size-400">
                            @aem-sites/content-fragment-selector
                        </Heading>
                        <SelectorView colorScheme="light" />
                        <Divider size="M" />
                        <Heading level={2} marginStart="size-400">
                            @aem-sites/content-fragment-creator
                        </Heading>
                        <CreatorView />
                    </Flex>
                </EnvironmentProvider>
            </ProviderS2>
        </Provider>
    );
}

export default App;
