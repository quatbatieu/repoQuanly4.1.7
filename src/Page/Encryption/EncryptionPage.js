import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, {  useState } from "react";
import {
  decryptAes256CBC,
  encryptAes256CBC,
} from "constants/EncryptionFunctions";

const EncryptionPage = () => {
  const [textEncrypted, setTextEncrypted] = useState("");
  const [encrypted, setEncrypted] = useState("");

  const handleEncrypt = () => {
    const result = encryptAes256CBC(textEncrypted)
    setEncrypted(() => JSON.stringify(result));
  };

  return (
    <div>
      <div className="container d-flex flex-column align-items-center gap-3">
        <TextArea
          value={textEncrypted}
          onChange={(e) => setTextEncrypted(e.target.value)}
          placeholder="Nhập nội dung mã hóa"
          autoSize={{ minRows: 3, maxRows: 5 }}
        ></TextArea>
        <Button onClick={handleEncrypt} type="primary">
          Chuyển đổi
        </Button>
        <TextArea
          value={encrypted}
          readOnly={true}
          placeholder="Nội dung đã giải mã"
          autoSize={{ minRows: 3, maxRows: 5 }}
        ></TextArea>
      </div>
    </div>
  );
};

export default EncryptionPage;
