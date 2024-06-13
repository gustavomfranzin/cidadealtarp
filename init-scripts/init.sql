-- Criação da tabela emblems
CREATE TABLE IF NOT EXISTS emblems (
    Id INT PRIMARY KEY,
    Slug VARCHAR(255) NOT NULL UNIQUE,
    Name VARCHAR(255) NOT NULL,
    Image TEXT
);

-- Inserção de dados na tabela emblems
INSERT INTO emblems (Id, Slug, Name, Image) VALUES
(1, 'cda', 'Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png'),
(2, 'cda-valley', 'Cidade Alta Valley', 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png'),
(3, 'policia', 'Policia do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/policia.png'),
(4, 'hospital', 'Hospital do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/hospital.png'),
(5, 'mecanica', 'Mecânica do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/mecanica.png'),
(6, 'taxi', 'Taxi do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/taxi.png'),
(7, 'curuja', 'Coruja', 'https://cidadealtarp.com/imagens/challenge/coruja.png'),
(8, 'hiena', 'Hiena', 'https://cidadealtarp.com/imagens/challenge/hiena.png'),
(9, 'gato', 'Gato', 'https://cidadealtarp.com/imagens/challenge/gato.png'),
(10, 'urso', 'Urso', 'https://cidadealtarp.com/imagens/challenge/urso.png');

-- Criação da tabela accounts
CREATE TABLE IF NOT EXISTS accounts (
    Id INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
    CapturedEmblems VARCHAR(255)
);

-- Inserção de dados na tabela accounts
INSERT INTO accounts (Id, Name, Email, Password) VALUES
('1','User 1', 'user1@example.com', 'password1'),
('2','User 2', 'user2@example.com', 'password2'),
('3','User 3', 'user3@example.com', 'password3'),
('4','User 4', 'user4@example.com', 'password4'),
('5','User 5', 'user5@example.com', 'password5'),
('6','User 6', 'user6@example.com', 'password6'),
('7','User 7', 'user7@example.com', 'password7'),
('8','User 8', 'user8@example.com', 'password8'),
('9','User 9', 'user9@example.com', 'password9'),
('10','User 10', 'user10@example.com', 'password10');
