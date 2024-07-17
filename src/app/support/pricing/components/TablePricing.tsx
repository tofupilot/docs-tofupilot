export const pricingData = [
  { level: 1, runsPerMonth: 2000, annualPrice: 4200 },
  { level: 2, runsPerMonth: 5000, annualPrice: 7800 },
  { level: 3, runsPerMonth: 10000, annualPrice: 12480 },
  { level: 4, runsPerMonth: 15000, annualPrice: 16500 },
  { level: 5, runsPerMonth: 20000, annualPrice: 20040 },
  { level: 6, runsPerMonth: 25000, annualPrice: 23340 },
  { level: 7, runsPerMonth: 30000, annualPrice: 26400 },
  { level: 8, runsPerMonth: 40000, annualPrice: 32160 },
  { level: 9, runsPerMonth: 50000, annualPrice: 37440 },
  { level: 10, runsPerMonth: 75000, annualPrice: 49320 },
  { level: 11, runsPerMonth: 100000, annualPrice: 60000 },
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
          <th>Monthly Runs</th>
          <th>Monthly Attachment Limit</th>
          <th>Monthly Price</th>
          <th>Annual Price (-20%)</th>
          <th>Price per Run</th>
        </tr>
      </thead>
      <tbody>
        {pricingData.map((data, index) => {
          const monthlyPriceWithIncrease = (data.annualPrice / 12) * 1.2
          const attachmentSize = (data.runsPerMonth * 4) / 1000 // Convert to GB
          return (
            <tr key={index}>
              <td>{data.level}</td>
              <td>{formatRuns(data.runsPerMonth)}</td>
              <td>{formatAttachmentSize(attachmentSize)}</td>
              <td>€{formatPrice(monthlyPriceWithIncrease)}</td>
              <td>€{formatPrice(data.annualPrice)}</td>
              <td>€{(data.annualPrice / data.runsPerMonth).toFixed(2)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
