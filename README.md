# 🚀 Fullstack Task Manager
> Uma aplicação robusta de gerenciamento de tarefas com arquitetura de microserviços dockerizados.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
---
## 🇧🇷 Português
---
### 🚀 Sobre o Projeto
Uma aplicação To-Do List Fullstack moderna, construída para demonstrar práticas de desenvolvimento escaláveis, incluindo arquitetura de microserviços dockerizados, Server Actions no Next.js 15 e um backend robusto com NestJS.

### 🛠️ Tecnologias
Frontend: Next.js 15 (App Router), Tailwind CSS, Lucide React.

Backend: NestJS, TypeORM, Node.js 20.

Banco de Dados: PostgreSQL.

Infraestrutura: Docker, Docker Compose.

### 📦 Como Rodar
O projeto foi totalmente dockerizado para garantir que rode em qualquer ambiente sem a necessidade de instalar dependências locais.

Clonar o repositório:

``` Bash
git clone https://github.com/pedrohgmello/todo-list-fullstack-node.git
cd todo-list-fullstack-node
```
Configurar as variáveis de ambiente:
Crie arquivos `.env` nas pastas /frontend e /backend (baseie-se nos arquivos `.env.example`).

Subir os containers:

```Bash
docker-compose up --build
```
Acesse:

Frontend: `http://localhost:3000`

API Backend: `http://localhost:3333`

🇺🇸 English
🚀 About the Project
A modern Fullstack To-Do List application built to showcase scalable development practices, featuring dockerized microservices architecture, Next.js 15 Server Actions, and a robust NestJS backend.

🛠️ Tech Stack
Frontend: Next.js 15 (App Router), Tailwind CSS, Lucide React.

Backend: NestJS, TypeORM, Node.js 20.

Database: PostgreSQL.

Infrastructure: Docker, Docker Compose.

📦 How to Run
The project is fully dockerized to ensure it runs in any environment without the need for local dependency installation.

Clone the repository:

```Bash
git clone https://github.com/pedrohgmello/todo-list-fullstack-node.git
cd todo-list-fullstack-node
```
Environment Variables:
Create `.env` files in both /frontend and /backend folders (refer to `.env.example` files).

Run with Docker:

```Bash
docker-compose up --build
```
Access:

Frontend: `http://localhost:3000`

Backend API: `http://localhost:3333`
