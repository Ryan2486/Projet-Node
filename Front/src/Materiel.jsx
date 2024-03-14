import { useState, useEffect } from "react";
import { Table, Button, Flex, Modal, Descriptions, Form , Alert, notification} from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Form_Modif,Form_Add } from "./Formulaire.jsx";
import Footer from "./Footer.jsx";

import axios from "axios";

function App() {
	const [Materiels, SetMateriel] = useState(null);
	const [Details, setDetail] = useState(false);
	const [Modif, setModif] = useState(false);
	const [Add, setAdd] = useState(false);
	const [form] = Form.useForm();
	const [form2] = Form.useForm();
	// const [api, contextHolder] = notification.useNotification();
	const [SelectItem, SetSelectItem] = useState([
		{
			key: "1",
			label: "N° Materiel",
			children: null,
			name: [null],
			value: null,
		},
		{
			key: "2",
			label: "Designation",
			children: null,
			name: [null],
			value: null,
		},
		{
			key: "3",
			label: "Qte",
			children: null,
			name: [null],
			value: null,
		},
		{
			key: "4",
			label: "Etat",
			children: null,
			name: [null],
			value: null,
		},
	]);

	const fetchData = async () => {
		try {
			const result = await axios.get("http://localhost:8080/api/Materiel/");
			SetMateriel(result.data);
		} catch (error) {
			console.error("Erreur lors de la récupération des données:", error);
		}
	};
	const ModifMat = async (modifiedObject) => {
		try {
			const result = await axios.put("http://localhost:8080/api/Materiel/Modif",modifiedObject);
			fetchData();
		} catch (error) {
			console.error("Erreur lors de la récupération des données:", error);
		}
	};
	const AddMat = async (NewMat) => {
		try {
			const result = await axios.post("http://localhost:8080/api/Materiel/",NewMat);
			NotifSucAdd(NewMat);
			fetchData();
		} catch (error) {
				// Le serveur a répondu avec un code d'erreur
				console.error('Erreur de réponse:', error.response.data.message);
				NotifErrAdd(NewMat,error.response.data.message);
			// console.error("Erreur lors de la récupération des données:", error);
			// NotifErrAdd(NewMat,error);
		}
	};
	const RemoveMat = async (RemMat) => {
		try {
			const result = await axios.put("http://localhost:8080/api/Materiel/del", RemMat);
			fetchData();
		} catch (error) {

			console.error("Erreur lors de la récupération des données:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	const showAdd =()=>{
		setAdd(true);
	}
	const showModal = (Mat, btn) => {
		SetSelectItem([
			{
				key: "1",
				label: "N° Materiel",
				children: Mat.NumMat,
				name: ["NumMat"],
				value: Mat.NumMat,
			},
			{
				key: "2",
				label: "Designation",
				children: Mat.Design,
				name: ["Design"],
				value: Mat.Design,
			},
			{
				key: "3",
				label: "Qte",
				children: Mat.Qte,
				name: ["Qte"],
				value: Mat.Qte,
			},
			{
				key: "4",
				label: "Etat",
				children: Mat.Etat,
				name: ["Etat"],
				value: Mat.Etat,
			},
		]);

		if (btn === "Details") {
			setDetail(true);
		}

		if (btn === "Modif") {
			setModif(true);
		}
	};

	const handleModif = () => {
		form.validateFields()
      .then(() => {
        console.log('Tous les champs sont valides.');
		setModif(false);
		const ModifMatvar= form.getFieldsValue(true);
		console.log(ModifMatvar);
		ModifMat(ModifMatvar);
		NotifSucModif(ModifMatvar);
      })
      .catch((errorInfo) => {
        console.log('Certains champs ne sont pas valides :', errorInfo);
      });
		
	};

	const handleAdd = () => {
		form2.validateFields()
      .then(() => {
        console.log('Tous les champs sont valides.');
		setAdd(false);
		console.log(form2.getFieldsValue(true));
		const NewMat = {
			...form2.getFieldsValue(true),
			Qte: '0'
		  };
		  console.log(NewMat);
		form2.resetFields();
		AddMat(NewMat);
      })
      .catch((errorInfo) => {
        console.log('Certains champs ne sont pas valides :', errorInfo);
      });
		
	};
	const remove = (Mat) => {
		try {
		RemoveMat(Mat);
		NotifSucSupp(Mat);
		} catch (error) {
			
		}
		
	};
	const NotifSucAdd = (NewMat) => {
		notification["success"]({
		  message: 'Ajout réussi',
		  description: "Materiel N° "+NewMat.NumMat+" ajouter avec succès",
		  duration: 3
		});
	  };
	  const NotifSucModif = (ModifMat) => {
		notification["success"]({
		  message: 'Modification réussi',
		  description: "Materiel N° "+ModifMat.NumMat+" modifier avec succès",
		  duration: 3
		});
	  };
	  const NotifSucSupp = (SuppMat) => {
		notification["success"]({
		  message: 'Modification réussi',
		  description: "Materiel N° "+SuppMat.NumMat+" supprimer avec succès",
		  duration: 3
		});
	  };
	  const NotifErrAdd = (NewMat, err) => {
		notification["error"]({
		  message: "Erreur d'insertion",
		  description: "Erreur lors de l'insertion du materiel N° "+NewMat.NumMat+","+err,
		  duration: 3
		});
	  };

	const columns = [
		{
			title: "N° Materiel",
			dataIndex: "NumMat",
			key: "NumMat",
			width: "20%",
		},
		{
			title: "Designation Materiel",
			dataIndex: "Design",
			key: "Design",
			width: "35%",
		},
		{
			title: "Qte",
			dataIndex: "Qte",
			key: "Qte",
			width: "10%",
		},
		{
			title: "Etat",
			dataIndex: "Etat",
			key: "Etat",
			width: "10%",
		},
		{
			title: "Action",
			key: "Action",
			width: "25%",
			render: (record) => (
				<Flex gap="small">
					<Button type="primary" onClick={() => showModal(record, "Modif")}>
						Modifier
					</Button>
					<Button
						danger
						type="primary"
						onClick={() => {
							remove(record);
						}}>
						Supprimer
					</Button>
					<Button onClick={() => showModal(record, "Details")}>Détails</Button>
				</Flex>
			),
		},
	];
	const defaultFooter = () => <Footer database={Materiels}/>;

	return (
		<>
			<Flex justify="flex-end">
				<Button
					onClick={showAdd}
					type="primary"
					style={{
						marginBottom: 5,
						marginRight: 16,
						marginTop: 16,
					}}
					size="large"
					icon={<PlusCircleTwoTone />}>
					Ajouter Materiel
				</Button>
			</Flex>
			<Table
				dataSource={Materiels}
				rowKey="NumMat"
				columns={columns}
				bordered="true"
				size="large"
				footer={defaultFooter}
				
			/>
			
			<Modal
				open={Details}
				onOk={() => {
					setDetail(false);
				}}
				onCancel={() => {
					setDetail(false);
				}}
				width={750}>
				<Descriptions title="Info" items={SelectItem} />
			</Modal>

			<Modal open={Modif} onOk={handleModif} onCancel={ () => {setModif(false);form.resetFields()}} width={750}>
				<Form_Modif form={form} fields={SelectItem} />
			</Modal>
			<Modal open={Add} onOk={(handleAdd)} onCancel={ () => {setAdd(false);form2.resetFields()}} width={750}>
				<Form_Add form={form2} />
			</Modal>
		</>
	);
}

export default App;
