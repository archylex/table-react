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
  const [currentColumn, setCurrentColumn] = React.useState('Дата');
  const [currentCondition, setCurrentCondition] = React.useState('равно');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [sortBy, setSortBy] = React.useState(0);
  const [sortAsc, setSortAsc] = React.useState(true);

  // универсальный запрос
  const getData = (_page, _sort, _order, _search, _column, _condition) => {
    const order = _order ? 'asc' : 'desc';
    const sorting = _sort ? `&sort=${columns[_sort]}&order=${order}` : '';
    const filtering =
      _search && _search.length > 0
        ? `&search=${_search}&column=${columns[_column]}&condition=${conditions[_condition]}`
        : '';

    let url = `https://api-table.herokuapp.com/getdata/?page=${_page}${sorting}${filtering}`;

    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setData(res.data.data);
        setNumPages(res.data.pages);
      });
  };

  const onClickSortBy = (s) => {
    if (sortBy === s) {
      setSortAsc(!sortAsc);
    }
    setSortBy(s);
  };

  React.useEffect(() => {
    axios
      .get('https://api-table.herokuapp.com/getcolumns', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setColumns(res.data);
        setCurrentColumn(Object.keys(res.data)[0]);
      });

    axios
      .get('https://api-table.herokuapp.com/getconditions', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setConditions(res.data);
        setCurrentCondition(Object.keys(res.data)[0]);
      });

    setCurrentPage(1);
  }, []);

  React.useEffect(() => {
    getData(currentPage, sortBy, sortAsc, searchValue, currentColumn, currentCondition);
  }, [sortBy, sortAsc, searchValue, currentPage]);

  return (
    <div className="App">
      <div className="AppHeader">
        <DropdownMenu name={currentColumn} data={columns} action={setCurrentColumn} />
        <DropdownMenu name={currentCondition} data={conditions} action={setCurrentCondition} />
        <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <Table columns={columns} data={data} action={(s) => onClickSortBy(s)} />

      <Pagination currentPage={currentPage} numPages={numPages} action={(n) => setCurrentPage(n)} />
    </div>
  );
}

export default App;
