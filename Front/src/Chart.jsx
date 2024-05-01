import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App({ database }) {
	const [abime, setAbime] = useState(0);
	const [mauvais, setMauvais] = useState(0);
	const [bon, setBon] = useState(0);
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
	const data = {
		labels: ["Abimé", "Mauvais", "Bon"],
		datasets: [
			{
				data: [abime, mauvais, bon],
				backgroundColor: [
					"rgba(255, 99, 132, 0.5)",
					"rgba(54, 162, 235, 0.5)",
					"rgba(255, 206, 86, 0.5)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
			},
		],
	};
	// const options = {
	//     plugins: {
	//       legend: {
	//         display: true,
	//       },
	//       tooltip: {
	//         callbacks: {
	//           label: function (tooltipItem, data) {
	//             const dataset = data.datasets[tooltipItem.datasetIndex];
	//             const currentValue = dataset.data[tooltipItem.index];
	//             return `${data.labels[tooltipItem.index]}: ${currentValue}`;
	//           },
	//         },
	//       },
	//     },
	//   };

	return <Doughnut data={data} />;
}
