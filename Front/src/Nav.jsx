import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

function Nav() {
	function getItem(label, key, icon, children) {
	    return {
	      key,
	      icon,
	      children,
	      label,
	    };
	  }
	  const items = [
		getItem('Materiel', 'sub1',<AppstoreOutlined />,[
			      getItem("Stock","1"),
			    ]),
	  ];
	return (
		// <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
		<Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
		style={{ borderRadius: "12px" }}
      />
		// <Menu
		// 	theme="dark"
		// 	mode="inline"
		// 	style={{ borderRadius: "12px" }}>
		// 	<Menu.Item
		// 		key="1"
		// 		icon={<BarChartOutlined />}
		// 		style={{ borderRadius: "10px" }}>
		// 		<Link to="/">Tableau de bord</Link>
		// 	</Menu.Item>
		// 	<Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="Consommable">
		// 		<Menu.Item key="2">
		// 			<Link to="/Stock">Stock</Link>
		// 		</Menu.Item>
		// 		<Menu.Item key="3">Surveiller</Menu.Item>
		// 		<Menu.Item key="4">
		// 			<Link to="/Entree">Entrée</Link>
		// 		</Menu.Item>
		// 		<Menu.Item key="5">
		// 			<Link to="/Sortie">Sortie</Link>
		// 		</Menu.Item>
		// 	</Menu.SubMenu>
		// </Menu>
	);
}

export default Nav;
