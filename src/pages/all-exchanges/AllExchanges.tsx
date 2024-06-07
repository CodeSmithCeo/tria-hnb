import DatePicker from "components/DatePicker";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { epoChToYYYYMMDD } from "utils/dateUtils";
import CurrencyTable from "./CurrenciesTable";
import { CurrencyData } from "types/api/CurrencyData";

const AllExchanges = () => {

  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getTime()
  );

  const { data, error, loading, fetchApiData } = useApi<CurrencyData[]>();

  useEffect(()=>{
    fetchApiData(`?datum-primjene=${epoChToYYYYMMDD(selectedDate)}`);
  },[selectedDate]);

  return (
    <div>
      <p>Prikaz tečaja HNB-a na dan:</p>
      <DatePicker 
        onDateSelected={setSelectedDate} 
        date={selectedDate}  
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <>
        <p>Broj tečajnice: {data[0].broj_tecajnice}</p>
        <CurrencyTable data={data} date={selectedDate}/>
      </>}
    </div>
  );
}

export default AllExchanges;