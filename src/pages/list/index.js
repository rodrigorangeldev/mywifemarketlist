import React, { useEffect, useState } from 'react'

import { Container, Table, Button } from 'react-materialize'

export default function List(props){

    const [theList, setTheList] = useState([])

useEffect(() => {
    console.log(props)
    let list = JSON.parse(localStorage.getItem('AllLists')) || []
    let id = Number(props.match.params.id)

    list = list.find(item => { return item.id === id})
    
    setTheList(list.listOfItens)

}, [])

//return <h1>Lista</h1>
    return <Container>
            <Table responsive hoverable centered>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Comprado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        theList.map(item => {
                            return <tr key={item.id}>
                                <td>
                                 <b>{item.description}</b> <br /> 
                                 Preço anterior: {item.oldPrice} <br />
                                 Observação: {item.obs}
                                 </td>
                                <td>{item.qtd}</td>
                                <td><Button>OK</Button></td>
                            </tr>
                        })
                    }
                </tbody>
                </Table>
    </Container>


}