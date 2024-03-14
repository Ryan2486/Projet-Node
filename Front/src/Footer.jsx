import { useEffect, useState } from "react";
import { Typography, Flex } from "antd";

function App({ database }) {
	const [abime, setAbime] = useState(0);
	const [mauvais, setMauvais] = useState(0);
	const [bon, setBon] = useState(0);
	const { Text } = Typography;
	useEffect(() => {
		if (database !== null) {
			setAbime((prevState) => 0);

			setMauvais((prevState) => 0);

			setBon((prevState) => 0);

			database.forEach((item) => {
				if (item.Etat === "Abimé") {
					setAbime((prevState) => prevState + item.Qte);
				} else if (item.Etat === "Mauvais") {
					setMauvais((prevState) => prevState + item.Qte);
				} else if (item.Etat === "Bon") {
					setBon((prevState) => prevState + item.Qte);
				}
			});
		}
	}, [database]);
	return (
		<Flex vertical align="center">
			<Text italic>Nombre de Materiel :</Text>
			<Text italic>Bon : {bon}</Text>
			<Text italic>Mauvais : {mauvais}</Text>
			<Text italic>Abimé : {abime}</Text>
		</Flex>
	);
}

export default App;
