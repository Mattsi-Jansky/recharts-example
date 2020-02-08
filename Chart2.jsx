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
    console.log(`refAreaLeft: ${refAreaLeft}, refAreaRight: ${refAreaRight}, left: ${left}, right: ${right} indexLeft: ${this.state.indexLeft}, indexRight: ${this.state.indexRight}`)

    return (
      <div>
        <button
          className="btn update"
          onClick={this.zoomOut.bind(this)}
        >
          Zoom Out
        </button>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart 
            data={data}
            onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel, indexLeft: e.activeTooltipIndex })}
            onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel, indexRight: e.activeTooltipIndex })}
            onMouseUp={this.zoom.bind(this)}
          >
            <XAxis
              dataKey="date"
              domain={[parseInt(left, 0), parseInt(right, 0)]}
              tick={{ fontSize: 14 }}
              tickCount={13}
              tickFormatter={this.formatUnixTime}
              type="number"
              allowDataOverflow
            />
            <YAxis
              domain={[bottom, top]}
              allowDataOverflow
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
      </div>)
  }

  zoomOut() {
    
  }

  zoom() {
    let { refAreaLeft, refAreaRight, indexLeft, indexRight } = this.state

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }))
      return
    }

    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

    let [bottom, top] = this.getAxisYDomain(indexLeft, indexRight)

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top
    }))
  }

  getAxisYDomain(from, to) {
    const refData = this.props.data.slice(Math.max(0, from - 1), Math.min(this.props.data.length, to))
    console.log(`refData: ${JSON.stringify(refData)}`)
    let [bottom, top] = [refData[0].lowestQuantity, 1]

    refData.forEach((entry) => {
      if (entry.highestQuantity > top) top = entry.highestQuantity
      if (entry.lowestQuantity < bottom) bottom = entry.lowestQuantity
    })

    return [Math.max(0, bottom - 1), top + 1]
  }

  formatUnixTime(unixTime) { return moment.unix(unixTime).format('DD/MM/YY') }
}

export default MyChart