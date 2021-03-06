import React from 'react'

//components
import GamesList from '../component/GamesList'
import BottomNav from '../containers/BottomNavigation'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
    //   padding: "15px",
    },
  }));

export default function Dashboard() {
    const classes = useStyles();

    return (
    <>
        <GamesList/>
        <BottomNav/>
    </>
    )
}
