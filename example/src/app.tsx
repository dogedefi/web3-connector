import '@/assets/styles/global.pc.less';
import '@/assets/styles/global.mobile.less';

import 'react';
// import { setLocale } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import { getLibrary, Web3ReactCore } from 'web3-connector';

const { Web3ReactProvider } = Web3ReactCore;

// setLocale('en-US', false);
// setLocale('zh-CN', false);

export function rootContainer(container: any) {
  return (
    <ConfigProvider locale={enUS}>
      <Web3ReactProvider getLibrary={getLibrary}>{container}</Web3ReactProvider>
    </ConfigProvider>
  );
}
