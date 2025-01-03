import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import {
  decryptAes256CBC,
  encryptAes256CBC,
} from "constants/EncryptionFunctions";

const dataExample = "Hello World!";
const DecryptionPage = () => {
  const [data, setData] = useState("");
  const [dataDecrypted, setDataDecrypted] = useState("");

  useEffect(() => {
    setData(() => encryptAes256CBC(JSON.stringify(dataExample)));
  }, []);

  const handleDecrypt = () => {
    setDataDecrypted(() => {
      return decryptAes256CBC(data);
    });
  };

  return (
    <div>
      <div className="container d-flex flex-column align-items-center gap-3">
        <TextArea
          value={JSON.stringify(data)}
          placeholder="Nhập nội dung mã hóa"
          autoSize={{ minRows: 3, maxRows: 5 }}
        ></TextArea>
        <Button onClick={handleDecrypt} type="primary">
          Chuyển đổi
        </Button>
        <TextArea
          value={dataDecrypted}
          readOnly={true}
          placeholder="Nội dung đã giải mã"
          autoSize={{ minRows: 3, maxRows: 5 }}
        ></TextArea>
      </div>
    </div>
  );
};

export default DecryptionPage;
