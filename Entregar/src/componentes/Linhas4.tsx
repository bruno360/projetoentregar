import React from 'react'
import './Estilos.css'

export default function Linhas(props: any): JSX.Element {
    return <tr>
        <td className="p25 fonte_ajuste">{props.it1}</td>
        <td className="p25 fonte_ajuste">{props.it2}</td>
        <td className="p25 fonte_ajuste">{props.it3}</td>
        <td className="p25 fonte_ajuste">{props.it4}</td>
    </tr>
}