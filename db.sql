-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16/01/2024 às 00:21
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `farm`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id_ingredientes` int(11) NOT NULL,
  `nome` varchar(70) NOT NULL,
  `medida` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ingredientes`
--

INSERT INTO `ingredientes` (`id_ingredientes`, `nome`, `medida`) VALUES
(1, 'Farinha', 'g'),
(2, 'Açúcar', 'g'),
(3, 'Leite', 'ml'),
(4, 'Ovos', 'unidades'),
(5, 'Manteiga', 'g'),
(6, 'Fermento em pó', 'g'),
(7, 'Sal', 'g'),
(8, 'Chocolate em pó', 'g'),
(9, 'Óleo', 'ml'),
(10, 'Cebola', 'unidade'),
(11, 'Alho', 'dentes'),
(12, 'Tomate', 'unidade'),
(13, 'Salsinha', 'ramo'),
(14, 'Manjericão', 'ramo'),
(15, 'Pimenta', 'g'),
(16, 'Queijo parmesão', 'g'),
(17, 'Presunto', 'g'),
(18, 'Macarrão', 'g'),
(19, 'Atum', 'g'),
(20, 'Maionese', 'g'),
(21, 'Mostarda', 'colher de sopa'),
(22, 'Ketchup', 'colher de sopa'),
(23, 'Repolho', 'g'),
(24, 'Cenoura', 'g'),
(25, 'Pão de forma', 'fatias'),
(26, 'Peito de frango', 'g'),
(27, 'Molho de soja', 'ml'),
(28, 'Gengibre', 'g'),
(29, 'Azeite', 'ml'),
(30, 'Vinagre balsâmico', 'ml'),
(31, 'Mel', 'colher de sopa'),
(32, 'Amêndoas', 'g'),
(33, 'Avelãs', 'g'),
(34, 'Canela em pó', 'g'),
(35, 'Noz-moscada', 'g'),
(36, 'Raspas de limão', 'unidade'),
(37, 'Raspas de laranja', 'unidade'),
(38, 'Hortelã', 'ramo'),
(39, 'Limão', 'unidade'),
(40, 'Laranja', 'unidade'),
(41, 'Manga', 'unidade'),
(42, 'Abacaxi', 'unidade'),
(43, 'Morango', 'g'),
(44, 'Mirtilo', 'g'),
(45, 'Kiwi', 'unidade'),
(46, 'Pêssego', 'unidade'),
(47, 'Banana', 'unidade'),
(48, 'Cacau em pó', 'g'),
(49, 'Aveia', 'g'),
(50, 'Iogurte natural', 'g'),
(51, 'Melancia', 'g'),
(52, 'Melão', 'g'),
(53, 'Pepino', 'unidade'),
(54, 'Rúcula', 'g'),
(55, 'Espinafre', 'g'),
(56, 'Queijo cheddar', 'g'),
(57, 'Queijo mussarela', 'g'),
(58, 'Queijo gorgonzola', 'g'),
(59, 'Queijo prato', 'g'),
(60, 'Queijo minas', 'g'),
(61, 'Queijo coalho', 'unidade'),
(62, 'Ricota', 'g'),
(63, 'Requeijão', 'g'),
(64, 'Cream cheese', 'g'),
(65, 'Leite condensado', 'ml'),
(66, 'Gelatina', 'pacote'),
(67, 'Doce de leite', 'g'),
(68, 'Chocolate meio amargo', 'g'),
(69, 'Chocolate ao leite', 'g'),
(70, 'Chocolate branco', 'g'),
(71, 'Creme de leite', 'ml'),
(72, 'Leite de coco', 'ml'),
(73, 'Amido de milho', 'colher de sopa'),
(74, 'Leite em pó', 'g'),
(75, 'Coco ralado', 'g'),
(76, 'Amêndoas laminadas', 'g'),
(77, 'Castanha de caju', 'g'),
(78, 'Castanha do Pará', 'g'),
(79, 'Nozes', 'g'),
(80, 'Ovos de codorna', 'unidade'),
(81, 'Ervilhas', 'g'),
(82, 'Milho verde', 'unidade'),
(83, 'Azeitonas', 'g'),
(84, 'Cogumelos', 'g'),
(85, 'Alcaparras', 'g'),
(86, 'Rabanete', 'unidade'),
(87, 'Beterraba', 'unidade'),
(88, 'Semente de girassol', 'g'),
(89, 'Molho de pimenta', 'colher de sopa'),
(90, 'Picles', 'g'),
(91, 'Salsão', 'ramo'),
(92, 'Alho-poró', 'unidade'),
(93, 'Pimentão', 'unidade'),
(94, 'Semente de mostarda', 'colher de sopa'),
(95, 'Coentro', 'ramo'),
(96, 'Cravo-da-índia', 'unidade'),
(97, 'Erva-doce', 'colher de sopa'),
(98, 'Páprica', 'colher de sopa'),
(99, 'Cominho', 'colher de sopa'),
(100, 'Gergelim', 'colher de sopa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `procedimentos`
--

CREATE TABLE `procedimentos` (
  `id_procedimentos` int(11) NOT NULL,
  `body` text NOT NULL,
  `id_receitas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `procedimentos`
--

INSERT INTO `procedimentos` (`id_procedimentos`, `body`, `id_receitas`) VALUES
(17, 'Reúna todos os ingredientes;', 15),
(18, 'Em uma tábua, corte os tomates na metade, tire o meio (parte branca) e corte-os em cubinhos;', 15),
(19, 'Em uma panela, esquente o azeite e frite o alho brevemente;', 15),
(20, 'Adicione os tomates e mexa;', 15),
(21, 'Assim que cozinhar um pouco, tampe e espere cerca de 15 minutos em fogo baixo;', 15),
(22, 'Tempere com pimenta-do-reino, sal e reserve;', 15),
(23, 'Em uma panela com água fervente, coloque o sal, misture e experimente para ver se ela está salgada;', 15),
(24, 'Coloque a massa crua na panela com água e cozinhe seguindo as instruções da embalagem ou até atingir o ponto al dente;', 15),
(25, 'Agora é só servir o macarrão com o molho por cima. Bom apetite!', 15),
(26, 'Desfie o Shimeji e coloque para cozinhar com água suficiente para cobri-los, por aproximadamente 25 minutos.', 16),
(27, '\nEnquanto isso, lave os champignons Paris em água corrente e corte a parte de baixo do talo se estiver mais escura.', 16),
(28, '\nNão o talo todo, só uma rodela fininha do final dele. Após estarem limpos, pique como quiser (pedaços grandes são mais atrativos) e reserve.', 16),
(29, 'Refogue o alho no azeite até quase queimarem e ponha a cebola. Se necessário ponha água de pouco em pouco quando estiver quase queimando. Ponha o tomate para refogar também. Isto é o molho de tomate b', 16),
(30, 'Escorra o Shimeji e coloque na panela com o molho de tomate e os Champignons Paris.', 16),
(31, 'Coloque um pouco de água e deixe cozinhando até ficar um molho de consistência quase cremosa.', 16),
(32, 'Acrescente o molho branco aos poucos, misturando.', 16),
(33, 'Deixe ferver por mais uns 5 minutos e está pronto.', 16),
(34, 'Molho Branco:\n\nDerreter a margarina e colocar 1 colher de trigo', 16),
(35, 'Mexer pra não empelotar e por um pouco do leite.', 16),
(36, 'Continuar mexendo e pondo o leite.', 16),
(37, 'Misturar 1 colher de trigo em um pouquinho de leite frio e colocar junto na panela.', 16),
(38, 'Mexa até engrossar e acrescente o queijo picado.', 16),
(39, 'Continuar mexendo até o queijo derreter.', 16),
(40, 'Bata no liquidificador, os ovos, o óleo e o leite por 3 minutos e reserve.', 17),
(41, 'Em um recipiente, misture o açúcar, o trigo, o fermento, o chocolate e o coco ralado a gosto.\n\n', 17),
(42, 'Em um recipiente, misture o leite de coco, o leite e o açúcar e despeje sobre a massa cortada ao meio para umedecê-la.', 17),
(43, 'Em um recipiente, misture o leite de coco, o leite e o açúcar e despeje sobre a massa cortada ao meio para umedecê-la.', 17),
(44, 'muito bom', 18);

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitas`
--

CREATE TABLE `receitas` (
  `id_usuarios` int(11) NOT NULL,
  `dificuldade` varchar(12) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `tempo` varchar(12) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `porcoes` varchar(30) DEFAULT NULL,
  `image` varchar(10) DEFAULT NULL,
  `id_receitas` int(11) NOT NULL,
  `img_url` text NOT NULL,
  `like` int(11) NOT NULL,
  `deslike` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receitas`
--

INSERT INTO `receitas` (`id_usuarios`, `dificuldade`, `descricao`, `tempo`, `titulo`, `porcoes`, `image`, `id_receitas`, `img_url`, `like`, `deslike`) VALUES
(14, 'Facil', 'O macarrão é uma massa alimentícia de origem italiana, amplamente consumida em diferentes partes do mundo. Sua composição básica é feita a partir de farinha de trigo e água, embora variações possam in', '15 minutos', 'Macarrao', '3 a 5 porções', NULL, 15, 'https://www.receiteria.com.br/wp-content/uploads/macarrao-capa-730x548.jpeg.webp', 0, 0),
(14, 'Mediana', 'Prato feito com dois tipos de cogumelos, sendo eles o shimeji e paris. Usamos dois deliciosos molhos caseiros de tomate e de castanha de caju, ...', '30 minutos', 'Estrogonofe de cogumelos vegetariano', '5 a 7 porções', NULL, 16, 'https://www.ligvegan.com.br/wp-content/uploads/2020/11/IMG_3056.jpg', 0, 0),
(14, 'Mediana', 'Um otimo Bolo de Fubá', '45 minutos', 'BOLO DE FUBÀ', '3 a 5 porções', NULL, 17, 'https://bakeandcakegourmet.com.br/uploads/site/receitas/bolo-de-fuba-com-ingrediente-surpresa-ec19h3w5.jpg', 4, 0),
(14, 'Facil', 'Um frango muito delicioso', '15 minutos', 'Frango', '1 a 3 porções', NULL, 18, 'https://saude.abril.com.br/wp-content/uploads/2020/09/reconecte-se-com-a-comida-abre-dossie%CC%82.png', 10, 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `registros_ingredientes`
--

CREATE TABLE `registros_ingredientes` (
  `id_registros` int(11) NOT NULL,
  `quantidade` int(25) DEFAULT NULL,
  `id_receitas` int(11) NOT NULL,
  `id_ingrediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `registros_ingredientes`
--

INSERT INTO `registros_ingredientes` (`id_registros`, `quantidade`, `id_receitas`, `id_ingrediente`) VALUES
(17, 5, 15, 12),
(18, 1, 15, 11),
(19, 100, 15, 29),
(20, 20, 15, 7),
(21, 1, 15, 14),
(22, 400, 16, 84),
(23, 2, 16, 12),
(24, 200, 16, 29),
(25, 0, 16, 10),
(26, 2, 16, 11),
(27, 300, 17, 1),
(28, 200, 17, 2),
(29, 298, 17, 5),
(30, 200, 18, 16);

-- --------------------------------------------------------

--
-- Estrutura para tabela `social`
--

CREATE TABLE `social` (
  `id_social` int(11) NOT NULL,
  `reacao` varchar(30) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_receita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `nome` varchar(70) NOT NULL,
  `senha` varchar(35) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `nome`, `senha`, `email`) VALUES
(14, 'everson henrique da silva', 'everson781!', 'eversonhenriquepro781@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id_ingredientes`);

--
-- Índices de tabela `procedimentos`
--
ALTER TABLE `procedimentos`
  ADD PRIMARY KEY (`id_procedimentos`),
  ADD KEY `id_receitas` (`id_receitas`);

--
-- Índices de tabela `receitas`
--
ALTER TABLE `receitas`
  ADD PRIMARY KEY (`id_receitas`),
  ADD KEY `id_usuarios` (`id_usuarios`);

--
-- Índices de tabela `registros_ingredientes`
--
ALTER TABLE `registros_ingredientes`
  ADD PRIMARY KEY (`id_registros`),
  ADD KEY `id_receitas` (`id_receitas`),
  ADD KEY `id_ingredientes` (`id_ingrediente`);

--
-- Índices de tabela `social`
--
ALTER TABLE `social`
  ADD PRIMARY KEY (`id_social`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_receita` (`id_receita`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `procedimentos`
--
ALTER TABLE `procedimentos`
  MODIFY `id_procedimentos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id_receitas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `registros_ingredientes`
--
ALTER TABLE `registros_ingredientes`
  MODIFY `id_registros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `social`
--
ALTER TABLE `social`
  MODIFY `id_social` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `procedimentos`
--
ALTER TABLE `procedimentos`
  ADD CONSTRAINT `procedimentos_ibfk_1` FOREIGN KEY (`id_receitas`) REFERENCES `receitas` (`id_receitas`);

--
-- Restrições para tabelas `receitas`
--
ALTER TABLE `receitas`
  ADD CONSTRAINT `receitas_ibfk_1` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id_usuarios`);

--
-- Restrições para tabelas `registros_ingredientes`
--
ALTER TABLE `registros_ingredientes`
  ADD CONSTRAINT `registros_ingredientes_ibfk_1` FOREIGN KEY (`id_receitas`) REFERENCES `receitas` (`id_receitas`),
  ADD CONSTRAINT `registros_ingredientes_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id_ingredientes`);

--
-- Restrições para tabelas `social`
--
ALTER TABLE `social`
  ADD CONSTRAINT `social_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuarios`),
  ADD CONSTRAINT `social_ibfk_2` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id_receitas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
