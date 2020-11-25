import Produtos from './Produtos'
import Fornecedores from './Fornecedores'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'


export default () => 
    <Switch>
        <Route exact path='/' component={Produtos} />
        <Route path='/Produtos' component={Produtos} />
        <Route path='/Fornecedor' component={Fornecedores} />
        <Redirect from='*' to='/' />
    </Switch>