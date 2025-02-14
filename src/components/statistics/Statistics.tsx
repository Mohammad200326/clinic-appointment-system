import React, { useEffect, useState } from "react";
import { Card, Statistic, Row, Col } from "antd";
import { IAppointment } from "../../types/types";
import dayjs from "dayjs";
import "./Statistics.css";

interface IProps {
  appointments: IAppointment[];
}

const Statistics = (props: IProps) => {
  const todayDate = new Date().toISOString();
  const formattedDate = dayjs(todayDate).format("YYYY-MM-DD");

  const [todayAppointments, setTodayAppointments] = useState<IAppointment[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<IAppointment[]>([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    if (props.appointments.length > 0) {
      const todayApps: IAppointment[] = props.appointments.filter(
        (app) => dayjs(app.dateTime).format("YYYY-MM-DD") === formattedDate
      );
      const pendingApps = todayApps.filter((app) => app.status.toString() === "Pending");
      const confirmedApps = todayApps.filter((app) => app.status.toString() === "Confirmed");

      setTodayAppointments(todayApps);
      setPendingAppointments(pendingApps);
      setConfirmedAppointments(confirmedApps);
    }
  }, [props.appointments]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card className="first-card">
          <Statistic title="Today Appointments" value={todayAppointments.length} />
        </Card>
      </Col>
      <Col span={8}>
        <Card className="second-card">
          <Statistic title="Pending Appointments" value={pendingAppointments.length} />
        </Card>
      </Col>
      <Col span={8}>
        <Card className="third-card">
          <Statistic title="Confirmed Appointments"  valueStyle={{color: "white"}} value={confirmedAppointments.length}/>
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics;
