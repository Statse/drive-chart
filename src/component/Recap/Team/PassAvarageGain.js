import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        flexFlow: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default function PassAvarageGain(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game


    let passingYards = 0
    let interceptions = 0
    let incompletions = 0
    let fumbles = 0

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.playType === "Pass"  && down.result !== "Penalty"){
                if (down.result ===  "Interception"){
                    interceptions += 1
                } else if (down.result === "Turnover" && down.result === "Fumble turnover"){
                    fumbles += 1
                } else if (down.result ===  "Incomplete"){
                    incompletions += 1
                }else {
                    passingYards += down.endYardline - down.startYardline
                }
                return down
            }
        }
    }) 
    
    const avaragePassYards =  Math.round((passingYards / passes.length) * 10) / 10
    const avaragePassYardsPerCompletion =  Math.round((passingYards / (passes.length - incompletions)) * 10) / 10

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Total passing yards</Typography>
                <Typography variant="h4" component="p">{passingYards}</Typography>
                <Typography variant="h5" component="h2">Attempts</Typography>
                <Typography variant="h4" component="p">{passes.length}</Typography>
                <Typography variant="h5" component="h2">Pass yards per attempt</Typography>
                <Typography variant="h4" component="p">{avaragePassYards}</Typography>
                <Typography variant="h5" component="h2">Pass yards per completion</Typography>
                <Typography variant="h4" component="p">{avaragePassYardsPerCompletion}</Typography>
                <Typography variant="h5" component="h2">Interceptions</Typography>
                <Typography variant="h4" component="p">{interceptions}</Typography>
            </CardContent>
        </Card>
    )
}
