import React from 'react';
import axios from 'axios';

import { DropdownMenu } from './Components/DropdownMenu';
import { SearchField } from './Components/SearchField';
import { Table } from './Components/Table';
import { Pagination } from './Components/Pagination';

import styles from './App.scss';

function App() {
  // бизнес-логика, которую бы сделал в redux
  const [columns, setColumns] = React.useState([]);
  const [conditions, setConditions] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [currentColumn, setCurrentColumn] = React.useState('Колонка');
  const [currentCondition, setCurrentCondition] = React.useState('Условие');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');

  const test = ['_date', '_name', '_count', '_distance'];

  const [sortBy, setSortBy] = React.useState(0);
  const [sortAsc, setSortAsc] = React.useState(true);

  const onClickSortBy = (s) => {
    if (sortBy === s) {
      setSortAsc(!sortAsc);
    }
    setSortBy(s);
  };

  React.useEffect(() => {
    //axios.get('https://632ca2eb5568d3cad889f40f.mockapi.io/datas').then((res) => setData(res.data));
    axios
      .get('https://fierce-gorge-68484.herokuapp.com/getdata?page=1', {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setNumPages(res.data.pages);
      });

    axios.get('https://632ca2eb5568d3cad889f40f.mockapi.io/columns').then((res) => {
      setColumns(res.data);
      setCurrentColumn(res.data[0]);
    });

    axios.get('https://632ca2eb5568d3cad889f40f.mockapi.io/conditions').then((res) => {
      setConditions(res.data);
      setCurrentCondition(res.data[0]);
    });
  }, []);

  React.useEffect(() => {
    const order = sortAsc ? 'asc' : 'desc';
    axios
      .get(
        'https://fierce-gorge-68484.herokuapp.com/getdata?page=' +
          currentPage +
          '?sort=' +
          test[sortBy] +
          '&order=' +
          order,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => {
        setData(res.data.data);
        setNumPages(res.data.pages);
      });
    console.log('sort:', sortBy);
  }, [sortBy, sortAsc]);

  React.useEffect(() => {
    console.log('filter: ', searchValue, currentColumn, currentCondition);
  }, [searchValue]);

  React.useEffect(() => {
    console.log('page: ', currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <div className="AppHeader">
        <DropdownMenu name={currentColumn} data={columns} action={setCurrentColumn} />
        <DropdownMenu name={currentCondition} data={conditions} action={setCurrentCondition} />
        <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <Table columns={columns} data={data} action={(s) => onClickSortBy(s)} />

      <Pagination currentPage={currentPage} numPages={5} action={(n) => setCurrentPage(n)} />
    </div>
  );
}

export default App;
