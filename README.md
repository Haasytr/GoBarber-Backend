# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios de produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisá confirmar a nova senha

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email, senha;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirmar a senha;

**RN**



# Painel do prestador

**RF**

- O usuário deve listar todos os prestadores de serviço contratados;
- O usuário deve poder listar os dias de um mês com pelo menos um horarío disponivel de um prestador;
- O usuário deve poder listar horarios disponiveis em um dia especifico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador


**RNF**

- Os agendamentos devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas em mongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando socket.io

**RN**

- Cada agendamento deve durar uma hora;
- Os agendamentos devem estar disponiveis entre as 8h da manha as 18h;
- O usuário não pode agender em um horario ocupado;
- O usuário não pode agendar em um horario que já passou;
- O usuário  não pode agendar consigo mesmo;


# Agendamento de serviços
