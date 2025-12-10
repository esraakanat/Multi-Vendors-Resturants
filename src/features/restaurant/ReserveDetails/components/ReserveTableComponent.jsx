import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import reserveTableImg from "@/assets/restaurant-assets/Reserve-assets/Reserve  a table.png"
import multipleTablesImg from "@/assets/restaurant-assets/Reserve-assets/Multy tables.png"
import reserveRestaurantImg from "@/assets/restaurant-assets/Reserve-assets/Reserve all  restaurant.png"
import reserveEventImg from "@/assets/restaurant-assets/Reserve-assets/Reserve  for Event.png"
import { useEventTypes } from "@/features/restaurant/ReserveDetails/services/queryEventTypes"

const reservationOptions = [
  { id: "single", title: "Reserve a table", image: reserveTableImg },
  { id: "multiple", title: "Reserve multiple tables", image: multipleTablesImg },
  { id: "all", title: "Reserve all restaurant", image: reserveRestaurantImg },
  { id: "event", title: "Reserve for Event", image: reserveEventImg },
]

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour <= 23; hour++) {
    for (let minute of [0, 30]) {
      slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

function ReserveTableComponent() {
  const { toast } = useToast()
  const { data: eventTypesData, isLoading: isLoadingEventTypes } = useEventTypes()
  const [selectedType, setSelectedType] = useState(reservationOptions[0].id)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [timeTo, setTimeTo] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [tablesCount, setTablesCount] = useState("")
  const [eventType, setEventType] = useState("")
  const [decoration, setDecoration] = useState("")
  const [notes, setNotes] = useState("")
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isTimeFromOpen, setIsTimeFromOpen] = useState(false)
  const [isTimeToOpen, setIsTimeToOpen] = useState(false)
  const [isTablesOpen, setIsTablesOpen] = useState(false)
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false)
  const [isDecorationOpen, setIsDecorationOpen] = useState(false)

  const timePopoverRef = useRef(null)
  const timeButtonRef = useRef(null)
  const timeFromPopoverRef = useRef(null)
  const timeFromButtonRef = useRef(null)
  const timeToPopoverRef = useRef(null)
  const timeToButtonRef = useRef(null)
  const tablesPopoverRef = useRef(null)
  const tablesButtonRef = useRef(null)
  const eventTypePopoverRef = useRef(null)
  const eventTypeButtonRef = useRef(null)
  const decorationPopoverRef = useRef(null)
  const decorationButtonRef = useRef(null)

  const tableOptions = [
    { value: "2", label: "2 tables" },
    { value: "3", label: "3 tables" },
    { value: "4", label: "4 tables" },
    { value: "5", label: "5 tables" },
  ]

  // Use API data or fallback to empty array
  const eventTypeOptions = eventTypesData || []

  const decorationOptions = [
    { value: "wedding", label: "Wedding décor" },
    { value: "birthday", label: "Birthday décor" },
    { value: "graduation", label: "Graduation décor" },
    { value: "galaxy", label: "Galaxy décor" },
    { value: "oldeurope", label: "Old Europe décor" },
    { value: "others", label: "Others" },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isTimeOpen &&
        timePopoverRef.current &&
        !timePopoverRef.current.contains(event.target) &&
        !timeButtonRef.current?.contains(event.target)
      ) {
        setIsTimeOpen(false)
      }
      if (
        isTimeFromOpen &&
        timeFromPopoverRef.current &&
        !timeFromPopoverRef.current.contains(event.target) &&
        !timeFromButtonRef.current?.contains(event.target)
      ) {
        setIsTimeFromOpen(false)
      }
      if (
        isTimeToOpen &&
        timeToPopoverRef.current &&
        !timeToPopoverRef.current.contains(event.target) &&
        !timeToButtonRef.current?.contains(event.target)
      ) {
        setIsTimeToOpen(false)
      }
      if (
        isTablesOpen &&
        tablesPopoverRef.current &&
        !tablesPopoverRef.current.contains(event.target) &&
        !tablesButtonRef.current?.contains(event.target)
      ) {
        setIsTablesOpen(false)
      }
      if (
        isEventTypeOpen &&
        eventTypePopoverRef.current &&
        !eventTypePopoverRef.current.contains(event.target) &&
        !eventTypeButtonRef.current?.contains(event.target)
      ) {
        setIsEventTypeOpen(false)
      }
      if (
        isDecorationOpen &&
        decorationPopoverRef.current &&
        !decorationPopoverRef.current.contains(event.target) &&
        !decorationButtonRef.current?.contains(event.target)
      ) {
        setIsDecorationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isTimeOpen, isTimeFromOpen, isTimeToOpen, isTablesOpen, isEventTypeOpen, isDecorationOpen])

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    : ""
  
  const hasValidTime = (selectedType === "all" || selectedType === "event")
    ? (timeFrom !== "" && timeTo !== "") 
    : selectedTime !== ""
  
  const isFormValid = selectedDate && hasValidTime && Number(guestCount) > 0 && 
    (selectedType !== "multiple" || tablesCount !== "") &&
    (selectedType !== "event" || (eventType !== "" && decoration !== ""))

  const handleReserve = () => {
    if (!isFormValid) return
    const tablesInfo = selectedType === "multiple" ? ` with ${tablesCount}` : ""
    const timeInfo = (selectedType === "all" || selectedType === "event") ? `from ${timeFrom} to ${timeTo}` : `at ${selectedTime}`
    const eventInfo = selectedType === "event" ? ` (${eventType}, ${decoration})` : ""
    toast({
      title: "Reservation Confirmed",
      description: `You reserved ${selectedType === "single" ? "a table" : selectedType === "multiple" ? "multiple tables" : selectedType === "all" ? "all restaurant" : "for event"} on ${formattedDate} ${timeInfo} for ${guestCount} guests${tablesInfo}${eventInfo}.`,
      className: "bg-[#00A97F] text-white border-none",
    })
    setGuestCount("")
    setTablesCount("")
    setTimeFrom("")
    setTimeTo("")
    setSelectedTime("")
    setEventType("")
    setDecoration("")
    setNotes("")
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <section className="bg-white w-full pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-heading font-bold text-[#EC2323] ">
            Reserve <span className="text-[#272727]">Details</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reservationOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setSelectedType(option.id)
                if (option.id !== "multiple") {
                  setTablesCount("")
                }
                if (option.id !== "event") {
                  setEventType("")
                  setDecoration("")
                }
                if (option.id === "all" || option.id === "event") {
                  setSelectedTime("")
                } else {
                  setTimeFrom("")
                  setTimeTo("")
                }
              }}
              className={`rounded-md border-2 p-6 text-center transition-all ${
                option.id === selectedType ? "border-[#EC2323] shadow-lg" : "border-transparent shadow-sm"
              }`}
            >
              <p className="mb-4 text-base font-semibold text-[#272727]">{option.title}</p>
              <img src={option.image} alt={option.title} className="mx-auto h-28 w-28 object-contain" />
            </button>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:w-11/12 ">
          <div className="space-y-8">
            <div className="flex flex-row items-center gap-6 ">
              <span className="text-base font-semibold text-[#272727]  w-32 shrink-0">Booking date</span>
              <Popover
                open={isDateOpen}
                onOpenChange={(open) => {
                  setIsDateOpen(open)
                  if (open) setIsTimeOpen(false)
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-48 justify-start rounded-lg border-none shadow-lg bg-white px-4 py-3 text-left text-sm font-medium text-[#272727] hover:bg-[#F0F0F0]"
                  >
                    {formattedDate || "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      if (date) {
                        setIsDateOpen(false)
                      }
                    }}
                    showOutsideDays
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-row items-center gap-6">
              <span className="text-base font-semibold text-[#272727] w-32 shrink-0">Booking Time</span>
              
              {(selectedType === "all" || selectedType === "event") ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#272727]">From</span>
                  <div className="relative" ref={timeFromButtonRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTimeFromOpen((prev) => !prev)
                        setIsTimeToOpen(false)
                        setIsDateOpen(false)
                      }}
                      className="w-16 rounded-lg border-none shadow-md bg-white px-3 py-3 text-center text-sm font-medium text-[#A6A6A6]"
                    >
                      {timeFrom || "10:00"}
                    </button>
                    {isTimeFromOpen && (
                      <div
                        ref={timeFromPopoverRef}
                        className="absolute z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
                      >
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => {
                                setTimeFrom(slot)
                                setIsTimeFromOpen(false)
                              }}
                              className={`rounded-lg py-2 text-xs font-medium ${
                                timeFrom === slot
                                  ? "bg-[#EC2323] text-white"
                                  : "bg-[#F5F5F5] text-[#272727] hover:bg-[#FFECEC]"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <span className="text-sm font-medium text-[#272727]">To</span>
                  <div className="relative" ref={timeToButtonRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTimeToOpen((prev) => !prev)
                        setIsTimeFromOpen(false)
                        setIsDateOpen(false)
                      }}
                      className="w-16 rounded-lg border-none shadow-md bg-white px-3 py-3 text-center text-sm font-medium text-[#A6A6A6]"
                    >
                      {timeTo || "16:00"}
                    </button>
                    {isTimeToOpen && (
                      <div
                        ref={timeToPopoverRef}
                        className="absolute z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
                      >
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => {
                                setTimeTo(slot)
                                setIsTimeToOpen(false)
                              }}
                              className={`rounded-lg py-2 text-xs font-medium ${
                                timeTo === slot
                                  ? "bg-[#EC2323] text-white"
                                  : "bg-[#F5F5F5] text-[#272727] hover:bg-[#FFECEC]"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative w-48" ref={timeButtonRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTimeOpen((prev) => !prev)
                      setIsDateOpen(false)
                    }}
                    className="w-full rounded-lg border-none shadow-md bg-white px-4 py-3 text-left text-sm font-medium text-[#272727]"
                  >
                    {selectedTime || "Select Time"}
                  </button>
                  {isTimeOpen && (
                    <div
                      ref={timePopoverRef}
                      className="absolute z-20 mt-2 max-h-64 w-80 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
                    >
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => {
                              setSelectedTime(slot)
                              setIsTimeOpen(false)
                            }}
                            className={`rounded-lg py-2 text-sm font-medium ${
                              selectedTime === slot
                                ? "bg-[#EC2323] text-white"
                                : "bg-[#F5F5F5] text-[#272727] hover:bg-[#FFECEC]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedType === "multiple" && (
              <div className="flex flex-row items-center gap-6">
                <span className="text-base font-semibold text-[#272727] w-32 shrink-0">Tables number</span>
                <div className="relative w-48" ref={tablesButtonRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTablesOpen((prev) => !prev)
                      setIsDateOpen(false)
                      setIsTimeOpen(false)
                    }}
                    className="w-full rounded-lg border-none shadow-md bg-white px-4 py-3 text-left text-sm font-medium text-[#272727] flex items-center justify-between"
                  >
                    <span>{tablesCount || "Select Number"}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isTablesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTablesOpen && (
                    <div
                      ref={tablesPopoverRef}
                      className="absolute z-20 mt-2 w-full overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-xl"
                    >
                      {tableOptions.map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          onClick={() => {
                            setTablesCount(option.label)
                            setIsTablesOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#FFECEC] ${
                            tablesCount === option.label
                              ? "bg-[#EC2323] text-white hover:bg-[#d02323]"
                              : "text-[#272727]"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedType === "event" && (
              <>
                <div className="flex flex-row items-center gap-6">
                  <span className="text-base font-semibold text-[#272727] w-32 shrink-0">Type of event</span>
                  <div className="relative w-48" ref={eventTypeButtonRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEventTypeOpen((prev) => !prev)
                        setIsDecorationOpen(false)
                        setIsDateOpen(false)
                      }}
                      className="w-full rounded-lg border-none shadow-md bg-white px-4 py-3 text-left text-sm font-medium text-[#272727] flex items-center justify-between"
                    >
                      <span>{eventType || "Select Event"}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isEventTypeOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isEventTypeOpen && (
                      <div
                        ref={eventTypePopoverRef}
                        className="absolute z-20 mt-2 w-full overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-xl max-h-60"
                      >
                        {isLoadingEventTypes ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            Loading...
                          </div>
                        ) : eventTypeOptions.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            No event types available
                          </div>
                        ) : (
                          eventTypeOptions.map((option) => (
                            <button
                              type="button"
                              key={option.value || option.id}
                              onClick={() => {
                                setEventType(option.label)
                                setIsEventTypeOpen(false)
                              }}
                              className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#FFECEC] ${
                                eventType === option.label
                                  ? "bg-[#EC2323] text-white hover:bg-[#d02323]"
                                  : "text-[#272727]"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row items-center gap-6">
                  <span className="text-base font-semibold text-[#272727] w-32 shrink-0">Decoration</span>
                  <div className="relative w-48" ref={decorationButtonRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDecorationOpen((prev) => !prev)
                        setIsEventTypeOpen(false)
                        setIsDateOpen(false)
                      }}
                      className="w-full rounded-lg border-none shadow-md bg-white px-4 py-3 text-left text-sm font-medium text-[#272727] flex items-center justify-between"
                    >
                      <span>{decoration || "Select decoration"}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isDecorationOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isDecorationOpen && (
                      <div
                        ref={decorationPopoverRef}
                        className="absolute z-20 mt-2 w-full overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-xl"
                      >
                        {decorationOptions.map((option) => (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => {
                              setDecoration(option.label)
                              setIsDecorationOpen(false)
                            }}
                            className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#FFECEC] ${
                              decoration === option.label
                                ? "bg-[#EC2323] text-white hover:bg-[#d02323]"
                                : "text-[#272727]"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-row items-center gap-6">
              <span className="text-base font-semibold text-[#272727] w-32 shrink-0">Guests</span>
              <Input
                type="number"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Enter number"
                className="w-48 rounded-lg border-none shadow-md bg-white px-4 py-5 text-sm font-medium text-[#272727]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-base font-semibold text-[#272727]">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter your notes, important details or special request"
              className="min-h-[180px] w-full rounded-lg border-none shadow-lg bg-white px-4 py-4 text-sm text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#EC2323]/30"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="button"
            onClick={handleReserve}
            disabled={!isFormValid}
            className={`w-full max-w-sm rounded-xl py-5 text-base font-semibold ${
              isFormValid ? "bg-[#EC2323] hover:bg-[#d02323] text-white" : "bg-[#BDBDBD] text-white"
            }`}
          >
            Reserve Now
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ReserveTableComponent

