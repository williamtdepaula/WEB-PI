import { FC, useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import './style.css'

interface DatePickerBRProps {
    title: string;
    onSelectDate: (timestamp: string) => void;
}

const DatePickerBR: FC<DatePickerBRProps> = ({ title, onSelectDate }) => {

    const [dateSelected, setDateSelected] = useState<Date>(new Date())

    useEffect(() => {
        treatDate()
    }, [dateSelected])

    function treatDate(){
        let day = dateSelected.getDate(); //Date of the month: 2 in our example
        let month = dateSelected.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        let year = dateSelected.getFullYear() //Year: 2013

        let dayTreated = day < 10 ? `0${day}` : day
        let monthTreated = month < 10 ? `0${month}` : month

        onSelectDate(`${year}-${monthTreated}-${dayTreated}`)
    }

    return (
        <div className='DatePickerContainer'>
            {title}
            <DatePicker
                locale='pt-br'
                className='InputDatePicker'
                onChange={setDateSelected}
                value={dateSelected}
            />
        </div>
    )
}
export default DatePickerBR