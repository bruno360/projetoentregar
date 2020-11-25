import React, { Component } from 'react'
import '../componentes/Fornecedores.css'
import api from '../services/api'
import '../componentes/Estilos.css'
import Linhas4 from './Linhas4'

export default class Fornecedores extends Component {
    state = { name: "", document: "", uf: "", totalProdutos: 0, visable: "noVisible", vetorFornecedores: [], vetorProdutos: [] }

    constructor(props: any) {
        super(props)
        this.tabela = this.tabela.bind(this)
        this.gerar = this.gerar.bind(this)
        this.fornecedor = this.fornecedor.bind(this)
        this.visable = this.visable.bind(this);
        this.updateNome = this.updateNome.bind(this)
        this.CNPJ = this.CNPJ.bind(this)
        this.Estado = this.Estado.bind(this)
        this.Cadastrar = this.Cadastrar.bind(this)
        this.atualizar = this.atualizar.bind(this);
        this.atualizar()
    }


    atualizar() {
        api.get("providers").then(resp => resp.data).then((e: any) => {
            e.sort(function (a: any, b: any) {
                let v1:string=a.name;
                v1=v1.toLocaleLowerCase();
                let v2:string=b.name;
                v2=v2.toLocaleLowerCase();
                if (v1 >v2) {
                    return 1;
                } else if (v1 <v2) {
                    return -1;
                }
                return 0;
            }
            )

            this.setState({ vetorFornecedores: e })
        })

        api.get("products").then(resp => resp.data).then((e: any) => {
            this.setState({ vetorProdutos: e })
        })

    }


    tabela(): JSX.Element {
        return (<table className="tamanho100 fonte" cellSpacing="0px" cellPadding="0px">
            <thead className="thead" >
                <tr>
                    <th className="p25">Nome</th>
                    <th className="p25">CNPJ</th>
                    <th className="p25">Estado</th>
                    <th className="p25">Total de produtos</th>
                </tr>
            </thead>
            <tbody>
                {this.gerar()}
            </tbody>
        </table>

        )
    }

    gerar(): JSX.Element[] {
        const vetor2: JSX.Element[] = []
        const produtos: any = [...this.state.vetorProdutos]
        this.state.vetorFornecedores.forEach(function (valor: any): any {
            let id = valor.id; let count = 0;
            produtos.forEach(function (produto: any) {
                if (id === produto.provider_id) {
                    count++;
                }
            })
            vetor2.push(<Linhas4 it1={valor.name} it2={valor.document} it3={valor.uf} it4={count} />)

        }
        )
        return vetor2;
    }

    visable() {
        this.atualizar();
        const mudar = (valor: string) => {
            this.setState({ visable: valor })
        }

        if (this.state.visable === "noVisible") {
            mudar("Visible");

        } else {
            mudar("noVisible");

        }


    }

    updateNome(e: any) {
        this.setState({ name: e.target.value })
    }

    CNPJ(e: any) {
        this.setState({ document: e.target.value })
    }

    Estado(e: any) {
        this.setState({ uf: e.target.value })
    }

    Cadastrar() {
        if (this.state.name.length > 0 && this.state.document.length > 0 && this.state.uf.length > 0) {
            const post = {
                name: this.state.name,
                document: this.state.document,
                uf: this.state.uf,
                totalProdutos: this.state.totalProdutos
            }
            api.post("providers", post);
        }
        this.setState({ visable: "noVisible" });
    }

    fornecedor(): JSX.Element {
        let valor: string = "div_cadastro fonte " + this.state.visable;
        return <div className={valor}>
            <div className="div_centralizar midlle">

                <div></div>
                <div>
                    <div className="corCaixa">
                        <div className="negrito">Cadastrar Fornecedor</div>
                        <div className="tamanho1_2linhas">
                            <div className="centralizarAltura">Nome</div>
                            <div><input className="tamanho_input" type="text" placeholder="Insira o nome do fornecedor" onChange={e => this.updateNome(e)} /></div>
                        </div>
                        <div className="tamanho2Linhas1Coluna">
                            <div className="tamanho1Linhas3Coluna">
                                <div className="linha centralizarAltura">CNPJ</div>
                                <div></div>
                                <div className="linha centralizarAltura">Estado</div></div>
                            <div className="tamanho1Linhas3Coluna">
                                <div className="linha"><input onChange={e => this.CNPJ(e)} className="tamanho_input" type="text" placeholder="" /></div>
                                <div className="space"></div>
                                <div className="linha"><input onChange={e => this.Estado(e)} className="tamanho_input" type="text" placeholder="" /></div>
                            </div>
                        </div>

                        <div className="tamanho50_2Colunas">
                            <div></div>
                            <div><a href="#" onClick={e => this.Cadastrar()} className="butaoCadastro" >Cadastrar</a></div>
                        </div>
                    </div>
                </div>
                <div></div>

            </div>
        </div>
    }

    render(): JSX.Element {
        return <React.Fragment>
            <div className="espacamento espacamentoTopButtom">
                <div className="titulo linha">Fornecedores</div><div className="linha direita"><button onClick={e => this.visable()} className="botao"><span className="textBotao"> Cadastrar Fornecedor</span></button></div>
            </div>
            <div className="espacamento">
                {this.tabela()}
            </div>
            {this.fornecedor()}
        </React.Fragment>
    }
}