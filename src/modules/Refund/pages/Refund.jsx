import React from "react";
import Layout from "../../../components/layout/Layout";
import Refund_holder from "../components/Refund_holder";

function Refund() {
  return (
    <Layout activeRoute="/refund" title="مدیریت درخواست‌های استرداد وجه">
      <Refund_holder></Refund_holder>
    </Layout>
  );
}

export default Refund;
