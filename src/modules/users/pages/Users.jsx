import React from "react";
import Layout from "../../../components/layout/Layout";
import User_holder from "../components/User_holder";

function Users() {
  return (
    <Layout activeRoute="/users" title="مدیریت کاربران">
      <User_holder />
    </Layout>
  );
}

export default Users;
