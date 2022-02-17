import React, { useState, useEffect } from 'react';
import Typography from '../Typography/Typography';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const JugarPartido = (props) => {
  const [partido, setPartido] = useState(props.location.state.partido);

  useEffect(() => {
    setearPartidoActual();
  }, []);

  const setearPartidoActual = () => {
    let partidoActual = { ...partido };
    partidoActual.puntosGameActualLocal = 0;
    partidoActual.cantidadGamesLocal = 0;
    partidoActual.puntosGameActualVisitante = 0;
    partidoActual.cantidadGamesVisitante = 0;
    setPartido(partidoActual);
  };

  const sumarPunto = (jugador) => {
    let partidoActual = { ...partido };
    switch (jugador) {
      case 'Local':
        partidoActual.puntosGameActualLocal++;
        break;
      case 'Visitante':
        partidoActual.puntosGameActualVisitante++;
        break;
      default:
        break;
    }
    setPartido(partidoActual);
  };

  return (
    <>
      <Typography>Jugar Partido</Typography>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Jugadores</th>
            <th>Puntos</th>
            <th>Games</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{partido.jugadorLocal.nombre}</td>
            <td>{partido.puntosGameActualLocal}</td>
            <td>{partido.cantidadGamesLocal}</td>
            <td>
              <Button variant="success" onClick={() => sumarPunto('Local')}>
                Sumar punto
              </Button>
            </td>
          </tr>
          <tr>
            <td>{partido.jugadorVisitante.nombre}</td>
            <td>{partido.puntosGameActualVisitante}</td>
            <td>{partido.cantidadGamesLocal}</td>
            <td>
              <Button variant="success" onClick={() => sumarPunto('Visitante')}>
                Sumar punto
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default JugarPartido;
