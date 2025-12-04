
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
import { withPropsReceiver } from "@assets/microfrontend";
import withEverything from "../../utils/withProviders";
import { ContentFragmentSelectorProps, FragmentSelector } from "@aem-sites/content-fragment-selector";

/**
 * @class
 */
export class ContentFragmentSelectorWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.selectorInstance = React.createRef(); // Create a ref for the FragmentSelector
    }

    reload() {
        if (this.selectorInstance.current) {
            this.selectorInstance.current.reload(); // Call the reload method on the FragmentSelector instance
        }
    };

    render() {
        return (
            <div data-testid="FragmentSelector">
                <FragmentSelector
                  ref={this.selectorInstance}
                  imsToken={ this.props.imsToken }
                  repoId={ this.props.repoId }
                  {...(this.props.defaultRepoId && {
                      defaultRepoId: this.props?.defaultRepoId,
                  })}
                  orgId={this.props.orgId}
                  locale={this.props.locale ?? "en-US"}
                  env={this.props.env}
                  filters={
                    this.props.filters ?? {}
                  }
                  isOpen={this.props.isOpen}
                  noWrap={this.props.noWrap}
                  theme={this.props?.theme ?? "light"}
                  selectionType={this.props.selectionType ?? "multiple"}
                  {...(this.props.dialogSize && {
                      dialogSize: this.props.dialogSize,
                  })}
                  runningInUnifiedShell={this.props.runningInUnifiedShell ?? true}
                  readonlyFilters={
                    this.props.readonlyFilters ?? []
                  }
                  selectedFragments={this.props.selectedFragments ?? []}
                  hipaaEnabled={this.props?.hipaaEnabled ?? false}
                  inventoryView={this.props.inventoryView}
                  inventoryViewToggleEnabled={
                    this.props.inventoryViewToggleEnabled ?? false
                  }
                  onDismiss={this.props.onDismiss}
                  onSubmit={(data) => console.log("On Submit payload:", data)}
                  onSelectionChange={(data) => {
                      console.log("On selection change payload:", data);
                  }}
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
