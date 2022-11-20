import React from 'react'
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

export default function LoanRepayments({data}) {
  // console.log(data);
  return (
    <Table
      height={350}
      data={data}
      title="Loan Monetization table"
      virtualized={true}
    >
      <Column width={60} align="center" fixed>
        <HeaderCell>Count</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column minWidth={200} flexGrow={2}>
        <HeaderCell>Amount to pay</HeaderCell>
        <Cell dataKey="amount" />
      </Column>

      <Column minWidth={200} flexGrow={2}>
        <HeaderCell>Payment Due</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column minWidth={200}  flexGrow={1}>
        <HeaderCell>Balance</HeaderCell>
        <Cell dataKey="balance" />
      </Column>
    </Table>
  )
}
