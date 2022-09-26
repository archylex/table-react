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
  const [sortBy, setSortBy] = React.useState(0);
  const [sortAsc, setSortAsc] = React.useState(true);

  // универсальный запрос
  const getData = (_page, _sort, _order, _search, _column, _condition) => {
    const test = {
      Дата: '_date',
      Название: '_name',
      Количество: '_count',
      Расстояние: '_distance',
    };

    const test2 = { равно: 'equals', содержит: 'contains', больше: 'more', меньше: 'less' };

    const order = _order ? 'asc' : 'desc';
    const sorting = _sort ? `&sort=${test[_sort]}&order=${order}` : '';
    const filtering =
      _search && _search.length > 0
        ? `&search=${_search}&column=${test[_column]}&condition=${test2[_condition]}`
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
        setCurrentPage(_page);
      });
  };

  const onClickSortBy = (s) => {
    if (sortBy === s) {
      setSortAsc(!sortAsc);
    }
    setSortBy(s);
  };

  React.useEffect(() => {
    axios.get('https://632ca2eb5568d3cad889f40f.mockapi.io/columns').then((res) => {
      setColumns(res.data);
      setCurrentColumn(res.data[0]);
    });

    axios.get('https://632ca2eb5568d3cad889f40f.mockapi.io/conditions').then((res) => {
      setConditions(res.data);
      setCurrentCondition(res.data[0]);
    });

    getData(1);
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
