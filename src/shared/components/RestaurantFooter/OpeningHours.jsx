import arrowIcon from "@/assets/restaurant-assets/footer/arrow.svg"
import { useWorkingHours } from "@/features/restaurant/home/services/queryWorkingHours"

function OpeningHours({ restaurantSlug = "tempora" }) {
  const { data: workingHours, isLoading, isError } = useWorkingHours(restaurantSlug)

  // Format time from "10:00:00" to "10:00 AM" format
  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    // Handle "10:00:00" format
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})/)
    if (timeMatch) {
      const hours = parseInt(timeMatch[1])
      const minutes = timeMatch[2]
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
      return `${displayHours}:${minutes} ${period}`
    }
    return timeStr.toUpperCase()
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-white font-heading font-bold text-lg mb-6">
        Opening Hours
      </h3>
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-white font-sans text-xs font-light">
            Loading hours...
          </p>
        ) : isError ? (
          <p className="text-white font-sans text-xs font-light">
            Unable to load hours
          </p>
        ) : workingHours && Array.isArray(workingHours) && workingHours.length > 0 ? (
          workingHours.map((schedule, index) => {
            // Use the actual API field names: day, start, end
            const startTime = schedule.start 
            const endTime = schedule.end 
            const dayName = schedule.day 
            const isClosed = schedule.is_off  
            
            return (
              <div key={schedule.id || index} className="flex items-start gap-3">
                <img 
                  src={arrowIcon} 
                  alt="arrow" 
                  className="w-5 h-5 mt-1 flex-shrink-0" 
                />
                <div>
                  {isClosed ? (
                    <p className="text-white font-sans text-xs font-light">
                      CLOSED
                    </p>
                  ) : startTime && endTime ? (
                    <p className="text-white font-sans text-xs font-light">
                      {formatTime(startTime)} TO {formatTime(endTime)}
                    </p>
                  ) : null}
                  {dayName && (
                    <p className="text-white font-sans text-xs font-light">
                      {String(dayName).toUpperCase()}
                    </p>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          // Fallback to default hours if no data
          <>
            <div className="flex items-start gap-3">
              <img 
                src={arrowIcon} 
                alt="arrow" 
                className="w-5 h-5 mt-1 flex-shrink-0" 
              />
              <div>
                <p className="text-white font-sans text-xs font-light">
                  08 AM TO 12 AM
                </p>
                <p className="text-white font-sans text-xs font-light">
                  MONDAY TO FRIDAY
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <img 
                src={arrowIcon} 
                alt="arrow" 
                className="w-5 h-5 mt-1 flex-shrink-0" 
              />
              <div>
                <p className="text-white font-sans text-xs font-light">
                  11 AM TO 10 PM
                </p>
                <p className="text-white font-sans text-xs font-light">
                  SATURDAY & SUNDAY
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OpeningHours

