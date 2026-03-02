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

import React, { useEffect, useState, ReactNode } from 'react';

import { registerContentFragmentSelectorAuthService } from './ContentFragmentSelectorWrapper';

interface ImsAuthInfo {
    [key: string]: unknown;
    env: string;
    imsClientId: string;
    imsScope: string;
    redirectUrl: string;
    imsOrg: string;
    imsAuthService?: ImsAuthService;
}

interface ImsAuthService {
    signOut: () => void;
}

interface EnvironmentContextValue {
    environment: string;
    setEnvironment: React.Dispatch<React.SetStateAction<string>>;
    imsAuthInfo: ImsAuthInfo;
    setImsAuthInfo: React.Dispatch<React.SetStateAction<ImsAuthInfo>>;
    cancelImsAuthChange: () => void;
    applyImsAuthChange: (props: Partial<ImsAuthInfo>) => void;
    signOut: () => void;
}

declare global {
    interface Window {
        contentFragmentSelectorAuthService?: ImsAuthService;
    }
}

export const EnvironmentContext = React.createContext<EnvironmentContextValue>(
    {} as EnvironmentContextValue
);

const stageImsClientId = '<IMS_CLIENT_ID>';
const stageImsOrg = 'YOUR_STAGE_ORG_ID@AdobeOrg';

const prodImsClientId = '<IMS_CLIENT_ID>';
const prodImsOrg = 'YOUR_PROD_ORG_ID@AdobeOrg';

const initImsAuthInfo: ImsAuthInfo = {
    env: 'prod',
    imsClientId: prodImsClientId,
    imsScope: 'AdobeID,openid,read_organizations,additional_info.projectedProductContext',
    redirectUrl: window.location.href,
    imsOrg: prodImsOrg,
    imsAuthService: undefined,
};

interface EnvironmentProviderProps {
    children: ReactNode;
}

export const EnvironmentProvider = ({ children }: EnvironmentProviderProps) => {
    const [environment, setEnvironment] = useState('prod');
    const [imsAuthInfo, setImsAuthInfo] = useState<ImsAuthInfo>(initImsAuthInfo);

    const applyImsAuthChange = (props: Partial<ImsAuthInfo>) => {
        const tokenService = registerContentFragmentSelectorAuthService(
            {
                ...imsAuthInfo,
                ...props,
            },
            true
        );
        setImsAuthInfo((prevInfo) => {
            return {
                ...prevInfo,
                ...props,
                imsAuthService: tokenService,
            };
        });
    };

    const cancelImsAuthChange = () => {
        setImsAuthInfo({
            ...initImsAuthInfo,
        });
        setEnvironment('prod');
    };

    const signOut = () => {
        const tokenService =
            imsAuthInfo?.imsAuthService || window.contentFragmentSelectorAuthService;
        tokenService?.signOut();
    };

    useEffect(() => {
        setImsAuthInfo((prevInfo) => {
            if (environment === 'stage') {
                return {
                    ...prevInfo,
                    env: 'stage',
                    imsClientId: stageImsClientId,
                    imsOrg: stageImsOrg,
                };
            }
            return initImsAuthInfo;
        });
    }, [environment]);

    // you must register the token service before using the content fragment selector
    useEffect(() => {
        // you can also access the tokenService from window.contentFragmentSelectorAuthService
        const tokenService = registerContentFragmentSelectorAuthService(imsAuthInfo);
        setImsAuthInfo((prevInfo) => {
            return {
                ...prevInfo,
                imsAuthService: tokenService,
            };
        });
    }, []);

    return (
        <EnvironmentContext.Provider
            value={{
                environment,
                setEnvironment,
                imsAuthInfo,
                setImsAuthInfo,
                cancelImsAuthChange,
                applyImsAuthChange,
                signOut,
            }}
        >
            {children}
        </EnvironmentContext.Provider>
    );
};

export default EnvironmentProvider;
