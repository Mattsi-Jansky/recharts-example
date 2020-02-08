import React from "react"
import { render } from "react-dom"
import MyChart from "./Chart1"

const sampleData = [
  { date: 1559520000, Apples: 101, Bannanas: 96, Pineapple: 40 },
  { date: 1559606400, Apples: 95, Bannanas: 95, Pineapple: 39 },
  { date: 1559692800, Apples: 80, Bannanas: 91, Pineapple: 33 },
  { date: 1559779200, Apples: 74, Bannanas: 88, Pineapple: 29 },
  { date: 1559865600, Apples: 63, Bannanas: 75, Pineapple: 22 },
  { date: 1559952000, Apples: 48, Bannanas: 60, Pineapple: 4 },
  { date: 1560038400, Apples: 101, Bannanas: 96, Pineapple: 40 },
  { date: 1560124800, Apples: 99, Bannanas: 90, Pineapple: 38 },
  { date: 1560211200, Apples: 99, Bannanas: 90, Pineapple: 22 },
  { date: 1560297600, Apples: 82, Bannanas: 78, Pineapple: 8 },
  { date: 1560384000, Apples: 81, Bannanas: 60, Pineapple: 0 },
  { date: 1560470400, Apples: 65, Bannanas: 46, Pineapple: 0 },
  { date: 1560556800, Apples: 101, Bannanas: 96, Pineapple: 40 },
  { date: 1560643200, Apples: 94, Bannanas: 85, Pineapple: 36 },
  { date: 1560729600, Apples: 76, Bannanas: 67, Pineapple: 36 },
  { date: 1560816000, Apples: 62, Bannanas: 52, Pineapple: 30 },
  { date: 1560902400, Apples: 49, Bannanas: 44, Pineapple: 26 },
  { date: 1560988800, Apples: 34, Bannanas: 26, Pineapple: 26 }
]

render(<MyChart data={sampleData} />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}
