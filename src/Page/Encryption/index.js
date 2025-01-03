import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import DecryptionPage from './DecryptionPage';
import EncryptionPage from './EncryptionPage';

const { TabPane } = Tabs;

const EncryptNDecryptPage = () => {
  const { t: translation } = useTranslation();

  return (
    <Tabs>
      <TabPane tab={translation("encryption.tabs.decryption")} key="list">
        <DecryptionPage />
      </TabPane>
      <TabPane tab={translation("encryption.tabs.encryption")} key="search">
        <EncryptionPage />
      </TabPane>
    </Tabs>
  );
};

export default EncryptNDecryptPage;
