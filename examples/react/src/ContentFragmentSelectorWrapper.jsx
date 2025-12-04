
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

import React from "react";
import FragmentSelector from "./FragmentSelector";
import { withPropsReceiver } from "@assets/microfrontend";
import withEverything from "../../utils/withProviders";
import { initializeModuleRuntime } from "../../utils/moduleRuntime";
import { ContentFragmentSelectorProps } from "@aem-sites/content-fragment-selector";

/**
 * @class
 */
export class ContentFragmentSelectorWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    initializeModuleRuntime = async () => {
        if (this.props.runningInUnifiedShell) {
            // todo fix
            await initializeModuleRuntime();
        }
        this.setState({ loading: false });
    };

    componentDidMount() {
        this.initializeModuleRuntime();
    }

    render() {
        if (this.state.loading) return null;
        return (
            <div data-testid="FragmentSelector">
                <FragmentSelector
                    imsToken={this.props.imsToken}
                    imsOrg={this.props.orgId}
                    locale={this.props.locale}
                    repo={this.props.repoId}
                    filters={this.props.filters}
                    isOpen={this.props.isOpen}
                    onDismiss={this.props.onDismiss}
                    onSubmit={this.props.onSubmit}
                    env={this.props.env}
                    maxItems={
                        this.props.selectionType === "single" ? 1 : undefined
                    }
                    dialogSize={this.props.dialogSize}
                    theme={this.props.theme}
                    readonlyFilters={this.props.readonlyFilters}
                />
            </div>
        );
    }
}

export const ContentFragmentSelector =
    withEverything<ContentFragmentSelectorProps>(
        ContentFragmentSelectorWrapper
    );
export default withPropsReceiver(
    ContentFragmentSelector,
    `@aem-sites/content-fragment-selector/ContentFragmentSelector`,
    () => null,
    true
);
