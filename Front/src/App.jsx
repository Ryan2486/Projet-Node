import { useState } from "react";
import { Layout, theme } from "antd";
import Nav from "./Nav.jsx";
import Materiel from "./Materiel.jsx";


function App() {
	const { Header, Content, Footer, Sider } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				style={{ borderRadius: "12px" }}
				theme="dark"
				>
				<Nav></Nav>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }} />

				<Content style={{ margin: "0 16px" }}>
					<Materiel/>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Gestion de Materiel ©{new Date().getFullYear()} Created by Ryan
				</Footer>
			</Layout>
		</Layout>
	);
}

export default App;
