import React from "react";
import Layout from "../../../components/layout/Layout";
import Otp_holder from "../components/Otp_holder";

function OtpLogs() {
  return (
    <Layout activeRoute="/otp-logs" title="لاگ کدهای ورود یکبار مصرف">
      <Otp_holder />
    </Layout>
  );
}

export default OtpLogs;
