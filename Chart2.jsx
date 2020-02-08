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
      data: this.addHighestAndLowestFields(props.data)
    }
  }

  addHighestAndLowestFields(data) {
    data.forEach(datum => {
      let highestQuantity = 1
      let lowestQuantity = 9999

      for(var key in datum) {
        if(key != "date") {
          const value = datum[key]
          if(value > highestQuantity) highestQuantity = value
          if(value < lowestQuantity) lowestQuantity = value
        }
      }

      datum.highestQuantity = highestQuantity
      datum.lowestQuantity = lowestQuantity
    })

    return data
  }

  render() {
    const { left, right, refAreaLeft, refAreaRight, top, bottom, data } = this.state
    console.log(`data: ${JSON.stringify(data)}`)
    //console.log(`refAreaLeft: ${refAreaLeft}, refAreaRight: ${refAreaRight}, indexLeft: ${this.state.indexLeft}, indexRight: ${this.state.indexRight}`)

    return <ResponsiveContainer width="99%" height={320}>
      <LineChart 
        data={data}
        onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel, indexLeft: e.activeTooltipIndex })}
        onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel, indexRight: e.activeTooltipIndex })}
        onMouseUp={this.zoom.bind(this)}
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
        {(refAreaLeft && refAreaRight) &&
          <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
        }
      </LineChart>
    </ResponsiveContainer>
  }

  formatUnixTime(unixTime) { return moment.unix(unixTime).format('DD/MM/YY') }
}

export default MyChart