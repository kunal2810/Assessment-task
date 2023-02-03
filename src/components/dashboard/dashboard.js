import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const API_URL = "https://api.themoviedb.org/3/movie/popular"
const API_KEY = "8f54ff7b11774fec58f61e97aa76bf01"

export default function BasicTable() {

    const [apiData, setApiData] = useState([])

    const userCredential = useSelector((state) => state.saveCredentialReducer);

    const navigate = useNavigate();

    useEffect(() => {
        if(!userCredential.email && !userCredential.password){
            navigate('/');
          }else {
            fetch(`${API_URL}?api_key=${API_KEY}&page=1`)
            .then((res) => res.json())
            .then((jsonRes) => {setApiData(jsonRes.results) })
          }
    },[userCredential.email, userCredential.password, navigate])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Poster</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((moviesData) => (
            <TableRow
              key={moviesData.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {moviesData.title}
              </TableCell>
              <TableCell><img alt="Remy Sharp" height="100px" src={`https://image.tmdb.org/t/p/w500${moviesData.poster_path}`} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}