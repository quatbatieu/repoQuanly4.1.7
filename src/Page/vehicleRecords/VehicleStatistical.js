import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import _, { set } from "lodash";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import { DatePicker, Spin } from "antd";
import vehicleProfileService from "services/vehicleProfileService";
import { VEHICLE_TYPES_STATES_EXPORT } from "../../constants/scheduleImportExport";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getVehicleTypeColor = (vehicleType) => {
  const vehicleTypeColors = {
    1: {
      backgroundColor: "rgba(221, 26, 68, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    10: {
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    20: {
      backgroundColor: "rgba(32, 237, 237, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    default: {
      backgroundColor: "rgba(153, 102, 255, 0.5)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
  };
  return vehicleTypeColors[vehicleType] || vehicleTypeColors.default;
};

const VehicleStatiscal = () => {
  const { t: translation } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [statisticalData, setStatisticalData] = useState([]);
  const [dataRequest, setDataRequest] = useState([]);
  const [filter, setFilter] = useState({
    startDate: moment().startOf("year").format("DD/MM/YYYY"),
    endDate: moment().endOf("year").format("DD/MM/YYYY"),
  });

  const onFilterByDate = async () => {
    try {
      let allData = [];
      let skip = 0;
      const limit = 100;
      setLoading(true);
      while (true) {
        const result = await vehicleProfileService.find({ limit, skip });

        if (result && result.data && result.data.length > 0) {
          allData = allData.concat(result.data);
          skip += limit;
        } else {
          break;
        }
      }
      setLoading(false);
      setStatisticalData(allData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const groupedVehicles = statisticalData.reduce((acc, vehicle) => {
      const { vehicleType, createdAt } = vehicle;
      console.log(vehicleType);
      const vehicleColor = getVehicleTypeColor(vehicleType);
      const month = new Date(createdAt).getMonth();

      if (!acc[vehicleType]) {
        acc[vehicleType] = {
          label: VEHICLE_TYPES_STATES_EXPORT[vehicleType] || "Chưa phân loại",
          data: new Array(12).fill(0),
          backgroundColor: vehicleColor.backgroundColor,
          borderColor: vehicleColor.borderColor,
          borderWidth: 1,
        };
      }

      if (
        month >= 0 &&
        month <= 11 &&
        new Date(createdAt).getFullYear() >=
          new Date(filter.startDate).getFullYear()
      ) {
        acc[vehicleType].data[month] += 1; 
      }

      return acc;
    }, {});
    const result = Object.values(groupedVehicles);
    setDataRequest(result);
  }, [statisticalData, filter.startDate]);

  useEffect(() => {
    onFilterByDate();
  }, []);

  const data = {
    labels: [
      translation("months.January"),
      translation("months.February"),
      translation("months.March"),
      translation("months.April"),
      translation("months.May"),
      translation("months.June"),
      translation("months.July"),
      translation("months.August"),
      translation("months.September"),
      translation("months.October"),
      translation("months.November"),
      translation("months.December"),
    ],
    datasets: dataRequest,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: translation("charts"),
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const yearFormat = (d) => {
    return d.format("YYYY");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "75vh" }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <div className="mobie_text col-md-5 col-lg-4 col-xl-4 mb-3 d-flex align-items-center h-100">
        <span>{translation("select-time")}</span>
        &nbsp; &nbsp;
        <DatePicker
          picker="year"
          style={{ flexGrow: 1 }}
          defaultValue={moment(filter.startDate, "DD/MM/YYYY")}
          onChange={(value) => {
            if (value) {
              setFilter({
                startDate: value.startOf("year").format("DD/MM/YYYY"),
                endDate: value.endOf("year").format("DD/MM/YYYY"),
              });
            }
          }}
          allowClear={false}
          format={yearFormat}
          monthCellRender={(date, _) => translation(date.format("MMMM"))}
        />
      </div>
      <Bar className="vehicle__chart--canvas" data={data} options={options} />
    </div>
  );
};

export default VehicleStatiscal;
