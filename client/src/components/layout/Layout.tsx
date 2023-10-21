import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import TasksList from "../../pages/tasks/TasksList";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}></Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: "10px 0", background: colorBgContainer }}>
          <Content style={{ padding: "0 10px" }}>
            <TasksList />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default MainLayout;
