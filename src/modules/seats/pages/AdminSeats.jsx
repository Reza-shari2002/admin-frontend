import React from "react";
import Layout from "../../../components/layout/Layout";
import SeatMap_holder from "../components/SeatMap_holder";

function AdminSeats() {
  return (
    <Layout activeRoute="/seats" title="نقشه صندلی‌ها">
      <SeatMap_holder />
    </Layout>
  );
}

export default AdminSeats;
