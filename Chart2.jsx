import moment from 'moment-timezone'
import React, { PureComponent } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ReferenceArea
} from 'recharts'

class MyChart extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      indexLeft: '',
      indexRight: '',
      bottom: 'auto',
      top: 'auto',
    }
  }

  render() {
    const { left, right, refAreaLeft, refAreaRight, top, bottom } = this.state

    return <ResponsiveContainer width="99%" height={320}>
      <LineChart 
        data={this.props.data}
      >
        <XAxis
          dataKey="date"
          domain={[left, right]}
          tick={{ fontSize: 14 }}
          tickCount={13}
          tickFormatter={this.formatUnixTime}
          type="number"
        />
        <YAxis
          domain={[bottom, top]}
        />
        <CartesianGrid vertical={false} />
        <Tooltip labelFormatter={this.formatUnixTime} />
        <Line
          dataKey="Apples"
          stroke="#00AA00"
          strokeWidth={2.5}
          animationDuration={300}
        />
        <Line
          dataKey="Bannanas"
          stroke="#AAAA00"
          strokeWidth={2.5}
          animationDuration={300}
        />
        <Line
          dataKey="Pineapple"
          stroke="#AA0000"
          strokeWidth={2.5}
          animationDuration={300}
        />
      </LineChart>
    </ResponsiveContainer>
  }

  formatUnixTime(unixTime) { return moment.unix(unixTime).format('DD/MM/YY') }
}

export default MyChart