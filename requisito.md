
### Requisitos Funcionais:

* Cadastro de cliente com Código, Nome e CNPJ
* Cadastro de Endereço do cliente com localização geográfica
* Vinculação do Endereço ao Cliente
* Visualização dos clientes em um mapa com opções de filtro

### Requisitos Não Funcionais:

* O sistema deve ser seguro, garantindo a integridade e confidencialidade das informações
* O sistema deve ser responsivo e fácil de usar
* O sistema deve ter um tempo de resposta rápido
* O sistema deve ser escalável para lidar com um grande número de clientes e endereços
### Regras de Negócio:

* Um cliente não pode ser cadastrado sem Nome, CNPJ e Endereço com localização
* Os campos de Código, Nome e CNPJ devem ser obrigatórios no cadastro do cliente
* O endereço do cliente deve conter localização geográfica
* O endereço deve ser vinculado ao cliente no cadastro
* O mapa de visualização dos clientes deve permitir filtrar os clientes por nome, CNPJ e localização geográfica.

### Considerações Adicionais:

* O sistema deve permitir o armazenamento de múltiplos endereços para um único cliente, caso necessário
* O sistema deve permitir a atualização dos dados do cliente e endereço, bem como a exclusão dos mesmos.