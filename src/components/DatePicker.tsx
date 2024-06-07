import React, { useRef } from 'react';
import { epochToCroatian, modifyDays } from 'utils/dateUtils';
import "./DatePicker.css";

type Props = {
    onDateSelected: React.Dispatch<React.SetStateAction<number>>
    date: number;
    disabled?: boolean
}
type DatePicker = (props: Props) => JSX.Element;


const DatePicker: DatePicker = (props) => {

    const {
        onDateSelected,
        date,
        disabled = false
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const openDatePicker = () => {
        if (inputRef.current) {
            inputRef.current.showPicker(); // Trigger the native date picker
        }
    };

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const selectedDateEpoch = new Date(date).getTime(); // Convert milliseconds to seconds
    onDateSelected(selectedDateEpoch);
};

    const pickPreviousDay = () => {
        const yesterday = modifyDays(date, -1);
        onDateSelected(yesterday);
    }
    const pickNextDay = () => {
        const tomorrow = modifyDays(date, 1);
        onDateSelected(tomorrow);
    }

    const isFuture = modifyDays(date, 1) > new Date().getTime();

    if (disabled) return (
        <p><b>{epochToCroatian(date)}</b></p>
    )
    else return (
        <div className="date-picker">
            <input
                className="date-picker__hidden-input"
                // use the ref of a hidden field
                ref={inputRef}
                type="date"
                // Hide the input field
                style={{ visibility: 'hidden' }}
                onChange={handleDateChange}
            />
            <tr />
            
            <button 
                className="date-picker__button" 
                onClick={pickPreviousDay}
            >
                Previous Day
            </button>
            
            <button
                className="date-picker__button date-picker__button--large"
                onClick={openDatePicker}
            >
                {epochToCroatian(date)}
            </button>

            <button
                disabled={isFuture}
                className={`date-picker__button date-picker__button${isFuture?'--transparent':''}`} 
                onClick={pickNextDay}
            >
                Next Day
            </button>
    
        </div>
    )
};


export default DatePicker;
