import React, {useState} from "react";
import Typography from "../../components/Typography/Typography";
import {Button} from "react-bootstrap";
import TableJugadores from '../../components/Tables/TableJugadores';
import JugadorModal from "../../components/Modals/JugadorModal";

let jugadoresListMock = [
    {
        "id": 1,
        "nombre": "pepe",
        "puntos": 1000
    },
    {
        "id": 2,
        "nombre": "jose",
        "puntos": 100
    },
    {
        "id": 3,
        "nombre": "saul",
        "puntos": 50
    },
    {
        "id": 4,
        "nombre": "anibal",
        "puntos": 50
    }];

let jugadorInit = {
    nombre: '',
    puntos: 0,
}

const Jugador = (props) => {
    const [jugadoresList, setJugadoresList] = useState(jugadoresListMock);
    const [jugadorData, setJugadorData] = useState(jugadorInit);
    const [isEdit, setIsEdit] = useState(false);
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    // Buttons
    const handleDetail = (data, event) => {
        event.preventDefault();
        props.history.push(`/jugador/detalle/${data.id}`, {data});
    };

    const handleEdit = (editData, event) => {
        event.preventDefault();
        handleOpenModal(true, editData)
    }
    const handleDelete = (id, event) => {
        event.preventDefault();
        if (window.confirm("Estas seguro?")) {
            setJugadoresList(jugadoresList.filter(item => item.id !== id))
        }
    }

    // Modal
    const handleOpenModal = (editarJugador = false, jugadorToEdit = null) => {
        setIsEdit(editarJugador);

        if (editarJugador) {
            setJugadorData(jugadorToEdit)
        }

        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setHasErrorInForm(false);
        setJugadorData(jugadorInit);
        setErrorMsg('');
    }

    // Form
    const handleChangeInputForm = (property, value) => {
        // Si el valor del input es vacío, entonces setea que hay un error
        (value === '') ? setHasErrorInForm(true) : setHasErrorInForm(false);

        setJugadorData({...jugadorData, [property]: value});
    }

    const handleSubmitForm = (e, form, isEdit) => {
        e.preventDefault();
        setHasErrorInForm(true);

        if (form.checkValidity())
            isEdit ? editarJugador(jugadorData.id) : agregarJugador()
    }

    // API
    const agregarJugador = () => {
        let model = {
            ...jugadorData,
            id: jugadoresListMock.length + 1,
        }
        jugadoresListMock.push(model);
        setJugadoresList(jugadoresListMock);
        handleCloseModal()
    };

    const editarJugador = (id) => {
        // Mapea la lista, y verifica por el ID si devuelve el objeto original o el objeto editado
        jugadoresListMock = jugadoresListMock.map(item => (item.id === id) ? jugadorData : item);
        setJugadoresList(jugadoresListMock);
        handleCloseModal()
    }

    return (
        <>
            <Typography id={"title-id"}>Jugador</Typography>
            <div className='mb-2'>
                <Button variant="success" onClick={() => handleOpenModal()}>Agregar jugador</Button>
            </div>
            <TableJugadores
                dataForTable={jugadoresList}
                detail={handleDetail}
                edit={handleEdit}
                delete={(id, event) => handleDelete(id, event)}
            />
            <JugadorModal
                show={openModal}
                onHide={handleCloseModal}
                isEdit={isEdit}
                handleChange={handleChangeInputForm}
                jugador={jugadorData}
                validated={hasErrorInForm}
                handleSubmit={handleSubmitForm}
                errorMsg={errorMsg}
            />
        </>
    )
}

export default Jugador;
