import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})

export class ClientListComponent implements OnInit {
    clientes: any [] = [];
    items: any [] = [];


  constructor(private _http: HttpClient,private _router: Router) {
  }

  ngOnInit(): void {
    // this.getClientes("http://172.19.0.19:8081/client/list");
    this.getClientes("http://localhost:8081/client/list");
  }
  getClientes(url: any) {
    this._http.get(`${url}`)
      .subscribe({
        next: (v:any) => {
            this.clientes =  v.data;
        },
        error: (err) => {
          // this.erros.push(nome);
        },
      });



      this.items = [
          {
              codigo: 1,
              cnpj: "12345678901234",
              nome: "Empresa A",
              cidade: "São Paulo",
              estado: "SP",
              setor: "Tecnologia",
          },
          {
              codigo: 2,
              cnpj: "98765432109876",
              nome: "Empresa B",
              cidade: "Rio de Janeiro",
              estado: "RJ",
              setor: "Serviços",
          },
          {
              codigo: 3,
              cnpj: "45678901234567",
              nome: "Empresa C",
              cidade: "Belo Horizonte",
              estado: "MG",
              setor: "Indústria",
          },
      ];


  }

    mascaraCPNJ(cnpj: any): string {
        return cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
        );
    }

    openClient(client: any) {
      this._router.navigate(['/form'], { queryParams: client});

    }
    editarCliente(clienteId: number) {
        this._router.navigate(['/form', clienteId, 'edicao']);
    }

}
