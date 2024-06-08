import { CurrencyData } from 'types/api/CurrencyData';
import './CurrencyHistoryTable.css';
import { epochToCroatian } from 'utils/dateUtils';

type Props = {
  data: CurrencyData[];
};

type Component = (Props: Props) => JSX.Element;

const CurrencyTable: Component = (props) => {

  const { data } = props;

  const headers = Object.keys(data[0]);


  const cssColoring = (propName:string, index: number, array: CurrencyData[]): string => {
    if (index === array.length-1) return "--same";

    // @ts-ignore
    const stringsToCompare = [array[index][propName], array[index+1][propName]];
    const parsableToCompare = stringsToCompare.map( str => str.replace(",", ".") );
    const numbersToCompare = parsableToCompare.map( str => Number.parseFloat(str) );
    const [thisValue, previousValue] = numbersToCompare;
    
    switch (true) {
      case thisValue > previousValue : return "larger";
      case thisValue < previousValue : return "smaller";
      default: return "same"
    }
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          {headers.map(header => (
            <th className="table__headers" key={header}>
              {header} 
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((currency, index, array) => (
          <tr className="table__row" key={currency.sifra_valute + currency.datum_primjene}>
            <td className="table__cell">{currency.broj_tecajnice}</td>
            <td className="table__cell table__cell table_cell--left">
              {epochToCroatian(new Date(currency.datum_primjene).getTime())}
            </td>
            <td className="table__cell table_cell--left">{currency.drzava}</td>
            <td className="table__cell">{currency.drzava_iso}</td>
            <td className={
              `table__cell table_cell--${cssColoring("kupovni_tecaj", index, array)}
              table__cell table_cell--right`}>
              {currency.kupovni_tecaj}
            </td>
            <td className={
              `table__cell table_cell--${cssColoring("prodajni_tecaj", index, array)}
              table__cell table_cell--right`}>
              {currency.prodajni_tecaj}
            </td>
            <td>{currency.sifra_valute}</td>
            <td className={`
              table__cell table_cell--${cssColoring("srednji_tecaj", index, array)}
              table__cell table_cell--right`}>
              {currency.srednji_tecaj}
            </td>
            <td>{currency.valuta}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;