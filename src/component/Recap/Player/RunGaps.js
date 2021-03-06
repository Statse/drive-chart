import React from 'react'
import StatCard from '../Wrappers/StatCard'
import RunMap  from '../../CustomCharts/RunMap'

export default function RunGaps(props) {
    const {game, team, player} = props
    const {downs} = game
    let gaps = {
      OR: {
        attempts: 0, 
        yards: 0,
        td: 0
      },
      IR: {
        attempts: 0, 
        yards: 0,
        td: 0
      },
      IL: {
        attempts: 0, 
        yards: 0,
        td: 0
      },
      OL: {
        attempts: 0, 
        yards: 0,
        td: 0
      }
    }

    let totalYards = 0

    const runs = downs.filter((down)=>{
        const rusher = parseInt(down.carrier)
        if (down.possession.toLowerCase() === team &&  down.playType === "Run" && down.result !== "Penalty" && rusher === parseInt(player)) {
          if (down.runGap){
            gaps[down.runGap].attempts = gaps[down.runGap].attempts + 1
            gaps[down.runGap].yards = parseInt(gaps[down.runGap].yards) + (parseInt(down.endYardline) - parseInt(down.startYardline))
            totalYards = parseInt(totalYards) + (parseInt(down.endYardline) - parseInt(down.startYardline))
          if (down.result === "TD"){
            gaps[down.runGap].td = gaps[down.runGap].td + 1
          }
          return true
          }
        }
    }) 
   
    if (runs.length < 1){
      return null
    }

    return (
        <StatCard>
            {/* <Chart options={options} series={series} type="heatmap" height={350} /> */}
            <RunMap gaps={gaps} totalRuns={runs.length} totalYards={totalYards}/>
        </StatCard>
    )
}
