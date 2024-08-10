import Link from "next/link";
import React from "react";

const ProducerPage = () => {
  return (
    <div>
      <p>Produtores rurais</p>

      <div>
        <Link href={"/producer/new"}>Adicionar</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nome</td>
            <td>
              <ul>
                <li>editar</li>
                <li>deletar</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProducerPage;
