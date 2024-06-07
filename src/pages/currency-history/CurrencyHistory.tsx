import DatePicker from "components/DatePicker";
import useApi from "hooks/useApi";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { epoChToYYYYMMDD, modifyDays } from "utils/dateUtils";
import { CurrencyData } from "types/api/CurrencyData";
import {RouterContext} from "routing/RouterContext";
import CurrencyHistoryTable from "pages/currency-history/CurrencyHistoryTable";

const CurrencyHistory = () => {

  const {currency, date} = useContext(RouterContext);
  
  const [selectedDate, setSelectedDate] = useState<number>(
    date ? Number.parseInt(date) : new Date().getTime()
  );
  const [pastDays, setPastDays] = useState<number>(2);

  const { data, error, loading, fetchApiData } = useApi<CurrencyData[]>();


  // remove other currencies
  // remove duplicate broj_tecajnice by keeping the 1st with same number
  const currencyData = useMemo(() => {
    const singleCurrency = data && data.filter(row => row.valuta === currency);
    
    const reducer = (accumulator: CurrencyData[], currentItem: CurrencyData) => {
      // data is ordered so it matches last or none
      const matchesLast = accumulator[accumulator.length-1]?.broj_tecajnice === currentItem.broj_tecajnice;
      if (!matchesLast) {
          return [...accumulator, currentItem];
      }
      return accumulator;
    };

    const singleBrTecajnice = singleCurrency?.reduce(reducer,[]);
    return singleBrTecajnice?.reverse();
  }, [data, currency]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setPastDays(newValue);
  };

  useEffect(()=>{
    const startDate = epoChToYYYYMMDD(modifyDays(selectedDate, -pastDays));
    const endDate = epoChToYYYYMMDD(selectedDate);
    
    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchApiData(`?datum-primjene-od=${startDate}&datum-primjene-do=${endDate}`);
    }, 500);

    return () => clearTimeout(timeoutId);

  },[selectedDate, pastDays]);


  return (
    <div>
      <p>Prikaz tečaja HNB-a za <b>{currency}</b></p>
      <DatePicker 
        onDateSelected={setSelectedDate} 
        date={selectedDate}
        disabled={!!date}
      />
      <div>
        <p>Posljednjih <b>{pastDays}</b>
          <br/> 
          dana
          <br/>
          <input onChange={handleChange} value={pastDays} type="range" min="2" max="60" /> 
        </p>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {currencyData && <CurrencyHistoryTable data={currencyData} />}
    </div>
  );
}

export default CurrencyHistory;