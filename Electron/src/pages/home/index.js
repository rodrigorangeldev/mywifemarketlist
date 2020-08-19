import React, { useEffect, useState } from 'react'

import ListOfCards from '../../components/ListOfCards'

import { Container } from 'react-materialize'

export default function Home() {

    const [lists, setlists] = useState([])

    function loadLists(){
        setlists(JSON.parse(localStorage.getItem('AllLists')) || [])
    }


    useEffect(() => {
        loadLists()
    }, [])

    

    return <Container><ListOfCards listOfItens={lists} /></Container>

}