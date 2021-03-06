import React, {useState, useEffect} from 'react'
import {useGame} from '../context/GameContext'
import { useHistory } from "react-router-dom"
import GameForm from '../component/Game/GameForm'
import DownsList from '../component/Game/DownList'
import GameBottomNav from './GameBottomNav'

//ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px",
        marginBottom: "75px",
    }
}));
  

export default function Game(props) {
    const classes = useStyles();
    const history = useHistory()

    const index = props.match.params.index

    const {getGame} = useGame()
    const {downs} = useGame()

    const [error, setError] = useState("")
    const [init, setInit] = useState(false)
    const [view, setView] = useState("game")
    const [game, setGame] = useState(false)
    const [loading, setLoading] = useState(false)
    const [downIndex, setDownIndex] = useState(props.match.params.index)



    const editDown =  (downIndex) => {
        setView("game")
        setDownIndex(downIndex)
        history.push(`/game/${props.match.params.id}/${downIndex}`)
    }

    useEffect(() => {
        history.push(`/game/${props.match.params.id}/${downIndex}`)
    },[downIndex, props.match.params.index]);

    //TODO: investigate what causes multiple render cycles and fix it
    useEffect(()=>{
        setError("") 
        //This is because I don't know any onther way to make async work inside useEffect
        async function loadGame(id) {
            await getGame(id).catch(e=>{
                setError(e)
                console.log(error)
            })
        }
        if (!init){
            setLoading(true)
            loadGame(props.match.params.id).then((result)=>{setLoading(false)}).catch((e)=>{
                setError(e)
                return alert(e)
            })
            setInit(true)
        }
    }, [error, props.match.params.id, getGame])
    

    if (!init && !loading){
        return null
    }

    //reference for values
    // https://www.hudl.com/support/classic/breakdown-stats-reports/hudl-assist/how-hudl-breaks-down-video
    return (
        <>
            <div className={classes.container}>
                {/* <div style={{marginBottom: "15px"}}>{home} {homeScore} vs {awayScore} {away}</div> */}
                {view === "game" ? (
                    <GameForm downIndex={downIndex} handleDownIndex={editDown} {...props}></GameForm>
                ) : (
                    <DownsList downIndex={downIndex} editDown={editDown} downs={downs}/>
                )}
            </div>
            <GameBottomNav 
                formId='game-form'
                gameId={props.match.params.id}
                setView={setView}
            />
        </>
    )
}
