import React from 'react'
import Grid from '@material-ui/core/Grid';

//Charts
import OffenseType from './OffenseType'
import CompletionPrecentage from './CompletionPrecentage'
import PassAvarageGain from './PassAvarageGain'


export default function Team(props) {
    const {game, team} = props

    return (
        <Grid container spacing={3}>
            {game.downs && (
                <>
                    <Grid item xs={12} md={6} lg={4}>
                        <OffenseType game={game} team={team}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompletionPrecentage game={game} team={team}/>  
                    </Grid> 
                    <Grid item xs={12} md={6} lg={4}>
                        <PassAvarageGain game={game} team={team}/>  
                    </Grid> 
                </>
            )}
        </Grid>
    )
}
