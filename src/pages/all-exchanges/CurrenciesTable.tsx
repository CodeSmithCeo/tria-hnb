import StyledLink from 'components/link/StyledLink';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { CurrencyData } from 'types/api/CurrencyData';
import "./CurrenciesTable.css"

type Props = {
  data: CurrencyData[];
  date: number;
};

type SortConfig = {
  key: keyof CurrencyData;
  direction: 'asc' | 'desc';
};

type TableCurrencyData = Omit<CurrencyData, "broj_tecajnice"|"datum_primjene">


type Component = (Props: Props) => JSX.Element;

const CurrencyTable: Component = (props) => {

  const { data, date } = props;
  // State for filter values
  const [filters, setFilters] = useState({
    drzava: '',
    drzava_iso: '',
    sifra_valute: '',
    valuta: '',
  });

   const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);


  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

   const handleSortChange = (key: keyof CurrencyData) => {
    if (key !== sortConfig?.key) setSortConfig({ key, direction: 'asc' });
    else if ( sortConfig.direction === 'asc') setSortConfig({ key, direction: 'desc' });
    else setSortConfig({ key, direction: 'asc' });
  };

  // remove that not shown in table so we can render table with map
  const relevantData = useMemo(() => {
    return data.map(({ broj_tecajnice, datum_primjene, ...rest }) => rest);
  }, [data]);

  const filteredData = useMemo(() => {
  return relevantData.filter(currency =>
    (Object.keys(filters) as (keyof typeof filters)[]).every(key =>
      currency[key].toLowerCase().includes(filters[key].toLowerCase())
    )
  );
  }, [filters, relevantData]);


  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a: TableCurrencyData, b: TableCurrencyData) => {
      const { key, direction } = sortConfig;

      // @ts-ignore
      const aValue = a[key];
      // @ts-ignore
      const bValue = b[key];


      const aNum = Number.parseFloat(aValue.replace(',','.'));
      const bNum = Number.parseFloat(bValue.replace(',','.'));
      console.log(aNum, bNum, aValue)
      const isNumeric = !isNaN(aNum) && !isNaN(bNum);

      if (isNumeric) {
        // numeric comparison
        if (aNum < bNum) return direction === 'asc' ? -1 : 1;
        if (aNum > bNum) return direction === 'asc' ? 1 : -1;
        return 0;
      } else {
        // text comparison
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
  },[filteredData, sortConfig]);

  const headers = Object.keys(relevantData[0]);


  return (
    <table className='table'>
      <thead>
        <tr>
          {headers.map(header => (
            // @ts-ignore
            <th className="table__headers" key={header} onClick={() => handleSortChange(header)}>
              {header} {sortConfig?.key === header && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
          ))}
        </tr>
        <tr>
          <th className="table__headers-search">
            <input
              className='table__header-search'
              type="text"
              name="drzava"
              value={filters.drzava}
              onChange={handleFilterChange}
            />
          </th>
          <th className="table__headers-search">
            <input
              className='table__header-search'
              type="text"
              name="drzava_iso"
              value={filters.drzava_iso}
              onChange={handleFilterChange}
            />
          </th>
          <th className="table__headers-search"></th>
          <th className="table__headers-search"></th>
          <th className="table__headers-search">
            <input
              className='table__header-search'
              type="text"
              name="sifra_valute"
              value={filters.sifra_valute}
              onChange={handleFilterChange}
            />
          </th>
          <th className="table__headers-search"></th>
          <th className="table__headers-search">
            <input
              className='table__header-search'
              type="text"
              name="valuta"
              value={filters.valuta}
              onChange={handleFilterChange}
            />
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {sortedData.map(currency => (
          <tr className="table__row" key={currency.sifra_valute}>
            <td className="table__cell table__cell table_cell--left">{currency.drzava}</td>
            <td className="table__cell">{currency.drzava_iso}</td>
            <td className="table__cell table__cell table_cell--right">{currency.kupovni_tecaj}</td>
            <td className="table__cell table__cell table_cell--right">{currency.prodajni_tecaj}</td>
            <td className="table__cell table__cell table_cell--left">{currency.sifra_valute}</td>
            <td className="table__cell table__cell table_cell--right">{currency.srednji_tecaj}</td>
            <td className="table__cell">
              <StyledLink href={`/povijest/${currency.valuta}/${date}`}>
                🔗{currency.valuta}
              </StyledLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;