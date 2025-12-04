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

import React, { useEffect, useState } from 'react';

import { registerContentFragmentSelectorAuthService } from './ContentFragmentSelectorWrapper';

export const EnvironmentContext = React.createContext({});

const stageImsClientId = 'exc_app';
const stageImsOrg = "8C6043F15F43B6390A49401A@AdobeOrg";

const prodImsClientId = 'exc_app';
const prodImsOrg = '908936ED5D35CC220A495CD4@AdobeOrg';

const initImsAuthInfo = {
  env: 'prod',
  imsClientId: prodImsClientId,
  imsScope:
    'AdobeID,openid,read_organizations,additional_info.projectedProductContext',
  redirectUrl: window.location.href,
  imsOrg: prodImsOrg,
  imsAuthService: undefined,
};

export const EnvironmentProvider = ({ children }) => {
  const [environment, setEnvironment] = useState('prod');
  const [imsAuthInfo, setImsAuthInfo] = useState(initImsAuthInfo);

  const applyImsAuthChange = (props) => {
    // update the token service
    // you can also access the tokenService from window.contentFragmentSelectorAuthService
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
    tokenService.signOut();
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
    const tokenService = registerContentFragmentSelectorAuthService(
      imsAuthInfo
    );
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
