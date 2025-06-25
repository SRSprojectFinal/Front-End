# Funcionalidade de Compra de Cursos - Carrinho

## Descrição
Esta funcionalidade permite que os alunos comprem cursos através do carrinho de compras. Quando o aluno clica no botão "Continue", o sistema automaticamente inscreve o aluno nos cursos selecionados no backend.

## Como Funciona

### 1. Adição ao Carrinho
- Os alunos podem adicionar cursos ao carrinho na página principal
- Cada curso é armazenado no localStorage com o nome do produto
- O carrinho mostra apenas os cursos que foram adicionados

### 2. Processamento da Compra
Quando o aluno clica no botão "Continue":

1. **Verificação de Login**: Verifica se o usuário está logado
2. **Validação do Carrinho**: Verifica se há produtos no carrinho
3. **Processamento dos Cursos**: Para cada curso no carrinho:
   - Mapeia o nome do curso para o endpoint correto do backend
   - Envia requisição POST para adicionar o aluno ao curso
   - Aguarda resposta do backend

### 3. Mapeamento de Cursos
Os seguintes cursos são mapeados para os endpoints do backend:

| Nome do Curso (Frontend) | Endpoint Backend |
|-------------------------|------------------|
| Front-End | `/cursos/frontend/adicionar` |
| Back-End | `/cursos/backend/adicionar` |
| Mobile | `/cursos/mobile/adicionar` |
| Data Science | `/cursos/datascience/adicionar` |
| UI & UX Desing | `/cursos/uiux/adicionar` |
| Programming Basis | `/cursos/programming/adicionar` |

### 4. Dados Enviados ao Backend
Para cada curso, são enviados os seguintes dados:
```json
{
  "nomeCompleto": "Nome do Usuário",
  "emailEducacional": "email@student.srs.edu",
  "tp1": "ND",
  "tp2": "ND", 
  "tp3": "ND",
  "assesment": "ND"
}
```

### 5. Tratamento de Erros
- Se o backend não estiver rodando, mostra mensagem de erro
- Se algum curso falhar, mostra detalhes do erro
- Se todos os cursos forem processados com sucesso, limpa o carrinho

## Requisitos

### Backend
- O backend deve estar rodando em `http://localhost:8080`
- Os endpoints devem estar implementados conforme o controller `CursosController`
- CORS deve estar configurado para aceitar requisições de `http://localhost:3000`

### Frontend
- Usuário deve estar logado (dados no localStorage)
- Carrinho deve conter pelo menos um curso

## Fluxo de Uso

1. Aluno faz login no sistema
2. Aluno adiciona cursos ao carrinho na página principal
3. Aluno acessa o carrinho (`/Cart/cart.html`)
4. Aluno clica em "Continue"
5. Sistema processa a compra automaticamente
6. Aluno é inscrito nos cursos selecionados
7. Carrinho é limpo e página é recarregada

## Funcionalidades Adicionais

### Feedback Visual
- Botão "Continue" é desabilitado durante o processamento
- Texto do botão muda para "Processando..."
- Mensagens de erro detalhadas são exibidas

### Logout
- Botão de logout funcional
- Limpa todos os dados do localStorage
- Redireciona para a página inicial

### Nome do Usuário
- Mostra o nome do usuário logado no navbar
- Extrai apenas o primeiro nome para exibição

## Arquivos Modificados

- `cart.js`: Implementação da função `Buy()` e funcionalidades adicionais
- `cart.html`: Estrutura HTML do carrinho (já existia)

## Testes

Para testar a funcionalidade:

1. Inicie o backend em `http://localhost:8080`
2. Inicie o frontend em `http://localhost:3000`
3. Faça login como aluno
4. Adicione cursos ao carrinho
5. Acesse o carrinho e clique em "Continue"
6. Verifique se o aluno foi adicionado às tabelas corretas no backend 