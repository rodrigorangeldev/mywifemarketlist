import React from 'react'

import { Navbar, Row } from 'react-materialize'
import { Link } from 'react-router-dom'

const Header = () => (
    <Row>
        <Navbar className="grey darken-2" fixed>
            <Link to='/'>Home</Link>
            <Link to='/createList'>Criar lista</Link>
        </Navbar>
    </Row>
)

export default Header