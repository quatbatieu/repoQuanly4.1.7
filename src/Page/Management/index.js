import {
  FormOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  notification,
  Space,
  Table,
  Select,
  Input,
  Button,
  message,
  Modal,
  Form,
  Popconfirm,
  Typography,
  Row,
  Col,
  Spin,
} from "antd";
import ModalEditUserInfo from "./ModalEditUserInfo";
import React, { useEffect, useRef, useState, Fragment } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import LoginService from "services/loginService";
import { useSelector } from "react-redux";
import ManagementService from "../../services/manageService";
import { validatorPassword } from "helper/commonValidator";
import "./management.scss";
import ModalAddUser from "./ModalAdd";
import Explaintation from "Page/ExplainPower";
import EditableRow from "components/EditableRow";
import EditableCell from "components/EditableCell";
import { BUTTON_LOADING_TIME } from "constants/time";
import { getListPosition, getListInCharge } from "constants/management";
import { USER_ROLES } from "constants/permission";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import AppUserDocumentService from "services/appUserDocumentService";
import { DOCUMENT_TYPE } from "constants/management";
import { ReactComponent as PrivacyTip } from "assets/icons/privacy_tip.svg";
import { SweetAlertWrapperConfirm } from "components/SweetAlert/SweetAlertWrapper";
import UnLock from "components/UnLock/UnLock";
import { isMobileDevice } from "constants/account";
import BasicTablePaging from "components/BasicTablePaging/BasicTablePaging";
import stationsService from "services/stationsService";
import { MIN_COLUMN_WIDTH } from "constants/app";
import { EXTRA_BIG_COLUMND_WITDTH } from "constants/app";
import { BIG_COLUMN_WIDTH } from "constants/app";
import { VERY_BIG_COLUMN_WIDTH } from "constants/app";
import BasicSearch from "components/BasicSearch";
import { AnphaIcon } from "assets/icons";
import { ExportFile } from "hooks/FileHandler";
import { useModalDirectLinkContext } from "components/ModalDirectLink";
import ModalProgress from "./ModalProgress";

function ListUser() {
  const { t: translation } = useTranslation();
  const member = useSelector((state) => state.member);
  const setting = useSelector((state) => state.setting);
  const [formAdd] = Form.useForm();
  const [form] = Form.useForm();
  const LIST_POSITION = getListPosition(translation);
  const LIST_IN_CHARGE = getListInCharge(translation);
  const [isAdd, setIsAdd] = useState(false);
  const [changeStation, setChangeStation] = useState(false);
  const [stationData, setStationData] = useState([]);
  const inputAddRef = useRef();
  const DEFAULT_FILTER = {
    filter: {
      active: undefined,
      username: undefined,
      email: undefined,
      phoneNumber: undefined,
      stationsId: member.stationsId,
    },
    skip: 0,
    limit: 20,
    searchText: undefined,
  };
  const LIST_COLOR = {
    1: {
      bg: "#7367f01f",
      icon: "#7367f0",
    },
    2: {
      bg: "#28c76f1f",
      icon: "#28c76f",
    },
    3: {
      bg: "#ff9f431f",
      icon: "#ff9f43",
    },
    4: {
      bg: "#00cfe81f",
      icon: "#00cfe8",
    },
  };
  function getColorByAppUserRoleId(appUserRoleId) {
    if (LIST_COLOR[appUserRoleId]) {
      return LIST_COLOR[appUserRoleId];
    } else {
      return {
        bg: "#00cfe81f",
        icon: "#00cfe8",
      };
    }
  }
  const [dataFilter, setDataFilter] = useState(DEFAULT_FILTER);
  const [dataUser, setDataUser] = useState({
    total: 0,
    data: [],
  });
  const [isEditting, setIsEditting] = useState(false);
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState(false);
  const [listStation, setListStation] = useState([]);
  const [lock, setLock] = useState(false);
  const [rows, setRow] = useState("");

  function handleSave(row, key, isReload) {
    const { appUserId } = row;

    updateUserData({
      id: appUserId,
      data: {
        [key]: row[key],
      },
    });
  }
  const getStationList = () => {
    stationsService
      .getStationList({
        filter: {},
        skip: 0,
        limit: 350,
        order: {
          key: "stationCode",
          value: "asc",
        },
      })
      .then((result) => {
        if (result) {
          setListStation(result.data);
        }
      });
  };
  const onChangeStation = (data, value) => {
    let newData = {
      id: data.appUserId,
      data: {
        stationsId: value,
      },
    };
    ManagementService.changeStationById(newData).then((result) => {
      if (result.isSuccess) {
        notification.success({
          message: "",
          description: translation("accreditation.updateSuccess"),
        });
        setChangeStation(false);
        fetchData(dataFilter);
      } else {
        notification.error({
          message: "",
          description: translation("accreditation.updateError"),
        });
        setChangeStation(false);
      }
    });
  };

  function handleChangeRow(record, currentIndex) {
    dataUser.data[currentIndex - 1] = record;
    setDataUser({ ...dataUser });
  }

  const columns = [
    {
      title: translation("listDocumentary.index"),
      key: "index",
      width: MIN_COLUMN_WIDTH,
      align: "center",
      render: (_, __, index) => {
        return (
          <div className="d-flex justify-content-center aligns-items-center">
            {dataFilter.skip ? dataFilter.skip + index + 1 : index + 1}
          </div>
        );
      },
    },
    {
      title: translation("landing.fullname"),
      key: "customerRecordPlatenumber",
      width: EXTRA_BIG_COLUMND_WITDTH,
      render: (_, row) => {
        return `${row.firstName} ${row.lastName ? row.lastName : ""}`;
      },
    },
    {
      title: translation("landing.account"),
      dataIndex: "username",
      key: "username",
      width: 250,
      render: (value) => {
        return (
          <Typography.Paragraph
            className="sms-content"
            style={{ width: 218 }}
            ellipsis={{
              rows: 1,
              expandable: true,
              symbol: "Hiển thị",
            }}
          >
            {value}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: 250,
      render: (value) => {
        return (
          <Typography.Paragraph
            className="sms-content"
            style={{ width: 218 }}
            ellipsis={{
              rows: 1,
              expandable: true,
              symbol: "Hiển thị",
            }}
          >
            {value}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: translation("landing.phoneNumber"),
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      width: VERY_BIG_COLUMN_WIDTH,
    },
    // {
    //   title: <div className='d-flex'>
    //     <div>{translation('landing.stationCode')}</div>
    //   </div>,
    //   key: 'appUserRoleName',
    //   dataIndex: 'appUserRoleName',
    //   width: 200,
    //   render: (_, row) => {
    //     return (
    //       <div className='d-flex align-items-center'>
    //         <Select defaultValue={row.stationsId} onChange={(e)=>onChangeStation(row,e)} className="w-100">
    //           {listStation && listStation?.map(item=>(
    //             <Select.Option value={item.stationsId}>{item.stationCode}</Select.Option>
    //           ))}
    //         </Select>
    //       </div>
    //     )
    //   }
    // },
    {
      title: translation("receipt.action"),
      key: "action",
      // width: EXTRA_BIG_COLUMND_WITDTH,
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center justify-content-between">
            {record.active === 1 ? (
              <LockOutlined
                // onClick={() => updateUserData({
                //   id: record.appUserId,
                //   data: {
                //     active: 0
                //   }
                // })}
                onClick={() => {
                  setLock(true);
                  setRow(record);
                }}
                style={{ color: "var(--primary-color)" }}
              />
            ) : (
              <UnlockOutlined
                // onClick={() => updateUserData({
                //   id: record.appUserId,
                //   data: {
                //     active: 1
                //   }
                // })}
                onClick={() => {
                  setLock(true);
                  setRow(record);
                }}
              />
            )}
            <IconChangePassword record={record} member={member} />
            <Button
              type="link"
              className="p-0"
              onClick={() => {
                setSelectedUser(record);
                setIsEditting(true);
                if (inputRef && inputRef.current) {
                  setTimeout(() => {
                    inputRef.current.focus();
                  }, 100);
                }
              }}
            >
              {translation("short-edit")}
            </Button>
            {/* {record?.appUserRoleId != USER_ROLES.ADMIN ? (
            <SweetAlertWrapperConfirm
              title={translation("management.confirm-delete")}
              onConfirm={() => {
                if (record?.appUserRoleId != USER_ROLES.ADMIN) {
                  updateUserData({
                    id: record.appUserId,
                    data: {
                      isDeleted: 1
                    }
                  })
                }
              }}
              okText={translation("category.yes")}
              cancelText={translation("category.no")}
            >

              <Button
                type="link"
                className='p-0'
              >
                {translation("listCustomers.delete")}
              </Button>
            </SweetAlertWrapperConfirm>
            ) : (
              <Button
                type="link"
                className='p-0'
                style={{ width: 24 }}
              >

              </Button>
            )
            } */}
            <Button
              type="link"
              className="p-0"
              onClick={() => {
                setChangeStation(true);
                setStationData(record);
              }}
            >
              Chuyển trạm
            </Button>
          </div>
        );
      },
    },
  ];

  const components = {
    body: {
      row: (props) => <EditableRow {...props} form={form} />,
      cell: (props) => <EditableCell {...props} form={form} />,
    },
  };

  const columnsEdit = columns.map((col, index) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        isTime: col.isTime ? true : false,
        componentInput: col.componentInput,
        rules: col.rules,
        handleSave: (row, isReload) => handleSave(row, col.key, isReload),
        handleChangeRow: (record) => handleChangeRow(record, index),
      }),
    };
  });

  function updateUserData(data, callback = () => false) {
    ManagementService.updateUser(data).then((result) => {
      if (result.isSuccess) {
        setSelectedUser(null);
        fetchData(dataFilter);
        isEditting && setIsEditting(false);
        notification.success({
          message: "",
          description: translation("accreditation.updateSuccess"),
        });
        callback();
      } else {
        callback();
        notification.error({
          message: "",
          description: translation(
            result.error ? result.error : "accreditation.updateError"
          ),
        });
      }
    });
  }

  function fetchData(paramFilter) {
    ManagementService.getListUser(paramFilter).then((result) => {
      if (result) {
        setLoading(false);
        setDataUser(result);
      } else {
        notification.error({
          message: "",
          description: translation("new.fetchDataFailed"),
        });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    isMobileDevice(window.outerWidth);
    if (isMobileDevice(window.outerWidth) === true) {
      dataFilter.limit = 10;
    }
    fetchData(dataFilter);
    getStationList();
  }, []);

  const handleChangePage = (pageNum) => {
    const newFilter = {
      ...dataFilter,
      skip: (pageNum - 1) * dataFilter.limit,
    };
    setDataFilter(newFilter);
    fetchData(newFilter);
  };

  const onFilterUserByStatus = (e) => {
    let newFilter = dataFilter;
    newFilter.skip = 0;
    if (e || e === 0) {
      newFilter.filter.active = e;
    } else {
      newFilter.filter.active = undefined;
    }
    setDataFilter(newFilter);
    fetchData(newFilter);
  };

  function handleFilter() {
    let newFilter = dataFilter;
    newFilter.skip = 0;
    newFilter.searchText = searchText ? searchText : undefined;
    setDataFilter(newFilter);
    fetchData(newFilter);
  }

  const uploadDocument = async (param, documentType, id) => {
    const { response, name } = param;
    return await AppUserDocumentService.addDocument({
      appUserId: id,
      documentName: name,
      documentType: documentType,
      documentURL: response,
    });
  };

  async function uploadDocumentProfile(
    { id, listProfilePicture, listSampleSignature },
    callback
  ) {
    for (const param of listProfilePicture) {
      const result = await uploadDocument(param, DOCUMENT_TYPE.PROFILE, id);
      if (!result.issSuccess) {
        notification.warn({
          message: "",
          description: translation("management.errorAddDocument", {
            fileName: param.name,
          }),
        });
      }
    }

    for (const param of listSampleSignature) {
      const result = await uploadDocument(param, DOCUMENT_TYPE.SIGNATURE, id);
      if (!result.issSuccess) {
        notification.warn({
          message: "",
          description: translation("management.errorAddDocument", {
            fileName: param.name,
          }),
        });
      }
    }
    callback();
  }

  async function handleCreateNew(
    values,
    { listProfilePicture, listSampleSignature },
    callback
  ) {
    await ManagementService.registerUser(values).then(async (result) => {
      if (result && result.isSuccess) {
        uploadDocumentProfile(
          {
            id: result.id,
            listProfilePicture,
            listSampleSignature,
          },
          () => {
            callback();
            notification.success({
              message: "",
              description: translation("management.createSuccess"),
            });
            isAdd && setIsAdd(false);
            formAdd.resetFields();
            fetchData(dataFilter);
          }
        );
      } else {
        if (result.error) {
          notification.error({
            message: "",
            description: translation(result.error),
          });
        }
      }
    });
  }

  const ModalLock = ({ modal, onCancel }) => {
    const { t: translation } = useTranslation();
    return (
      <Modal
        visible={modal}
        title={translation("Notification")}
        onCancel={onCancel}
        centered
        onOk={() => checkActive(rows)}
        // footer={null}
        // width="1400px"
      >
        <div className="modal_role">{translation("box-agree")}</div>
      </Modal>
    );
  };

  const checkActive = (rows) => {
    if (rows.active === 1) {
      updateUserData({
        id: rows.appUserId,
        data: {
          active: 0,
        },
      });
    } else {
      updateUserData({
        id: rows.appUserId,
        data: {
          active: 1,
        },
      });
    }
    setLock(false);
  };

  const { setUrlForModalDirectLink } = useModalDirectLinkContext();
  // Những Thứ dùng chung export và import
  const { onExportExcel, isLoading: isLoadingExport } = ExportFile();
  const [isModalProgress, setisModalProgress] = useState(false);
  const [percent, setPercent] = useState(0);
  const [percentPlus, setPercentPlus] = useState(0);

  // Những Thứ dùng chung Import
  const [arrImport, setArrImport] = useState([]);
  const [isImport, setIsImport] = useState(false);
  const [importSummary, setImportSummary] = useState({
    logs: [],
    numberError: 0,
    numberSuccess: 0,
  });

  const DefaultFilterExport = {
    limit: 100,
  };

  const FIELDS_EXPORT_IMPORT = [
    { api: "index", content: "Số TT" },
    { api: "firstName", content: "Họ và tên" },
    { api: "username", content: "Tài khoản" },
    { api: "phoneNumber", content: "Số điện thoại" },
  ];
  const fetchExportData = async (param, filter) => {
    for (let key in filter) {
      if (!filter[key]) {
        delete filter[key];
      }
    }

    const response = await ManagementService.getListUser({
      ...filter,
      limit: DefaultFilterExport.limit,
      skip: param * DefaultFilterExport.limit,
    });

    const data = await response.data;
    return data;
  };

  const handleExportExcel = async () => {
    let number = Math.ceil(dataUser.data.length / DefaultFilterExport.limit);
    let params = Array.from(
      Array.from(new Array(number)),
      (element, index) => index
    );
    let results = [];

    const percentPlus = 100 / params.length;
    setPercent(0);
    setisModalProgress(true);

    let _counter = 0;
    while (true) {
      const result = await fetchExportData(_counter++, dataFilter);
      if (result && result.length > 0) {
        setPercent((prev) => prev + percentPlus);
        results = [...results, ...result];
      } else {
        break;
      }
    }

    const newResult = results.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    await setTimeout(() => {
      setisModalProgress(false);
      setPercent(0);
      onExportExcel({
        fieldApi: FIELDS_EXPORT_IMPORT.map((item) => item.api),
        fieldExport: FIELDS_EXPORT_IMPORT.map((item) => item.content),
        data: newResult,
        informationColumn: [
          ["Trung tâm đăng kiểm", "", "", "Danh sách nhân sự"],
          [
            `Mã: Trung Tâm đăng kiểm xe cơ giới 123`,
            "",
            "",
            `Danh sách nhân sự ngày ${moment().format("DD/MM/YYYY")}`,
          ],
          [""],
        ],
        timeWait: 0,
        nameFile: "data.xlsx",
        setUrlForModalDirectLink: setUrlForModalDirectLink,
      });
    }, 1000);
  };

  return (
    <Fragment>
      {setting.enableManagerMenu === 0 ? (
        <UnLock />
      ) : (
        <div className="management">
          <Row gutter={[24, 24]} className="mb-3">
            <Col xs={24} sm={12} md={6} lg={6} xl={4}>
              <BasicSearch
                className="w-100"
                value={searchText}
                onpressenter={handleFilter}
                onsearch={handleFilter}
                onchange={(e) => setSearchText(e.target.value)}
                placeholder={translation("landing.search")}
                style={{
                  minWidth: 160,
                }}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={4}>
              <Select
                onChange={onFilterUserByStatus}
                className="w-100"
                placeholder="Trạng thái"
                style={{
                  minWidth: 180,
                }}
              >
                <Select.Option value="">
                  {translation("new.allPost")}
                </Select.Option>
                <Select.Option value={1}>
                  {translation("management.active")}
                </Select.Option>
                <Select.Option value={0}>
                  {translation("management.inActive")}
                </Select.Option>
              </Select>
            </Col>
            <Col xs={8} sm={4} md={4} lg={3} xl={2}>
              <Button
                type="primary"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                  setIsAdd(true);
                  setTimeout(() => {
                    if (inputAddRef && inputAddRef.current) {
                      inputAddRef.current.focus();
                    }
                  }, 10);
                }}
                icon={<PlusOutlined />}
              >
                {/* {translation("inspectionProcess.add")} */}
                Tạo mới
              </Button>
            </Col>
            <Col xs={8} sm={8} md={4} lg={3} xl={2} className="px-3">
              <Button
                onClick={handleExportExcel}
                className="d-flex align-items-center gap-1 mobies"
                icon={<AnphaIcon />}
              >
                {translation("listCustomers.export")}
              </Button>
            </Col>
            <Col xs={8} sm={4} md={4} lg={3} xl={2} className="sm-ml-3">
              <Button
                className="d-flex align-items-center justify-content-center"
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    fetchData(dataFilter);
                    setLoading(false);
                  }, BUTTON_LOADING_TIME);
                }}
              >
                {!loading && <ReloadOutlined />}
              </Button>
            </Col>
          </Row>
          <div className="management__body">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "75vh" }}
              >
                <Spin />
              </div>
            ) : (
              <>
                <Table
                  dataSource={dataUser.data}
                  columns={columnsEdit}
                  scroll={{ x: 1300 }}
                  components={components}
                  pagination={false}
                />
                <BasicTablePaging
                  handlePaginations={handleChangePage}
                  skip={dataFilter.skip}
                  count={dataUser?.data?.length < dataFilter.limit}
                ></BasicTablePaging>
              </>
            )}
          </div>
          <ModalRole modal={role} onCancel={() => setRole(false)} />
          <ModalLock modal={lock} onCancel={() => setLock(false)} />
          <ModalEditUserInfo
            isEditing={isEditting}
            toggleEditModal={() => setIsEditting(!isEditting)}
            onUpdateUser={updateUserData}
            selectedUserId={selectedUser?.appUserId}
            inputRef={inputRef}
            member={member}
          />
          <ModalAddUser
            isAdd={isAdd}
            onCancel={() => setIsAdd(false)}
            form={formAdd}
            onCreateNew={handleCreateNew}
            inputRef={inputAddRef}
            member={member}
          />
          <Modal
            visible={changeStation}
            title={"Chuyển trạm"}
            onCancel={() => setChangeStation(false)}
            footer={null}
            width="350px"
          >
            <div className="modal_role">
              <div className="mb-1">{translation("landing.stationCode")}</div>
              <div className="d-flex align-items-center">
                <Select
                  defaultValue={stationData.stationsId}
                  onChange={(e) => onChangeStation(stationData, e)}
                  className="w-100"
                >
                  {listStation &&
                    listStation?.map((item) => (
                      <Select.Option value={item.stationsId}>
                        {item.stationCode}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            </div>
          </Modal>
          {isModalProgress && (
            <ModalProgress
              visible={isModalProgress}
              setVisible={setisModalProgress}
              percent={percent}
              logs={importSummary.logs}
              isLoading={arrImport.length !== 0}
              isImport={isImport}
              numberError={importSummary.numberError}
              numberSuccess={importSummary.numberSuccess}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

const IconChangePassword = ({ member, record }) => {
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState(false);

  return (
    <>
      <span
        onClick={() => setIsOpenModalChangePassword(true)}
        className="management-privacyTip"
      >
        <PrivacyTip />
      </span>
      {member.appUserRoleId === USER_ROLES.ADMIN && (
        <>
          {isOpenModalChangePassword && (
            <ModalChangePassword
              isOpen={isOpenModalChangePassword}
              toggleModal={() =>
                setIsOpenModalChangePassword(!isOpenModalChangePassword)
              }
              selectedUserId={record.appUserId}
            />
          )}
        </>
      )}
    </>
  );
};

const ModalChangePassword = ({ isOpen, toggleModal, selectedUserId }) => {
  const { t: translation } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    LoginService.changePasswordUser({
      id: selectedUserId,
      ...values,
    }).then((result) => {
      if (result && result.isSuccess) {
        notification.success({
          message: "",
          description: translation("listCustomers.success", {
            type: translation("setting.changePass"),
          }),
        });
        form.resetFields();
        toggleModal();
      } else {
        notification.error({
          message: "",
          description: translation("listCustomers.failed", {
            type: translation("setting.changePass"),
          }),
        });
      }
    });
  };
  return (
    <Modal
      visible={isOpen}
      title={translation("setting.changePass")}
      onCancel={toggleModal}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            {
              required: false,
              validator(_, value) {
                return validatorPassword(value, translation);
              },
            },
          ]}
          label={translation("landing.newPassword")}
        >
          <Input
            placeholder={translation("landing.enterNewPassword")}
            autoFocus
          />
        </Form.Item>

        <div className="d-flex w-100 justify-content-end">
          <Button type="primary" htmlType="submit">
            {translation("landing.confirm")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const ModalRole = ({ modal, onCancel }) => {
  const { t: translation } = useTranslation();
  return (
    <Modal
      visible={modal}
      title={translation("header.explainPower")}
      onCancel={onCancel}
      footer={null}
      width="1400px"
    >
      <div className="modal_role">
        <Explaintation />
      </div>
    </Modal>
  );
};

export default ListUser;
