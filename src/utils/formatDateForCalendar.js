
const getYYYYMMDD = (dateData) => {
    const date = new Date(dateData)

    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const getCalendarChartData = (rawData) => {

    const datesArray = rawData.map(elm => {
        return (getYYYYMMDD(elm.date))
    })

    const frequencyMap = {}

    datesArray.forEach(date => {
        frequencyMap[date] = (frequencyMap[date] || 0) + 1
    })

    const processedData = []

    for (const property in frequencyMap) {
        processedData.push({
            "value": frequencyMap[property],
            "day": property
        })
    }

    console.log(processedData)

    return (processedData)

}