import FuulCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interationPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import './Calendar.css'
import useCalendar from '../../store/Calendar'
import { createEventId } from '../../data'
const Calendar = () => {
    const {currentEvents, setCurrentEvents} = useCalendar()

    const handleEvents = async (events) => {
        await Promise.resolve(setCurrentEvents(events))
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Por favor ingrese un título para el evento')
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if(title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.start,
                end: selectInfo.end,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo) => {
        if(
            confirm('Estás segura de que quieres eliminar este evento?')
        ){
            clickInfo.event.remove()
        }
    }

    return(
        <div className="calendar-container">
            <div>
                <FuulCalendar
                    plugins={[dayGridPlugin,interationPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right:  'dayGridMonth, timeGridWeek, timeGridDay'
                    }}

                    allDaySlot={false}
                    initialView= 'timeGridWeek'
                    slotDuration={"01:00:00"}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    nowIndicator= {true}
                    initialEvents={currentEvents}
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    )
}

export default Calendar;