import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'

import { TextInput, 
         Button, 
         Icon, 
         Collection, 
         CollectionItem, 
         Col, 
         Row, 
         Badge,
         CardPanel,
         Modal
        } from 'react-materialize'


import {formatPrice} from '../../util/format'

const CreateList = (props) => {

    useEffect(() => {
        
        // let list = JSON.parse(localStorage.getItem('AllLists')) || []
        // console.log(props)
        // if(props.match.params.id){
        //     let id = Number(props.match.params.id)
        //     list = list.find(item => { return item.id === id})
        //     setListOfItens(list)
        // }
        
        //setListOfItens(JSON.parse(localStorage.getItem('listOfItens')) || [])
        document.querySelector('#description').focus()

    },[])

    const history = useHistory()

    const tbDescription = document.querySelector('#description')
    const form = document.querySelector('#form1')
    const divScroll = document.querySelector('#divToScroll')

    const [item, setItem] = useState('')
    const [qtd, setQtd] = useState(1)
    const [obs, setObs] = useState('')
    const [marcaModelo, setMarcaModelo] = useState('')
    const [oldPrice, setOldPrice] = useState('')
    const [listOfItens, setListOfItens] = useState([])
    const [nameOfList, setNameOfList] = useState('')

    const modalTrigger = <Button node="button" 
        type="button"
        className="#009688 teal" 
        waves="light" 
        small={true}
        //onClick={() => saveList()}
        >Salvar a lista<Icon right>check_circle</Icon>
    </Button>

    const randomize = () => {
        return {
            randomId: Math.floor(Math.random() * 65536)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        let list = [...listOfItens, 
            {
                id: randomize().randomId,
                description: item, 
                purchased: false, 
                qtd,
                obs,
                oldPrice,
                marcaModelo 
            }
        ]

        setListOfItens(list)

        //tbDescription.value = ''
        form.reset()
        setObs('')
        setOldPrice('')
        setMarcaModelo('')
        tbDescription.focus()

        divScroll.scrollTop = 0;

        setToStorage(list)

    }

    function clearList(){
        localStorage.removeItem('listOfItens')
        setListOfItens([])
        toast(`A lista foi limpa com sucesso.`)
    }

    function setToStorage(list){
        localStorage.setItem('listOfItens', JSON.stringify(list))
    }

    // function setPurchased(id){
    //     let list = listOfItens.map(item => { 
    //         return item.id === id ? {...item, purchased: !item.purchased } : item
    //     })

    //     setListOfItens([...list])
    //     setToStorage([...list])
    // }

    function deleteItem(item){
        
        let list = listOfItens
        let index = listOfItens.indexOf(item)
        list.splice(index, 1)
        
        setListOfItens([...list])
        setToStorage([...list])

        console.log([...list])

        toast(`<strong>${item.description} </strong> &nbsp excluído!`)
        
        
        // window.Materialize.toast(`${item.description} excluído!`, 1000);
        
    }

    function toast(htmlString, time = 1000){
        window.M.toast({html:htmlString}, time);
    }

    function saveList(){

        let list = JSON.parse(localStorage.getItem('AllLists')) || []
        
        list.push({
            id: randomize().randomId,
            name: nameOfList,
            listOfItens,
            date: new Date()     
        })

        localStorage.setItem('AllLists', JSON.stringify(list))

        localStorage.removeItem('listOfItens')
        
        
        history.push('/')
    }

    

    return (
        <>
            <Row>
            <Col s={12} l={6} xl={6}>
                <CardPanel>
                 <form onSubmit={ handleSubmit } id="form1" >
                        <Row>
                            <TextInput s={8} id="description" name="description" maxLength="50" label="Informe uma descrição" onChange={e => setItem(e.target.value)} required />
                            <TextInput s={4} id="qtd" name="quantidade" label="Quantidade" onChange={e => setQtd(e.target.value)} defaultValue="1" required />
                        </Row>
                        <Row>
                            <TextInput s={6} id="marcaModelo" name="marcaModelo" label="Marca / Modelo" maxLength="15" onChange={e => setMarcaModelo(e.target.value)} />
                            <TextInput s={6} id="oldPrice" name="oldPrice" label="Ultimo preço encontrado" onChange={e => setOldPrice(e.target.value)} />
                        </Row>
                        <Row>
                            <TextInput s={12} id="obs" name="obs" label="Observação" maxLength="50" onChange={e => setObs(e.target.value)} />
                        </Row>
                        <Row>
                            <Button node="button" type="submit" waves="light" hidden="hidden" >Inserir <Icon right>send</Icon></Button>
                        </Row>
                    </form>
                </CardPanel>
            </Col>

            {/* Listagem */}
            <Col s={12} l={6} xl={6} className={ listOfItens.length <= 0 ? "hide" : "" }>
            <CardPanel> 
            <div id="divToScroll" style={{maxHeight: '400px', overflowY: "scroll", padding: '10px'}}>
                <Collection>
                        {
                        listOfItens
                        .slice()
                        .reverse()
                        .map(item =>
                            <CollectionItem key={item.id} /*className="avatar" className={item.purchased ? "#eceff1 blue-grey lighten-5" : item.className}*/ > 
                            {/* <Icon className="circle" large>
                                shopping_cart
                            </Icon> */}
                            <Row className="valign-wrapper">
                                <Col s={6} l={6} xl={6}>
                                           { <b><span className="title">{ item.description} <small>{item.marcaModelo ? `(${item.marcaModelo})` : '' }</small></span> </b>  } <br /> 
                                           { <small>{item.obs}</small> } <br /> 
                                           {item.oldPrice ? <small>Ultimo valor encontrado: <b>{formatPrice(Number(item.oldPrice))}</b></small> : '' }
                                </Col>
                                <Col s={2} l={2} xl={2} m={2}>
                                        <Badge  newIcon caption="qtd">  {item.qtd} </Badge>      
                                </Col>
                                <Col s={2} l={2} xl={2} m={2}>
                                        <Button className="#f44336 red valign" node="button" waves="light" small={true} onClick={() => deleteItem(item)}>
                                            <Icon>delete</Icon>
                                        </Button>                   
                                </Col>
                                {/* <Col s={2} l={2} xl={2} m={2}>
                                        <Checkbox id={item.id + 'chk' + (item.id * 7) } 
                                                filledIn label="OK" 
                                                value={item.description} 
                                                checked={item.purchased} 
                                                onChange={() => setPurchased(item.id)}
                                                >
                                        </Checkbox>
                                </Col>                                */}
                            </Row>
                            </CollectionItem>
                          )
                        }
                </Collection>
                </div>
                <br />
                <Row>
                    <Col className="right">
                        <Badge  newIcon caption="Itens"><b>{listOfItens.length}</b></Badge>
                    </Col>
                </Row>
                <Row>
                    <Col className="right">
                        <Button node="button" 
                            type="button"
                            tooltip="Limpar a lista" 
                            className="right #f44336 red" 
                            waves="light" 
                            small={true}
                            onClick={() => clearList()}
                            >Limpar a lista<Icon right>delete</Icon>
                        </Button>
                    </Col>
                    <Col className="left">
                        <Modal header="Dê um nome à sua lista" 
                               trigger={ modalTrigger } 
                               actions={[

                              ]}
                               >
                            <form onSubmit={ saveList }>
                                <TextInput s={6}  
                                    required
                                    label="Informe uma descrição" 
                                    onChange={e => setNameOfList(e.target.value)} />
                                <Button className="right" modal="close" type="submit">Salvar</Button>
                            </form>
                        </Modal>
                    </Col>
                </Row>
                </CardPanel>
            </Col>
            </Row>
        </>
            
    )

    // <Row>
    //     <Col>

    //     </Col>
    //     <Col></Col>
    // </Row>


}

export default CreateList