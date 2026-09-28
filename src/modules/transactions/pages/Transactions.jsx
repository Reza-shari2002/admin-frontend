import React from "react";
import Layout from "../../../components/layout/Layout";
import Transaction_holder from "../components/Transaction_holder";

function Transactions() {
  return (
    <Layout activeRoute="/transactions" title="مدیریت و سوابق تراکنش‌ها">
      <Transaction_holder />
    </Layout>
  );
}

export default Transactions;
