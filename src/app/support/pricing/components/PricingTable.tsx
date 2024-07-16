import React from 'react'

const pricingData = [
  { level: 1, runsPerMonth: 2500, annualPrice: 399 },
  { level: 2, runsPerMonth: 5000, annualPrice: 699 },
  { level: 3, runsPerMonth: 7500, annualPrice: 899 },
  { level: 4, runsPerMonth: 10000, annualPrice: 1099 },
  { level: 5, runsPerMonth: 25000, annualPrice: 1599 },
  { level: 6, runsPerMonth: 50000, annualPrice: 2499 },
  { level: 7, runsPerMonth: 100000, annualPrice: 3999 },
  { level: 8, runsPerMonth: 200000, annualPrice: 6999 },
  { level: 9, runsPerMonth: 500000, annualPrice: 9999 },
  { level: 10, runsPerMonth: 1000000, annualPrice: 14999 },
]

const formatRuns = (runs: number): string => {
  if (typeof runs !== 'number' || isNaN(runs)) {
    return '0'
  }
  if (runs >= 1000000) {
    return `${(runs / 1000000).toFixed()}M`
  } else if (runs >= 1000) {
    return `${(runs / 1000).toFixed(1)}K`
  }
  return runs.toString()
}

const formatAttachmentSize = (sizeInGB: number): string =>
  sizeInGB >= 1000 ? `${sizeInGB / 1000} TB` : `${sizeInGB} GB`

const formatPrice = (price: number): string => {
  return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

export function PricingTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Monthly Runs</th>
          <th>Monthly Price</th>
          <th>Price per Run</th>
          <th>Monthly Attachment Limit</th>
        </tr>
      </thead>
      <tbody>
        {pricingData.map((data, index) => {
          const attachmentSize = (data.runsPerMonth * 4) / 1000 // Convert to GB
          return (
            <tr key={index}>
              <td>{data.level}</td>
              <td>{formatRuns(data.runsPerMonth)}€</td>
              <td>{formatPrice(data.annualPrice)}€</td>
              <td>{(data.annualPrice / data.runsPerMonth).toFixed(2)}</td>
              <td>{formatAttachmentSize(attachmentSize)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
