import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Card, Col, Row, Icon } from 'react-materialize'
import { useEffect } from 'react'

export default function ListOfCards({ listOfItens }) {

    const [theList, setTheList] = useState([])

    useEffect(() => setTheList(listOfItens),[listOfItens])
    
    function deleteList(item){
        let index = listOfItens.indexOf(item)
        listOfItens.splice(index, 1)
        
        localStorage.setItem('AllLists', JSON.stringify(listOfItens))
        setTheList(listOfItens)
        
    }

    return <Row>
        {
            theList.slice().reverse().map(item => (
                <Col key={item.id}>
                    <Card
                        className="blue-grey darken-1"
                        textClassName="white-text"
                        title={item.name}
                        actions={[
                            <Link key="2" to={`/list/${item.id}`}><Icon>assignment</Icon></Link>,
                            <Link key="1" to={`/createList/${item.id}`} ><Icon>edit</Icon></Link>,
                            <Link key="3" to="/" onClick={() => deleteList(item)}><Icon>delete</Icon></Link>
                          ]}
                    >
                        <p>Data: {item.date || ''}</p>
                    </Card>
                </Col>
            ))
        }
    </Row>

}

