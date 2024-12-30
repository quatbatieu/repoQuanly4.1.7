import { ReloadOutlined } from "@ant-design/icons";
import {
  DatePicker,
  notification,
  Table,
  Button,
  Popconfirm,
  Row,
  Col,
  Typography,
} from "antd";
import React, { useState, useEffect, Fragment } from "react";
import "./newStyle.scss";
import NewService from "../../services/newService";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { DATE_DISPLAY_FORMAT } from "constants/dateFormats";
import ModalEditUserInfo from "Page/Management/ModalEditUserInfo";
import BasicTablePaging from "components/BasicTablePaging/BasicTablePaging";
import { useSelector } from "react-redux";
import UnLock from "components/UnLock/UnLock";
import { MIN_COLUMN_WIDTH } from "constants/app";
import { VERY_BIG_COLUMN_WIDTH } from "constants/app";
import { EXTRA_BIG_COLUMND_WITDTH } from "constants/app";
import BasicSearch from "components/BasicSearch";

const DEFAULT_FILTER = {
  filter: {
    isHidden: undefined,
    stationNewsCategories: undefined,
  },
  skip: 0,
  limit: 20,
  searchText: undefined,
  startDate: undefined,
  endDate: undefined,
  order: {
    key: "createdAt",
    value: "desc",
  },
};

export default function ListNews({
  isReload,
  isActive,
  listCategory,
  setIsReload,
  onSelectPostEdit,
}) {
  const [dataNews, setDataNews] = useState([]);
  const [total, setTotal] = useState(0);
  const { t: translation } = useTranslation();
  const [dataFilter, setDataFilter] = useState(DEFAULT_FILTER);
  const [creatorId, setCreatorId] = useState(undefined);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const setting = useSelector((state) => state.setting);

  const columns = [
    {
      title: translation("sms.index"),
      dataIndex: "index",
      key: "index",
      width: MIN_COLUMN_WIDTH,
      render: (_, __, index) => {
        return dataFilter.skip ? dataFilter.skip + index + 1 : index + 1;
      },
    },
    {
      title: translation("new.title"),
      key: "newspaper",
      dataIndex: "newspaper",
      width: EXTRA_BIG_COLUMND_WITDTH,
      render: (_, rowData) => {
        return (
          <div className="d-flex gap-2">
            {/* <Image alt='img' width={35} height={35} src={rowData.stationNewsAvatar} /> */}
            <span>{rowData.stationNewsTitle}</span>
          </div>
        );
      },
    },
    {
      title: translation("new.categories"),
      dataIndex: "stationNewsCategoryTitle",
      key: "stationNewsCategoryTitle",
      width: VERY_BIG_COLUMN_WIDTH,
    },
    {
      title: translation("new.creator"),
      dataIndex: "stationNewsCreators",
      key: "stationNewsCreators",
      // width: VERY_BIG_COLUMN_WIDTH,
      render: (_, record) => {
        return (
          <Typography.Paragraph
            className="sms-content"
            style={{ width: 250 }}
            ellipsis={{
              rows: 2,
            }}
            onClick={() => {
              setCreatorId(record?.stationNewsCreators?.appUserId);
              setIsOpenModalDetail(true);
            }}
          >
            <span style={{ cursor: "pointer", color: "var(--primary-color)" }}>
              {record?.stationNewsCreators?.firstName}
            </span>
          </Typography.Paragraph>
        );
      },
    },
    {
      title: translation("listSchedules.time"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: VERY_BIG_COLUMN_WIDTH,
      render: (createdAt) => {
        return moment(createdAt).format("DD/MM/YYYY");
      },
    },
    {
      title: translation("receipt.action"),
      dataIndex: "customerRecordPhone",
      key: "customerRecordPhone",
      width: VERY_BIG_COLUMN_WIDTH,
      render: (_, record) => {
        return (
          <div className="d-flex justify-content-between">
            <Button
              type="link"
              onClick={() => {
                onChangePostStatus(record);
              }}
            >
              {translation(
                record.isHidden === 0 ? "setting.hide" : "setting.show"
              )}
            </Button>
            <Button
              type="link"
              onClick={() => onSelectPostEdit(record.stationNewsId)}
            >
              {translation("short-edit")}
            </Button>
            <Popconfirm
              title={translation("new.confirm-delete")}
              onConfirm={() => {
                onDeletePost(record.stationNewsId);
              }}
              okText={translation("category.yes")}
              cancelText={translation("category.no")}
            >
              <Button type="link">{translation("listCustomers.delete")}</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const fetchDataNews = (filter) => {
    NewService.adminGetList(filter).then((result) => {
      if (result.data && result.data.length > 0) {
        setDataNews(dataNews.concat(result.data));
      }
    });
  };

  const fetchDataNewsNoConcat = (filter) => {
    NewService.adminGetList(filter).then((result) => {
      if (result.data) {
        setDataNews(result.data);
        setTotal(result.total);
      }
    });
  };

  useEffect(() => {
    fetchDataNewsNoConcat(DEFAULT_FILTER);
  }, []);

  useEffect(() => {
    if (isReload) {
      fetchDataNewsNoConcat(DEFAULT_FILTER);
      setDataFilter(DEFAULT_FILTER);
    }
    setIsReload(false);
  }, [isReload]);

  const onScrollToFetchData = (page) => {
    // Prevent fetch when scroll in another tab
    if (!isActive) {
      return;
    }
    let newSkip = (page - 1) * 20;
    dataFilter.skip = newSkip;
    setDataFilter({ ...dataFilter });
    fetchDataNews(dataFilter);
  };

  const onChangeSearchText = (e) => {
    e.preventDefault();
    setDataFilter({
      ...dataFilter,
      searchText: e.target.value ? e.target.value : undefined,
      skip: 0,
    });
  };

  const onSearchPost = () => {
    fetchDataNewsNoConcat(dataFilter);
  };

  const onChooseDate = (_, dateString) => {
    if (dateString && dateString[0].length > 0) {
      dataFilter.startDate = dateString[0];
      dataFilter.endDate = dateString[1];
    } else {
      dataFilter.startDate = undefined;
      dataFilter.endDate = undefined;
    }
    setDataFilter({ ...dataFilter, skip: 0 });
    fetchDataNewsNoConcat({ ...dataFilter, skip: 0 });
  };

  const onChangePostStatus = (post) => {
    onUpdatePost({
      id: post.stationNewsId,
      data: {
        isHidden: post.isHidden === 1 ? 0 : 1,
      },
    });
  };

  const onDeletePost = async (postId) => {
    onUpdatePost({
      id: postId,
      data: {
        isDeleted: 1,
      },
    });
  };

  const onUpdatePost = (data) => {
    NewService.updateANew(data).then((result) => {
      if (result && result.isSuccess) {
        fetchDataNewsNoConcat(dataFilter);
        notification.success({
          message: "",
          description: translation("new.updateSuccess"),
        });
      } else {
        notification.error({
          message: "",
          description: translation("new.updateFailed"),
        });
      }
    });
  };

  const options = listCategory.map((item) => {
    return {
      value: item.stationNewsCategoryId,
      label: item.stationNewsCategoryTitle,
    };
  });
  // lấy ra 3 danh mục : ưu đãi, tuyển dụng, chuyên ra chia sẻ
  const handleChangePage = (pageNum) => {
    const newFilter = {
      ...dataFilter,
      skip: (pageNum - 1) * dataFilter.limit,
    };
    setDataFilter(newFilter);
    fetchDataNewsNoConcat(newFilter);
  };

  return (
    <Fragment>
      {setting.enableNewsMenu === 0 ? (
        <UnLock />
      ) : (
        <div>
          <Row gutter={[24, 24]} className="mb-3">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <BasicSearch
                    onchange={onChangeSearchText}
                    onsearch={onSearchPost}
                    onpressenter={onSearchPost}
                    placeholder={translation("listSchedules.searchText")}
                    className="w-100"
                    value={dataFilter.searchText}
                  />
                </Col>
                <Col xs={24} sm={24} md={6} lg={3} xl={4} className="pr-0">
                  <div>
                    <DatePicker.RangePicker
                      className="w-100"
                      format={DATE_DISPLAY_FORMAT}
                      placeholder={[
                        translation("listCustomers.startDate"),
                        translation("listCustomers.endDate"),
                      ]}
                      onChange={onChooseDate}
                    />
                  </div>
                </Col>
                <Col xs={6} sm={4} md={4} lg={3} xl={2}>
                  <Button
                    onClick={() => fetchDataNewsNoConcat(dataFilter)}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <ReloadOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Table
            scroll={{ x: 1200 }}
            columns={columns}
            dataSource={dataNews}
            pagination={false}
          />
          <BasicTablePaging
            handlePaginations={handleChangePage}
            skip={dataFilter.skip}
            count={dataNews?.length < dataFilter?.limit}
          ></BasicTablePaging>
          <ModalEditUserInfo
            isEditing={isOpenModalDetail}
            toggleEditModal={() => setIsOpenModalDetail(!isOpenModalDetail)}
            selectedUserId={creatorId}
            preventEdit={true}
            titlePopup={translation("new.infoCreator")}
          />
          {/* <InfiniteScroll
        dataLength={dataNews.length}
        next={onScrollToFetchData}
        hasMore={preventScroll()}
        style={{ overflow: 'hidden' }}
        loader={<LoadingOutlined />}
        endMessage={
          <h4>{dataNews.length > 0 ? translation('new.readAll') : ''}</h4>
        }
      >
        {dataNews && dataNews.length > 0 ? (
          dataNews.map((newItem, i) => {
            return (
              <>
                <div className='row list_new__item' key={Math.random()}>
                  <div className='col-12 col-md-4 d-flex justify-content-center align-items-center'>
                    <Image
                      src={newItem.stationNewsAvatar}
                      alt='image'
                      width='100%'
                      style={{ maxHeight: 285 }}
                      preview={false}
                      className='list_new__item_image'
                    />
                  </div>
                  <div className='col-12 col-md-8'>
                    <Card type='inner' className='mb-3  border-0'>
                      <div className='list_new__item__title'>
                        {newItem.stationNewsTitle}
                        <br />
                        <em>
                          {renderNewCategory(newItem?.stationNewsCategories)}
                        </em>
                      </div>
                      <Card.Meta
                        description={
                          <div className='w-100 d-flex justify-content-between'>
                            <div>{getTime(newItem)}</div>
                            <div className='d-flex flex-row'>
                              <div className='list_new__item_icon'>
                                <EyeOutlined />
                              </div>
                              <div>{getTotalView(newItem.totalViewed)}</div>
                            </div>
                          </div>
                        }
                      />
                      <Card.Meta
                        className='list_new__item__description'
                        style={{ fontSize: 18 }}
                      />
                      <div className='list_new__item__action_button'>
                        <EditOutlined
                          onClick={() =>
                            onSelectPostEdit(newItem.stationNewsId)
                          }
                        />
                        {newItem.isHidden === 0 ? (
                          <EyeOutlined
                            onClick={() => onChangePostStatus(newItem)}
                          />
                        ) : (
                          <EyeInvisibleFilled
                            onClick={() => onChangePostStatus(newItem)}
                          />
                        )}
                        <DeleteOutlined
                          onClick={() => onDeletePost(newItem.stationNewsId)}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            )
          })
        ) : (
          <div className='d-flex justify-content-center h2'>
            {translation('new.listEmpty')}
          </div>
        )}
      </InfiniteScroll> */}
        </div>
      )}
    </Fragment>
  );
}
