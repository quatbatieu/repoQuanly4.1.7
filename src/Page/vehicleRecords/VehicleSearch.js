import React from "react";
import {
  Select,
  Table,
  notification,
  Row,
  Col,
} from "antd";
import { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { widthLicensePlate } from "constants/licenseplates";
import TagVehicle from "components/TagVehicle/TagVehicle";
import { useHistory } from "react-router-dom";
import vehicleProfileService from "services/vehicleProfileService";
import { routes } from "App";
import stationsService from "services/stationsService";
import UnLock from "components/UnLock/UnLock";
import { getListVehicleTypes } from "constants/listSchedule";
import { useSelector } from "react-redux";
import BasicTablePaging from "components/BasicTablePaging/BasicTablePaging";
import BasicSearch from "components/BasicSearch";

const LIMIT = 10;
export default function VehicleList() {
  const { t: translation } = useTranslation();
  const [listDocumentary, setListDocumentary] = useState({
    data: [],
    total: 0,
  });
  const setting = useSelector((state) => state.setting);
  const VEHICLE_TYPES = getListVehicleTypes(translation);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const history = useHistory();

  const [dataFilter, setDataFilter] = useState({
    filter: {
      documentPublishedDay: undefined,
    },
    limit: LIMIT,
    searchText: undefined,
  });

  const [dataStation, setDataStation] = useState({
    total: 0,
    data: [],
  });

  const columns = [
    {
      title: translation("vehicleRecords.index"),
      key: "index",
      dataIndex: "index",
      width: 60,
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
      title: translation("vehicleRecords.registrationPlate"),
      key: "vehiclePlateNumber",
      dataIndex: "vehiclePlateNumber",
      align: "center",
      width: widthLicensePlate,
      render: (value, values) => {
        const colorList = {
          WHITE: 1,
          BLUE: 2,
          YELLOW: 3,
          RED: 4,
        };
        const color = values.vehiclePlateColor
          ? colorList[values.vehiclePlateColor] - 1
          : 0;

        return <TagVehicle color={color}>{value}</TagVehicle>;
      },
    },
    {
      title: translation("vehicleRecords.vehicleType"),
      key: "vehicleType",
      dataIndex: "vehicleType",
      align: "center",
      width: 200,
      render: (value) => {
        return <div>{VEHICLE_TYPES?.[value] || "-"}</div>;
      },
    },
    {
      title: translation("vehicleRecords.managementUnit"),
      key: "stationCode",
      dataIndex: "stationCode",
      align: "center",
      width: 160,
    },
    {
      title: translation("vehicleRecords.managementNumber"),
      key: "vehicleRegistrationCode",
      dataIndex: "vehicleRegistrationCode",
      align: "center",
      width: 160,
    },
    {
      title: translation("vehicleRecords.typeNumber"),
      key: "vehicleBrandModel",
      dataIndex: "vehicleBrandModel",
      align: "center",
      width: 200,
    },
    {
      title: translation("vehicleRecords.chassisNumber"),
      key: "chassisNumber",
      dataIndex: "chassisNumber",
      align: "center",
      width: 200,
    },
    {
      title: translation("vehicleRecords.engineNumber"),
      key: "engineNumber",
      dataIndex: "engineNumber",
      align: "center",
      width: 200,
    },
    {
      title: translation("vehicleRecords.image"),
      key: "fileList",
      dataIndex: "fileList",
      align: "center",
      render: (value, record) => {
        return value?.length ? (
          <div
            onClick={() => {
              history.push(
                `${routes.vehicleRecords.path}/${record.vehicleProfileId}`
              );
            }}
            style={{ color: "var(--primary-color)" }}
          >
            {translation("vehicleRecords.image")}
          </div>
        ) : (
          "-"
        );
      },
    },
  ];

  const onFilterUserByStationId = (e) => {
    let newFilter = dataFilter;
    if (e) {
      newFilter.filter.stationsId = e;
      newFilter.skip = 0;
    } else {
      newFilter.filter.stationsId = undefined;
      newFilter.skip = 0;
    }
    setDataFilter(newFilter);
    fetchData(newFilter);
  };

  const fetchData = (filter) => {
    vehicleProfileService.search(filter).then((result) => {
      if (result) {
        setListDocumentary(result);
      }
    });
  };

  const fetchDataStation = (filter) => {
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
          setDataStation(result.data);
        } else {
          notification.error({
            message: "",
            description: translation("new.fetchDataFailed"),
          });
        }
      });
  };

  useEffect(() => {
    fetchDataStation();
  }, []);
  useEffect(() => {
    fetchData(dataFilter);
  }, []);

  const onSearch = (value) => {
    const newFilter = { ...dataFilter };
    if (!value) {
      newFilter.searchText = undefined;
    } else {
      newFilter.searchText = value;
    }
    newFilter.skip = 0;
    setDataFilter(newFilter);
    fetchData(newFilter);
  };

  const toggleEditModal = () => {
    // Nếu tắt modal xem chi tiết gọi thêm fetchData.
    if (isEditing) {
      fetchData(dataFilter);
    }

    setIsEditing((prev) => !prev);
  };

  const onChangeSearchText = (e) => {
    e.preventDefault();
    setDataFilter({
      ...dataFilter,
      searchText: e.target.value ? e.target.value : undefined,
    });
  };

  const handleChangePage = (pageNum) => {
    const newFilter = {
      ...dataFilter,
      skip: (pageNum - 1) * dataFilter.limit,
    };
    setDataFilter(newFilter);
    fetchData(newFilter);
  };

  return (
    <Fragment>
      {setting.enableVehicleRegistrationMenu === 0 ? (
        <UnLock />
      ) : (
        <main className="list_customers">
          <Row gutter={[24, 24]} className="mb-3">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={6} lg={6} xl={4}>
                  <BasicSearch
                    className="w-100"
                    placeholder={translation("listCustomers.search")}
                    onchange={onChangeSearchText}
                    value={dataFilter.searchText}
                    onsearch={onSearch}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={4}>
                  <Select
                    onChange={onFilterUserByStationId}
                    className="w-100"
                    placeholder="Mã trạm"
                  >
                    <Select.Option value={0}>
                      {translation("PhoneBook.allStations")}
                    </Select.Option>
                    {dataStation?.length > 0 &&
                      dataStation.map((item) => (
                        <Select.Option
                          key={item.stationsId}
                          value={item.stationsId}
                        >
                          {item.stationCode}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="list_customers__body">
            <Table
              dataSource={listDocumentary.data}
              columns={columns}
              scroll={{ x: 1510 }}
              pagination={false}
            />
            <BasicTablePaging
              handlePaginations={handleChangePage}
              skip={dataFilter.skip}
              count={listDocumentary?.data?.length < dataFilter?.limit}
            ></BasicTablePaging>
          </div>
        </main>
      )}
    </Fragment>
  );
}
