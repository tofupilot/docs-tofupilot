export const pricingData = [
  { level: 1, runsPerMonth: 2000, annualPrice: 5000 },
  { level: 2, runsPerMonth: 5000, annualPrice: 9300 },
  { level: 3, runsPerMonth: 10000, annualPrice: 14900 },
  { level: 4, runsPerMonth: 15000, annualPrice: 19600 },
  { level: 5, runsPerMonth: 20000, annualPrice: 23900 },
  { level: 6, runsPerMonth: 25000, annualPrice: 27800 },
  { level: 7, runsPerMonth: 30000, annualPrice: 31400 },
  { level: 8, runsPerMonth: 40000, annualPrice: 38300 },
  { level: 9, runsPerMonth: 50000, annualPrice: 44600 },
  { level: 10, runsPerMonth: 75000, annualPrice: 58700 },
  { level: 11, runsPerMonth: 100000, annualPrice: 71400 },
]

const formatRuns = (runs: number): string => {
  if (typeof runs !== 'number' || isNaN(runs)) {
    return '0'
  }
  return runs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

const formatAttachmentSize = (sizeInGB: number): string =>
  sizeInGB >= 1000 ? `${sizeInGB / 1000} TB` : `${sizeInGB} GB`

const formatPrice = (price: number): string => {
  return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

export function TablePricing() {
  return (
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Runs per Month</th>
          <th>Monthly Plan</th>
          <th>Annual Plan (-20%)</th>
          <th>Cost of Run</th>
        </tr>
      </thead>
      <tbody>
        {pricingData.map((data, index) => {
          const monthlyPriceWithIncrease = (data.annualPrice / 12) * 1.2
          // const attachmentSize = (data.runsPerMonth * 4) / 1000 // Convert to GB
          return (
            <tr key={index}>
              <td>{data.level}</td>
              <td>{formatRuns(data.runsPerMonth)}</td>
              <td>€{formatPrice(monthlyPriceWithIncrease)}</td>
              <td>€{formatPrice(data.annualPrice)}</td>
              <td>€{(data.annualPrice / 12 / data.runsPerMonth).toFixed(2)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
