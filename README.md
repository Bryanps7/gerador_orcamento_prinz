# Gerador de Orçamento — Vidraçaria Prinz

Uma aplicação web simples para gerar orçamentos de vidraçaria. O projeto permite cadastrar itens, preencher dados do cliente e calcular valores com margem de lucro para gerar uma prévia do orçamento.

## Funcionalidades

- Cadastro dinâmico de itens do orçamento
- Campos de cliente e informações do orçamento
- Cálculo automático de valores com margem de lucro
- Visualização do orçamento em tabela
- Geração de PDF do orçamento

## Como usar

1. Abra o arquivo `index.html` em um navegador.
2. Informe quantos itens serão incluídos no orçamento.
3. Clique em `Cadastrar itens`.
4. Preencha os dados do cliente, cada item e os valores necessários.
5. Clique em `Visualizar Orçamento` para ver a prévia.
6. Use o botão `Gerar PDF do Orçamento` para exportar o orçamento.

## Estrutura do projeto

- `index.html` — página principal da aplicação
- `assets/js/index.js` — lógica de cadastro, cálculo e renderização do orçamento
- `assets/styles/style.css` — estilos visuais da aplicação
- `assets/styles/config.css` — configurações adicionais de estilo
- `public/` — ativos públicos, incluindo logo e imagens

## Observações

- A aplicação é estática e funciona diretamente no navegador.
- A margem de lucro padrão é de 70% quando não informada.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para detalhes.
