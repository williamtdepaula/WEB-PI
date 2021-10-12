import { FC, useEffect, useState } from "react";
import './style.css'

interface DatePickerBRProps {
    title: string;
    onSelectDate: (timestamp: string) => void;
}

const DatePicker: FC<DatePickerBRProps> = ({ title, onSelectDate }) => {

    const [dateSelected, setDateSelected] = useState<string>('1990-01-01')

    useEffect(() => {
        onSelectDate(treatDate(dateSelected))
    }, [dateSelected])

    function treatDate(date: string) {
        let dateAsDate = new Date(date)
        dateAsDate.setUTCHours(3)

        let day = dateAsDate.getDate();
        let month = dateAsDate.getMonth() + 1; 
        let year = dateAsDate.getFullYear() 

        let dayTreated = day < 10 ? `0${day}` : day
        let monthTreated = month < 10 ? `0${month}` : month

        return `${year}-${monthTreated}-${dayTreated}`
    }

    return (
        <div className='DatePickerContainer'>
            {title}

            <input
                value={dateSelected}
                type='date'
                onChange={(v) => setDateSelected(v.target.value)}
                className={"InputDatePicker"}
            />
        </div>
    )
}
export default DatePicker