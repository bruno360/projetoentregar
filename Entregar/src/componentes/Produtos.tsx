import { type } from 'os'
import React, { Component } from 'react'
import '../componentes/Estilos.css'
import '../componentes/Produtos.css'
import api from '../services/api'
import Linhas4 from './Linhas4'




export default class Produtos extends Component {
    
    state = { name: "", code: "", category: "", fornecedor: "", visableCadastra: "noVisible", visableFiltro: "noVisible", filtro: "", vetorProduto: [], vetorFornecedor: [] }



    constructor(props: any) {
        super(props)
        this.tabela = this.tabela.bind(this)
        this.gerar = this.gerar.bind(this)
        this.produtos = this.produtos.bind(this)
        this.filtrar = this.filtrar.bind(this);
        this.visableCadastra = this.visableCadastra.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.OnChangeNomeProduto = this.OnChangeNomeProduto.bind(this);
        this.OnChangeCodigo = this.OnChangeCodigo.bind(this);
        this.OnChangeFornecedor = this.OnChangeFornecedor.bind(this);
        this.OnChangeCategoria = this.OnChangeCategoria.bind(this);
        this.CadastrarProduto = this.CadastrarProduto.bind(this);
        this.filtroFornecedor = this.filtroFornecedor.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.existeFornecedor= this.existeFornecedor.bind(this);
        this.atualizar();

    }

    atualizar() {
        api.get("products").then(resp => resp.data).then((e: any) => {
            e.sort(function (a: any, b: any) {
                let v1:string=a.name;
                v1=v1.toLocaleLowerCase();
                let v2:string=b.name;
                v2=v2.toLocaleLowerCase();
                if (v1 > v2) {
                    return 1;
                } else if (v1 < v2) {
                    return -1;
                }
                return 0;
            }
            )            
            this.setState({ vetorProduto: e })
        })
        api.get("providers").then(resp => resp.data).then((e: any) => {
            this.setState({ vetorFornecedor: e })
        })

    }


    tabela(): JSX.Element {
        return (<table className="tamanho100 fonte" cellSpacing="0px" cellPadding="0px">
            <thead className="thead" >
                <tr>
                    <th className="p25 fonte_ajuste" >Nome</th>
                    <th className="p25 fonte_ajuste">Código</th>
                    <th className="p25 fonte_ajuste">Categoria</th>
                    <th className="p25 fonte_ajuste">Fornecedor</th>
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
        const vetorFornecedor = [...this.state.vetorFornecedor]
        this.state.vetorProduto.forEach(function (valor: any): void {
            const providerID = valor.provider_id;
            let name: string = "";
            vetorFornecedor.forEach((fornecedor: any) => providerID === fornecedor.id ? name = fornecedor.name : name = name)
          
             vetor2.push(<Linhas4 it1={valor.name} it2={valor.code} it3={valor.category} it4={name} />)

        }
        )
        return vetor2;
    }




    filtroFornecedor() {
        const buscar: any = (param: any) => {
            const Fornecedores: any = [...this.state.vetorFornecedor]
            for (const valor of Fornecedores) {

                if (param === valor.name) {                   
                    return valor.id;
                }
            }

        }
        const nome: string = this.state.fornecedor;
        let valorID = buscar(nome);
        api.get("products").then(resp => resp.data).then((e: any) => {
            const vetor: any = [];
            e.forEach((element: any) => {
                if (element.provider_id == valorID) {
                    vetor.push(element)
                }
            });

            this.setState({ vetorProduto: vetor })

        })



        this.visableFiltro();
    }


    visableFiltro() {
        if (this.state.visableFiltro === "noVisible") {
            this.setState({ visableFiltro: "Visible" })
        } else {
            this.setState({ visableFiltro: "noVisible" })
        }
    }

    visableCadastra() {      
        if (this.state.visableCadastra === "noVisible") {
            this.setState({ visableCadastra: "Visible" })
        } else {
            this.setState({ visableCadastra: "noVisible" })
        }
    }

    OnChangeNomeProduto(event: any) {
        this.setState({ name: event.target.value });
    }




    OnChangeCodigo(event: any) {
        this.setState({ code: event.target.value });
    }

    OnChangeCategoria(event: any) {
        this.setState({ category: event.target.value });
    }

    OnChangeFornecedor(event: any) {
        this.setState({ fornecedor: event.target.value });
    }

    existeFornecedor()
    {
       const fornecedores:any=[...this.state.vetorFornecedor]
       const name:string=this.state.fornecedor;
        for(const valor of fornecedores)
        {
            if(valor.name==name)
            {
                return valor.id;                
            }

        }


        return false;
    }

    CadastrarProduto() {       
        const result:any=this.existeFornecedor();      
        if (this.state.name.length > 0 && this.state.code.length > 0 && this.state.category.length > 0 && this.state.fornecedor.length > 0 && result!==false) {           
            const post = {
                name: this.state.name,
                code: this.state.code,
                category: this.state.category,
                provider_id: result
            }
            api.post("products", post);
        }
        this.setState({ visableCadastra: "noVisible" });
        this.atualizar();
    }


    produtos(): JSX.Element {
        let valor: string = "div_cadastro fonte " + this.state.visableCadastra;       
        return <div className={valor}>
            <div className="div_centralizar midlle fonte_sizeCadastro">

                <div></div>
                <div>
                    <div className="corCaixa">
                        <div className="negrito">Cadastrar Prouto</div>
                        <div className="tamanho1_2linhas">
                            <div className="centralizarAltura" >Nome do produto</div>
                            <div><input onChange={e => this.OnChangeNomeProduto(e)} className="tamanho_input" type="text" placeholder="Insira o nome do produto" /></div>
                        </div>
                        <div className="tamanho1_2linhas">
                            <div className="centralizarAltura">Fornecedor</div>
                            <div><input onChange={e => this.OnChangeFornecedor(e)} className="tamanho_input" type="text" placeholder="Insira o nome do fornecedor" /></div>
                        </div>
                        <div className="tamanho2Linhas1Coluna">
                            <div className="tamanho1Linhas3Coluna">
                                <div className="linha centralizarAltura">Codigo do produto</div>
                                <div className="space"></div>
                                <div className="linha centralizarAltura">Categoria</div></div>
                            <div className="tamanho1Linhas3Coluna">
                                <div className="linha"><input onChange={e => this.OnChangeCodigo(e)} className="tamanho_input" type="text" placeholder="" /></div>
                                <div className="space"></div>
                                <div className="linha"><input onChange={e => this.OnChangeCategoria(e)} className="tamanho_input" type="text" placeholder="" /></div>
                            </div>
                        </div>
                        <div className="tamanho50_2Colunas">
                            <div></div>
                            <div><a href="#" onClick={e => this.CadastrarProduto()} className="butaoCadastro">Cadastrar</a></div>
                        </div>
                    </div>
                </div>
                <div></div>

            </div>
        </div>
    }



    filtrar(): JSX.Element {
        let valor: string = "div_cadastro fonte " + this.state.visableFiltro;
        return <div className={valor}>
            <div className="div_centralizar midlle">

                <div></div>
                <div>
                    <div className="corCaixa2">
                        <div className="negrito">Filtrar por fornecedor</div>
                        <div className="tamanho1_2linhas">
                            <div className="centralizarAltura" >Fornecedor</div>
                            <div><input className="tamanho_input" type="text" onChange={e => this.OnChangeFornecedor(e)} placeholder="Insira o nome do fornecedor" /></div>
                        </div>

                        <div className="tamanho50_2Colunas">
                            <div></div>
                            <div><a href="#" className="butaoCadastro" onClick={e => this.filtroFornecedor()} >Filtrar</a></div>
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
                <div className="titulo linha">Produtos</div><div className="linha direita"><button className="botao" onClick={e => this.visableCadastra()} ><text className="textBotao">Cadastrar produto</text></button></div>
                <div className="linha direita"><button className="iconeBotao" onClick={e => this.visableFiltro()}><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z" stroke="#181818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg></button></div>
            </div>
            <div className="espacamento">
                {this.tabela()}
            </div>
            {this.produtos()}
            {this.filtrar()}
        </React.Fragment>
    }


}