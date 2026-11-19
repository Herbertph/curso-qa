# Source document: landing page "Teste Antes de Lançar" (pt-BR, verbatim)

> This is the product owner's original specification, transcribed from
> `especificacao-landing-page-teste-antes-de-lancar.pdf` (Google Drive folder shared by Herbert, 2026-11-19).
> It is the **source of truth for every page text**. Text inside `>` quote blocks or listed as "exact" must be
> copied letter by letter (case, accents, punctuation). The English spec `docs/specs/landing-page-teste-antes-de-lancar.md`
> refers to the section numbers below (§N).

---

UNFLAKY, QUALITY LAB, ESPECIFICAÇÃO PARA RECONSTRUÇÃO, Landing page Teste Antes de Lançar

Especificação completa e fiel da página aprovada, com todos os textos exatos, medidas, cores, comportamentos e o fluxo inteiro do diagnóstico, para outro agente reconstruir a página exatamente igual.

## 1. Objetivo

Reconstruir, sem redesenhar e sem reescrever, a landing page do mini curso Teste Antes de Lançar, da Unflaky, voltado a founders que constroem SaaS com IA. A página não vende o curso direto na abertura, ela conduz o visitante a um diagnóstico rápido de 7 perguntas, mostra o resultado na tela e apresenta o conteúdo do curso como o próximo passo para corrigir as áreas descobertas.

A página só vai ao ar quando o curso estiver pronto. Por isso, não existe lista de espera em nenhum lugar da página, ver seção 29.

## 2. Produto, público e idioma

Produto: mini curso em português, 8 aulas curtas, introdução mais 7 testes, para validar um SaaS feito com IA antes de lançar. Público: founders e criadores que programam com agente, Cursor, Claude, Copilot, ChatGPT ou qualquer LLM, sem base em QA. Idioma de tudo: português do Brasil, pt-BR, atributo `lang="pt-BR"` no HTML.

Título da aba do navegador:

> Teste Antes de Lançar, o mini curso para SaaS feito com IA

## 3. Regras que não podem ser quebradas

**Regra do travessão:** nenhum texto da página, nenhum título, botão, pergunta, dica ou mensagem pode usar travessão, o caractere de traço longo. Onde ele apareceria, usa-se vírgula. Esta regra vale também para qualquer texto novo que o agente precise criar.

**Regra da verdade:** não inventar números, faturamento, receita, depoimentos, alunos, vagas, escassez, prazos ou promessas financeiras. Os únicos números permitidos são os que estão nesta especificação, nas seções 10 e 26, porque são os dados reais do instrutor. Não dizer que o instrutor aprova ou certifica produtos para o mercado, o trabalho dele é verificar e devolver para correção.

## 4. Como usar este documento

Textos exatos da página devem ser copiados letra por letra, incluindo maiúsculas, acentos e pontuação. Fora deles, estão as instruções de estrutura, medida e comportamento. Onde esta especificação e uma ideia nova do agente conflitarem, vale esta especificação.

---

# IDENTIDADE VISUAL

## 5. Cores exatas, fontes e base do layout

A página é escura, premium, com dourado como cor de ação. Usar exatamente estas variáveis CSS, com estes nomes e estes valores:

| Variável | Valor | Uso |
|---|---|---|
| `--bg` | `#0c0d0f` | Fundo principal da página |
| `--bg2` | `#121316` | Fundo alternado, faixa de provas, CTA final, fundo dos cartões internos |
| `--panel` | `#17181c` | Fundo dos painéis e cartões |
| `--panel2` | `#1d1e23` | Cabeçalho interno dos cartões, hover das aulas |
| `--line` | `#2a2b31` | Bordas e divisórias suaves |
| `--line2` | `#35363e` | Bordas mais fortes, contorno dos cartões e dos campos |
| `--text` | `#f2efe6` | Texto principal, branco quente |
| `--muted` | `#a8a49a` | Texto secundário |
| `--muted2` | `#7d7a72` | Texto terciário, rodapé, notas pequenas |
| `--gold` | `#c9a227` | Dourado principal, botões, bordas de destaque |
| `--gold2` | `#e8c85a` | Dourado claro, títulos de destaque, hover dos botões, etiquetas mono |
| `--gold-dim` | `rgba(201,162,39,.14)` | Fundo dourado translúcido, opção selecionada, selo pendente |
| `--green` | `#3ecf7a` | Status conferido, sucesso, certo |
| `--red` | `#ff6b5e` | Status descoberto, erro, falha |
| `--radius` | `14px` | Raio de borda padrão de cartões e painéis |

Outras cores fixas: texto sobre botão dourado, `#141310`. Fundo do quadro do celular no modal, `#050506`. Fundo do notch, `#1b1c20`. Fundo escurecido atrás do modal, `rgba(4,4,6,.78)`. Fundo do header, `rgba(12,13,15,.92)` com desfoque de 10px. Fundo da barra fixa do celular, `rgba(18,19,22,.97)`.

### Fontes

Archivo, pesos 400, 500, 600, 700, 800 e 900, para todo o texto. Família de reserva: system-ui, sans-serif. IBM Plex Mono, pesos 400, 500 e 600, só para etiquetas, contadores, números de aula e detalhes técnicos, classe `.mono` e elementos de etiqueta de seção. Carregar as duas do Google Fonts, com preconnect para fonts.googleapis.com e fonts.gstatic.com. Corpo: line-height 1.55, suavização de fonte ligada, esquema de cor escuro declarado, `color-scheme: dark`.

### Base do layout

Largura máxima do conteúdo: 1120px, centralizado, com respiro lateral de 20px, classe `.wrap`.

Rolagem suave, com `scroll-padding-top: 84px` e `scroll-padding-bottom: 96px`, para âncoras não ficarem escondidas atrás do header fixo e da barra do celular. Botões, campos e elementos clicáveis com altura mínima de 48px, header e quiz com exceções próprias descritas nas suas seções. Seções de conteúdo com respiro vertical de 64px no desktop, classe `section.block`. Várias seções seguintes usam respiro superior zero, porque o respiro já vem da seção anterior, ver a ordem na seção 6.

---

# ESTRUTURA E TOPO

## 6. Ordem das seções e header fixo

Ordem exata de cima para baixo:

1. Header fixo
2. Hero, com caixa de CTA do diagnóstico e cartão de conferência
3. Faixa de provas, 4 itens
4. Seção Diagnóstico rápido, título, texto e caixa de CTA que abre o quiz
5. Seção O problema, 2 cartões
6. Seção O formato de cada aula, 4 passos
7. Seção Conteúdo do curso, acordeão com 8 aulas, âncora `#aulas`
8. Seção Para quem é, 2 listas
9. Seção Quem ensina, cartão do instrutor e texto
10. Seção Perguntas frequentes, acordeão com 5 itens
11. CTA final
12. Rodapé
13. Modal do quiz, fora do fluxo visível, e barra fixa de CTA só no celular

## 7. Header

Header fixo no topo, `position: sticky; top: 0`, camada 50, fundo translúcido escuro com desfoque de 10px e borda inferior de 1px na cor `--line`. Dentro, um contêiner de 1120px com respiro vertical de 14px, logo à esquerda e botão à direita, alinhados no centro.

Logo: caixa de 44px por 44px, tamanho fixo que nunca encolhe, `flex: none`, fundo preto, borda de 1.5px dourada, respiro interno de 6px. Dentro dela, o escudo dourado da Unflaky completo, sem cortar, desenho de escudo com um sinal de certo dentro, traço dourado `#c9a227` com preenchimento dourado translúcido e o certo em `#e8c85a`, em SVG de 28px por 28px, sempre inteiro e centralizado. Nunca substituir por uma letra, por iniciais ou por um escudo cortado.

Ao lado do escudo, em duas linhas: `UNFLAKY`, 15px, peso forte, espaçamento entre letras de .14em, e abaixo `QUALITY LAB`, 11px, cor `--muted`, espaçamento de .18em, peso 500. Espaço de 12px entre escudo e textos, e de 5px entre as duas linhas. O conjunto do logo é um link para `#topo`, com rótulo acessível `Unflaky, Quality Lab`.

Botão do header: texto exato `Fazer o diagnóstico`, fundo dourado, texto `#141310`, peso 700, 14px, altura mínima de 44px, respiro lateral de 18px, raio de 8px. No hover, fundo `--gold2`. Este botão abre o quiz, ver seções 12 e 13. No celular, até 620px, este botão some, porque a barra fixa do rodapé cumpre esse papel.

**Ponto de conferência visual:** no topo, o escudo tem que aparecer inteiro dentro da caixa dourada, no desktop e no celular. A versão errada que motivou a correção mostrava só um pedaço de letra cortada dentro da caixa. Se o escudo não couber inteiro, a caixa está errada, não o escudo.

---

# HERO

## 8. Hero, textos exatos e caixa de CTA

Hero com respiro de 56px em cima e 48px embaixo, borda inferior, e um brilho radial dourado suave no canto superior direito sobre o fundo escuro. Grade de 2 colunas, 1.08fr e .92fr, com 44px de espaço, alinhadas pelo topo. À esquerda, os textos e a caixa de CTA. À direita, o cartão de conferência da seção 9.

Etiqueta superior, em pílula com borda, ponto verde de 7px e texto em maiúsculas, 12px, espaçamento de .14em, cor `--gold2`:

> Mini curso, 8 aulas curtas

Título principal, H1, entre 36px e 58px conforme a tela, peso 900, line-height 1.02. A parte final fica em dourado claro, sem itálico:

> Sem esses testes, seu SaaS pode quebrar em produção

Dois parágrafos de subtítulo, 18px, cor `--muted`, largura máxima de 34em. No primeiro, o trecho em destaque fica na cor do texto principal:

> Você construiu rápido com IA, e isso é ótimo. O problema é que o agente entrega o código e diz que está pronto, mas ninguém conferiu se funciona de verdade. Este mini curso mostra os 7 testes que separam um lançamento tranquilo de um lançamento apagando incêndio.

> Aulas curtas e diretas, feitas para quem programa com agente, Cursor, Claude, Copilot ou qualquer LLM, e quer validar o próprio produto sem virar especialista em QA.

### Caixa de CTA do hero

Painel com fundo `--panel`, borda `--line2`, raio de 14px, respiro de 20px, 26px acima dos subtítulos. Dentro, nesta ordem:

> Descubra onde seu SaaS pode quebrar

(título da caixa, 16px, em negrito)

> Responda 7 perguntas, uma para cada teste do curso, e veja na tela sua pontuação de 0 a 14, suas áreas descobertas e as aulas prioritárias para o seu caso.

Botão grande, largura total da caixa:

> Fazer o diagnóstico

> Leva cerca de 1 minuto. O resultado aparece na tela, com o status de cada área.

O botão grande é dourado, altura mínima de 54px, 16px de fonte, peso 800, raio de 9px, e abre o quiz direto na pergunta 1. A última linha é a nota da caixa, 12.5px, cor `--muted2`. Não há campo de e-mail, formulário ou lista de espera nesta caixa.

---

# CARTÃO DE CONFERÊNCIA E PROVAS

## 9. Cartão CONFERÊNCIA PRÉ-LANÇAMENTO

Cartão à direita do hero, fundo `--panel`, borda `--line2`, raio de 14px, conteúdo cortado nas bordas arredondadas. Rótulo acessível do cartão: `Exemplo de conferência de testes antes do lançamento`.

Cabeçalho do cartão, fundo `--panel2`, respiro de 14px por 18px, borda inferior. À esquerda, em fonte mono, 12px, espaçamento de .12em, cor `--muted`: `CONFERÊNCIA PRÉ-LANÇAMENTO`. À direita, um selo dourado, fundo `--gold`, texto `#141310`, 11px, peso 700: `AO VIVO NA AULA`.

Corpo com 5 linhas. Cada linha tem um quadrado de status de 24px por 24px, raio de 6px, depois o título em negrito, 14.5px, e a explicação em 13px, cor `--muted`. Linhas separadas por borda tracejada, respiro vertical de 12px. Ordem, ícones e textos exatos:

| Status | Título | Explicação |
|---|---|---|
| Certo, verde | Login e sessão | Usuário entra, sai e volta sem perder o acesso |
| Errado, vermelho | Pagamento e checkout | Cartão recusado ainda cobra o cliente, bug clássico de SaaS novo |
| Certo, verde | Salvamento de dados | O que o usuário salva continua lá depois de atualizar a página |
| Errado, vermelho | Permissões de acesso | Um cliente consegue ver dados de outro cliente |
| Pendente, dourado | Fluxo principal ponta a ponta | Cadastro, uso e pagamento, na ordem em que o cliente faz |

Ícones: certo é o sinal de verificação, fundo verde translúcido e borda verde. Errado é a letra x, fundo vermelho translúcido e borda vermelha. Pendente é um ponto central, fundo `--gold-dim` e borda dourada.

Rodapé do cartão, respiro de 13px por 18px, borda superior, 12.5px, cor `--muted`, com os dois lados separados:

- À esquerda: `2 falhas encontradas antes do lançamento`, com a palavra `antes` em fonte mono.
- À direita, em fonte mono e cor dourada clara: `CUSTO: R$ 0 em cliente perdido`

## 10. Faixa de provas

Faixa logo abaixo do hero, fundo `--bg2`, borda inferior, grade de 4 colunas, itens separados por borda à esquerda, respiro de 22px por 18px, o primeiro item sem borda e sem respiro à esquerda. Número em 24px, negrito, com o símbolo em dourado claro. Textos exatos:

| Número | Explicação |
|---|---|
| 10+ | anos de experiência em TI, de desenvolvimento a qualidade de software |
| 3 dias → 24h | foi a redução no tempo de triagem de bugs, com processo e bug report padronizado |
| 98% | no prazo das entregas nos últimos 6 meses, verificando software que não pode ir ao ar com erro |
| CTFL 2026 | certificação internacional em testes de software, ISTQB |

Não trocar estes itens por liderança de equipe, tamanho de time ou quantidade de jurisdições. Esses temas foram retirados da página de propósito.

---

# SEÇÃO DO DIAGNÓSTICO

## 11. Seção Diagnóstico rápido, introdução e caixa de CTA

Seção com âncora `#diagnostico` e respiro vertical de 64px. Cabeçalho da seção com largura máxima de 720px. Etiqueta de seção em fonte mono, 12px, maiúsculas, espaçamento de .16em, cor `--gold2`. Título H2 entre 27px e 38px, peso 800. Parágrafo de 16.5px, cor `--muted`. Textos exatos:

- Etiqueta: `Diagnóstico rápido`
- H2: `Descubra, em 1 minuto, onde seu SaaS pode quebrar`
- Parágrafo: `7 perguntas, uma para cada teste do curso. No final, você deixa seu e-mail e recebe na tela sua pontuação, suas áreas descobertas e quais aulas atacam exatamente o seu risco.`

Abaixo do cabeçalho fica a caixa de CTA da seção, largura máxima de 760px, fundo `--panel`, borda de 1px na cor `--gold`, raio de 14px, respiro de 28px. Layout em linha, texto à esquerda e botão à direita, com quebra para baixo quando não couber. Textos exatos:

- Título (entre 20px e 25px): `Seu SaaS está pronto para o primeiro cliente de verdade?`
- Texto: `O diagnóstico abre aqui na página, em uma janelinha no formato de celular. Você responde as 7 perguntas, deixa seu e-mail e vê o resultado completo sem sair desta tela.`
- Botão grande dourado: `Fazer o diagnóstico`

**Detalhe de implementação que não pode se perder:** o bloco do quiz em si, perguntas, e-mail e resultado, nasce no código dentro desta seção, mas ao carregar a página ele é movido para dentro da tela do celular do modal. Visualmente, nesta seção, o visitante só vê o cabeçalho e a caixa de CTA acima. O quiz nunca aparece aberto no corpo da página.

Não recriar uma versão do quiz embutida na página, não duplicar o quiz, e não deixar o quiz visível fora do modal.

### Padrão das demais seções

Todas as seções seguintes repetem o mesmo cabeçalho, etiqueta mono dourada, H2 e, quando houver, parágrafo em `--muted`, com 34px de respiro abaixo do cabeçalho. As seções de problema, formato, aulas, público, instrutor e FAQ usam respiro superior zero e respiro inferior de 64px no desktop.

---

# O MODAL DO QUIZ

## 12. Modal em formato de celular, desktop e celular

Esta é a parte central do pedido. O quiz mora dentro de um modal, e dentro do modal ele aparece dentro de um quadro que imita um aparelho de celular.

### Estrutura

Modal fixo cobrindo a tela inteira, camada 100, escondido por padrão e exibido como flex centralizado quando aberto, classe `.open`. Atrás, uma camada escurecida cobrindo tudo, `rgba(4,4,6,.78)`, que é a página escurecida que o visitante vê ao redor do celular no desktop. O modal tem papel de diálogo, `role="dialog"`, `aria-modal="true"` e rótulo `Diagnóstico rápido, 7 perguntas`. Ao abrir, a rolagem do corpo da página trava. Ao fechar, a rolagem volta. Ao abrir, o foco vai para o botão de fechar.

### No desktop, acima de 620px

Modal com respiro de 20px ao redor, quadro centralizado na horizontal e na vertical. Quadro do celular: largura de 400px, no máximo 100% da largura disponível, altura de `min(800px, 94vh)`, fundo `#050506`, borda de 1px na cor `--line2`, cantos arredondados de 40px, respiro interno de 10px, sombra forte, layout em coluna.

Topo do quadro: faixa de 38px de altura. No centro, o notch, uma pílula de 96px por 20px, raio total, fundo `#1b1c20` e borda na cor `--line`. À direita, o botão de fechar.

Botão de fechar: círculo de 34px por 34px, altura mínima também de 34px, fundo `--panel2`, borda `--line2`, símbolo x em 18px, rótulo acessível `Fechar o diagnóstico`. No hover, borda e símbolo ficam dourados.

Tela do celular: ocupa o espaço restante do quadro, rola por dentro, fundo `--panel`, cantos arredondados de 30px. Dentro dela vai o quiz, sem borda própria, sem raio próprio e com fundo transparente, largura livre. Dentro da tela do celular, a linha do formulário de e-mail vira coluna, campo em cima e botão em largura total, igual ao comportamento do celular.

### No celular, até 620px

O modal perde o respiro, padding zero. O quadro vira tela cheia: largura de 100%, altura de `100dvh`, sem borda, sem raio de canto e sem respiro interno. A tela interna também perde o raio de canto. O topo com notch e botão de fechar continua existindo. Resultado prático: no celular, abrir o diagnóstico é abrir o quiz ocupando a tela inteira do aparelho.

### Como fecha

Três formas, todas obrigatórias: clicar no botão X, clicar na área escurecida fora do quadro e apertar a tecla Esc. O botão `Ver as aulas do curso`, na tela de resultado, também fecha o modal ao ser clicado, e depois a página rola até as aulas.

---

# FLUXO DO QUIZ

## 13. Abertura direta na pergunta 1, sem tela intermediária

Não existe tela intermediária. Não existe tela de boas-vindas do quiz, tela de confirmação, tela de apresentação ou botão do tipo começar o diagnóstico dentro do modal. Quem clica já decidiu. Um clique a mais nesta etapa é exatamente onde o visitante desiste.

Todo botão com o texto `Fazer o diagnóstico`, em qualquer lugar da página, header, hero, caixa da seção de diagnóstico, CTA final e barra fixa do celular, abre o modal já na pergunta 1, com as respostas zeradas. Reabrir o quiz sempre recomeça do zero, respostas limpas, pergunta 1, mesmo que a pessoa já tenha respondido tudo antes. O botão `Refazer o diagnóstico`, na tela de resultado, também volta direto para a pergunta 1, sem passar por nenhuma tela intermediária e sem fechar o modal. Dentro do quiz, as telas trocam sem recarregar a página e a tela do celular volta ao topo a cada troca de tela.

### Anatomia de cada pergunta

Respiro interno do quiz: 28px. Largura máxima de 760px fora do modal, e livre dentro da tela do celular.

Topo da tela, em linha, separados: à esquerda, em fonte mono dourada, 12px, espaçamento de .14em, o texto `ÁREA N DE 7, NOME DA ÁREA` em maiúsculas. À direita, o contador em fonte mono, 12.5px, cor `--muted`: `Pergunta N de 7`.

Barra de progresso: altura de 8px, fundo `--bg`, borda `--line2`, raio total, 24px de respiro abaixo. O preenchimento é dourado e anima a largura em .35s. A largura é a pergunta atual dividida por 7, ou seja, na pergunta 1 a barra está em 0%, na pergunta 2 em cerca de 14%, e assim por diante. Na tela de e-mail, a barra fica em 100%.

Pergunta em título, entre 20px e 25px, line-height 1.3. Abaixo, a dica, 15.5px, cor `--muted`, com 20px de respiro abaixo.

Opções em coluna, 10px de espaço entre elas. Cada opção é um botão de largura total, texto à esquerda, fundo `--bg2`, borda `--line2`, raio de 10px, respiro de 14px por 16px, altura mínima de 56px, fonte de 15.5px, peso 600, com um círculo de 16px à esquerda, borda de 2px na cor `--muted2`. No hover, a borda da opção fica dourada. Na opção selecionada, borda dourada, fundo `--gold-dim` e o círculo fica preenchido em `--gold2` com borda dourada clara. Clicar em outra opção troca a seleção, só uma opção fica selecionada por pergunta.

Navegação: linha com 22px de respiro acima, `Voltar` à esquerda e `Continuar` à direita. Voltar é botão fantasma, borda `--line2`, texto `--muted`. Na pergunta 1, o Voltar fica invisível, mas continua ocupando o espaço, para o Continuar não mudar de lugar. Continuar é dourado, peso 800, altura mínima de 48px, e fica desabilitado, com opacidade de .4, enquanto nenhuma opção estiver marcada. Voltar para uma pergunta já respondida mantém a resposta marcada e o Continuar habilitado. Na pergunta 7, o texto do botão Continuar muda para `Ver o que falta`, e clicar nele leva para a tela de e-mail, não para o resultado.

---

# AS 7 PERGUNTAS

## 14. Perguntas 1 a 4, textos exatos

Cada pergunta tem área, aula ligada, pergunta e dica. Copiar tudo letra por letra. A área aparece no topo da tela e na tela de resultado, a aula aparece no resultado.

**Pergunta 1, área `Login e sessão`, Aula 01**
- Pergunta: `Você já testou o que acontece quando o usuário erra a senha, pede para recuperar a conta ou fica com a sessão expirada?`
- Dica: `Não vale só o login feliz, o problema mora no erro e na volta.`

**Pergunta 2, área `Pagamento e checkout`, Aula 02**
- Pergunta: `Você já simulou um cartão recusado no seu checkout para ver o que acontece com a cobrança e com o acesso do cliente?`
- Dica: `Pagamento que falha é onde SaaS novo mais cobra errado ou libera sem pagar.`

**Pergunta 3, área `Salvamento e perda de dados`, Aula 03**
- Pergunta: `Depois de salvar algo no seu SaaS, você já atualizou a página, fechou tudo e voltou para conferir se continuou lá?`
- Dica: `Dado que some sem aviso é o bug que o cliente menos perdoa.`

**Pergunta 4, área `Permissões e acesso`, Aula 04**
- Pergunta: `Você já tentou acessar dados de outra conta, trocando o endereço da página ou entrando como usuário comum em área restrita?`
- Dica: `O vazamento mais comum não é invasão, é permissão que ninguém testou.`

## 15. Perguntas 5 a 7, opções e pontuação

**Pergunta 5, área `Fluxo principal ponta a ponta`, Aula 05**
- Pergunta: `Você já fez a jornada completa como um cliente novo, cadastro, primeiro uso e pagamento, sem pular nenhuma etapa?`
- Dica: `Testar tela por tela esconde o bug que mora entre as telas.`

**Pergunta 6, área `Erros e casos limite`, Aula 06**
- Pergunta: `Você já enviou formulários vazios, clicou duas vezes no botão de pagar ou simulou a internet caindo no meio de um envio?`
- Dica: `Seu usuário vai fazer tudo isso, a pergunta é como seu SaaS responde.`

**Pergunta 7, área `Mobile e navegadores`, Aula 07**
- Pergunta: `Você já abriu seu SaaS no celular e em um navegador diferente do seu para conferir se funciona do mesmo jeito?`
- Dica: `Seu cliente não usa o seu computador, nem o seu navegador, nem a sua internet.`

### As 3 opções, iguais nas 7 perguntas, nesta ordem

| Opção exata | Pontos | Status que gera no resultado |
|---|---|---|
| Sim, já testei isso de verdade | 2 | Conferido |
| Testei só o caminho normal, sem erro | 1 | Parcial |
| Nunca testei isso | 0 | Descoberto |

Pontuação total: soma das 7 respostas, de 0 a 14. Pergunta sem resposta vale zero no cálculo e, na prática, o fluxo não deixa avançar sem responder.

---

# E-MAIL E RESULTADO

## 16. Tela de e-mail, antes do resultado

Depois da pergunta 7, o quiz mostra a tela de e-mail. O resultado só aparece depois de um e-mail válido. Textos exatos:

- Topo, à esquerda, em fonte mono dourada: `SEU RESULTADO ESTÁ PRONTO`
- Topo, à direita: `Falta só o e-mail`
- Título da tela: `Onde eu te mostro o diagnóstico?`
- Texto: `Deixe seu e-mail para ver a pontuação completa, com suas áreas descobertas e as aulas prioritárias para o seu caso.`
- Placeholder do campo: `seu melhor e-mail`
- Botão do formulário: `Ver meu diagnóstico`
- Nota abaixo do formulário: `Seu resultado aparece na tela assim que você confirmar.`

Barra de progresso desta tela: 100%. Campo de e-mail com tipo email, preenchimento automático de e-mail ligado, rótulo acessível `Seu e-mail para ver o diagnóstico`. O formulário fica dentro de um painel com fundo `--bg2`, borda `--line2` e raio de 14px, o mesmo estilo visual das caixas de formulário da página.

Validação: o e-mail precisa ter texto antes da arroba, arroba, domínio, ponto e pelo menos 2 caracteres depois do ponto, sem espaços. Na prática, a expressão de validação é:

```
/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
```

Com e-mail inválido, aparece a mensagem de erro abaixo do campo, em vermelho, 13.5px, peso 600, o foco volta para o campo e o resultado não aparece. Texto exato do erro:

> Confira o e-mail digitado, parece que falta alguma coisa nele.

Com e-mail válido, o erro some e a tela de resultado aparece na hora, na mesma tela do celular.

Observação técnica: nesta versão aprovada, o e-mail é validado e exibido na tela de resultado, mas ainda não é gravado em nenhum serviço. Ligar a captura a uma ferramenta de e-mail é uma etapa posterior, fora desta reconstrução visual e de fluxo.

## 17. Tela de resultado

Topo, à esquerda, em fonte mono dourada: `SEU DIAGNÓSTICO`. À direita, o e-mail que a pessoa digitou, em fonte mono.

Pontuação: número grande, 56px, peso 900, seguido de `/14` em 22px, cor `--muted`. Ao lado do número, o título da faixa, 19px, peso 800, cor `--gold2`, e abaixo o texto da faixa, 14.5px, cor `--muted`.

Abaixo, a lista das 7 áreas, na ordem das perguntas, e depois as aulas prioritárias e os botões.

## 18. As 3 faixas de pontuação, limites exatos

| Pontos | Título exato da faixa | Texto exato da faixa |
|---|---|---|
| 0 a 4 | Lançamento em risco | A maior parte das áreas críticas nunca foi conferida. Se um cliente encontrar esses bugs antes de você, ele encontra todos de uma vez. |
| 5 a 9 | Base parcial, buracos abertos | Você confere o caminho normal, mas os erros, os casos limite e as permissões continuam descobertos, que é onde o SaaS quebra. |
| 10 a 14 | Quase pronto, feche as lacunas | Sua base de conferência é boa. O que falta é transformar isso em método, para repetir a conferência inteira a cada lançamento. |

### Status por área

Lista sem marcadores, linhas separadas por borda tracejada, respiro vertical de 10px. Cada linha tem, nesta ordem: quadrado de status de 24px, o nome da área em negrito seguido do rótulo em minúsculas, e, encostado à direita, a aula em fonte mono dourada, 12px, em maiúsculas, por exemplo `AULA 01`.

| Resposta | Ícone | Rótulo exato | Estilo |
|---|---|---|---|
| 2 pontos | Sinal de verificação | Conferido, exibido na linha como `conferido` | Fundo verde translúcido, borda e ícone em `--green` |
| 1 ponto | Ponto central | Parcial, exibido na linha como `parcial` | Fundo `--gold-dim`, borda e ícone dourados |
| 0 pontos | Letra x | Descoberto, exibido na linha como `descoberto` | Fundo vermelho translúcido, borda e ícone em `--red` |

Exemplo de linha: ícone, `Login e sessão`, `conferido`, e à direita `AULA 01`.

### Aulas prioritárias

Área descoberta ou parcial é toda área com menos de 2 pontos. O parágrafo abaixo da lista muda conforme o caso:

**Com áreas abaixo de 2 pontos** (exemplo com áreas 1 e 2):

> Suas aulas prioritárias: Aula 01 (Login e sessão), Aula 02 (Pagamento e checkout). São exatamente essas áreas que o curso destrincha, com o prompt pronto e a conferência manual de cada uma.

A lista traz todas as áreas abaixo de 2 pontos, na ordem das aulas, no formato `Aula NN (Nome da área)`, separadas por vírgula, e a frase de apoio vem depois do ponto final da lista. O início, `Suas aulas prioritárias`, fica em negrito e na cor do texto principal.

**Sem nenhuma área abaixo de 2 pontos:**

> Nenhuma área descoberta. No curso, seu ganho é o método completo e a lista de liberação para repetir isso em todo lançamento.

O início, `Nenhuma área descoberta`, fica em negrito e na cor do texto principal.

### Botões e nota do resultado

- Botão dourado `Ver as aulas do curso`: fecha o modal e rola a página até a seção de aulas, âncora `#aulas`.
- Botão fantasma `Refazer o diagnóstico`: zera as respostas e volta direto para a pergunta 1, dentro do mesmo modal.
- Nota final, 12.5px, cor `--muted2`, 16px acima: `Guarde suas áreas descobertas, elas viram o seu plano de conferência antes do próximo lançamento.`

---

# O PROBLEMA E O FORMATO

## 19. Seção O problema, 2 cartões exatos

- Etiqueta: `O problema`
- H2: `Vibe coding acelerou a construção. A conferência ficou para trás.`
- Parágrafo: `Hoje qualquer founder monta um SaaS em semanas. Só que velocidade sem teste cria um tipo novo de bug, o bug que ninguém viu porque ninguém procurou.`

Grade de 2 colunas, 18px de espaço. Cartões com fundo `--panel`, borda `--line`, raio de 14px e respiro de 24px. Cada cartão abre com uma etiqueta mono de 11.5px em pílula pequena.

**Cartão 1**
- Etiqueta vermelha: `SEM TESTE`
- Título: `Quem descobre o bug é o cliente`
- Texto: `O agente diz que terminou, você publica, e o primeiro pagamento real falha, o primeiro cliente perde os dados que salvou, ou pior, enxerga os dados de outro cliente. A correção vem depois do estrago, com pressa e com o cliente já desconfiando do produto.`

**Cartão 2**
- Etiqueta verde: `COM OS 7 TESTES`
- Título: `Quem descobre o bug é você, antes`
- Texto: `Você roda uma conferência curta e metódica nas áreas que realmente quebram um SaaS. Cada falha aparece na sua tela, em ambiente de teste, com tempo de pedir a correção para o agente e conferir de novo. Lançar vira uma decisão, não uma aposta.`

## 20. Seção O formato de cada aula, 4 passos exatos

- Etiqueta: `O formato de cada aula`
- H2: `Não é teoria de QA. É um roteiro de trabalho.`
- Parágrafo: `Cada um dos 7 testes segue o mesmo formato, para você aplicar no seu produto no mesmo dia, mesmo sem escrever código na mão.`

Grade de 4 colunas, 14px de espaço. Cartões iguais aos do problema, respiro de 20px, número do passo em fonte mono dourada, 13px, título em 16.5px e texto em 14px, cor `--muted`:

| Passo | Título | Texto |
|---|---|---|
| PASSO 1 | Onde você está tocando | Qual área do seu SaaS aquele teste cobre, pagamento, login, dados, permissões, e onde o risco mora nela. |
| PASSO 2 | Por que testar isso | O que quebra se essa área falhar, traduzido para a linguagem do founder, venda perdida, dado perdido, cliente perdido. |
| PASSO 3 | O prompt pronto | Um prompt completo para colar no seu agente e pedir a implementação ou a correção do teste, sem você precisar saber programá-lo. |
| PASSO 4 | A conferência manual | O passo a passo curto, na tela, para você mesmo confirmar se funcionou. Porque o agente diz que fez, mas quem valida é você. |

---

# CONTEÚDO DO CURSO

## 21. Aulas 00 a 03, textos exatos

- Etiqueta: `Conteúdo do curso`
- H2: `8 aulas, uma introdução e os 7 testes`
- Parágrafo: `Toque em cada aula para ver o que ela cobre. Aulas curtas, sem enrolação, cada uma termina com a conferência feita no seu próprio produto.`

Estrutura do acordeão: caixa única com borda `--line2`, raio de 14px, fundo `--panel`, aulas separadas por borda inferior. Cada linha de aula é um botão de largura total, respiro de 18px por 20px, altura mínima de 64px, com o número em um quadrado mono dourado de 44px, título em 16.5px, subtítulo em 13.5px na cor `--muted` e um sinal de mais à direita, que gira 45 graus quando a aula está aberta. O corpo aberto tem respiro à esquerda de 80px no desktop e 20px no celular. Comportamento completo na seção 23.

**Aula 00**, título: `Introdução, por que SaaS feito com IA quebra diferente`
- Subtítulo: `O erro não está no código que você vê, está no que ninguém conferiu`
- Texto interno: `Software feito com agente falha de um jeito próprio, o agente resolve o que foi pedido e não avisa o que ficou de fora, caso limite, erro de pagamento, permissão aberta. Nesta aula você entende esse padrão, monta seu ambiente de conferência e aprende a ordem certa de testar antes de qualquer lançamento.`
- Etiquetas: `AULA DE ABERTURA` (dourada), `MAPA DOS 7 TESTES`, `AMBIENTE DE TESTE`

**Aula 01**, título: `Login e sessão`
- Subtítulo: `Se o usuário não entra, nada mais importa`
- Texto interno: `Login é a porta do seu SaaS, e porta quebrada não aparece no seu teste rápido, aparece para o cliente às 22h de um domingo. Você confere cadastro, login, logout, recuperação de senha, sessão que expira e o que acontece quando o usuário tenta entrar duas vezes ou com a senha errada.`
- Etiquetas: `ÁREA, AUTENTICAÇÃO`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

**Aula 02**, título: `Pagamento e checkout`
- Subtítulo: `A área onde um bug vira prejuízo na hora`
- Texto interno: `Pagamento aprovado, pagamento recusado, assinatura que renova, assinatura que cancela, reembolso. Você testa o caminho do dinheiro inteiro, incluindo o cartão que falha, porque é justamente no erro que os SaaS novos cobram errado, liberam acesso sem pagar ou bloqueiam quem pagou.`
- Etiquetas: `ÁREA, RECEITA`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

**Aula 03**, título: `Salvamento e perda de dados`
- Subtítulo: `O usuário confia que o que salvou vai estar lá`
- Texto interno: `Criar, editar, apagar e recarregar. Você confere se tudo que o usuário salva sobrevive a atualizar a página, fechar e voltar, editar duas vezes e apagar sem querer. Perder dado do cliente é o bug que menos se perdoa, e um dos mais simples de prevenir.`
- Etiquetas: `ÁREA, DADOS`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

## 22. Aulas 04 a 07, textos exatos

**Aula 04**, título: `Permissões e acesso`
- Subtítulo: `Um cliente nunca pode ver o que é de outro`
- Texto interno: `O vazamento mais comum em SaaS feito rápido não é invasão, é permissão que ninguém testou, trocar um número na URL e abrir a conta de outra pessoa. Você aprende a testar papéis de usuário, acesso de administrador e isolamento entre contas, do jeito que um testador profissional faz.`
- Etiquetas: `ÁREA, SEGURANÇA BÁSICA`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

**Aula 05**, título: `Fluxo principal ponta a ponta`
- Subtítulo: `A jornada completa, na ordem do cliente`
- Texto interno: `Testar tela por tela esconde o bug que mora entre as telas. Nesta aula você percorre a jornada inteira como um cliente novo, cadastro, primeiro uso, pagamento e resultado final, e descobre onde a experiência quebra no meio do caminho.`
- Etiquetas: `ÁREA, JORNADA DO CLIENTE`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

**Aula 06**, título: `Erros e casos limite`
- Subtítulo: `Seu usuário vai fazer tudo que você não imaginou`
- Texto interno: `Campo vazio, texto gigante, clique duplo no botão de pagar, internet que cai no meio do envio. Você testa o comportamento do seu SaaS quando algo dá errado, para ele responder com uma mensagem clara em vez de uma tela quebrada ou uma cobrança duplicada.`
- Etiquetas: `ÁREA, RESILIÊNCIA`, `PROMPT INCLUSO` (dourada), `CHECKLIST MANUAL`

**Aula 07**, título: `Mobile, navegadores e o lançamento`
- Subtítulo: `Conferir onde seu cliente realmente acessa`
- Texto interno: `Seu cliente abre no celular, no navegador que ele já usa, com a internet que ele tem. Na aula final você confere responsivo, navegadores principais e velocidade percebida, e monta sua lista final de liberação, o ritual de conferência para repetir em todo lançamento daqui para frente.`
- Etiquetas: `ÁREA, EXPERIÊNCIA FINAL`, `PROMPT INCLUSO` (dourada), `LISTA DE LIBERAÇÃO`


## 23. Comportamento do acordeão e rodapé do currículo

Só uma aula aberta por vez. Abrir uma aula fecha qualquer outra que esteja aberta. Clicar na aula já aberta fecha essa aula. A introdução, Aula 00, abre por padrão quando a página carrega. As outras 7 começam fechadas. O estado aberto e fechado é refletido no atributo de acessibilidade do botão, `aria-expanded`. As etiquetas de cada aula são pílulas mono de 12px, borda `--line2`, texto `--muted`. A etiqueta marcada como dourada usa texto `--gold2` e borda dourada translúcida.

Rodapé do currículo, abaixo do acordeão, 3 itens em linha com quebra quando preciso, 14px, cor `--muted`, destaques na cor do texto principal. Textos exatos:

- `8 aulas, introdução mais os 7 testes`
- `Em cada aula, o prompt pronto e a conferência manual`
- `Feito para quem constrói com IA, sem base em QA`

---

# PARA QUEM É

## 24. Para quem é e para quem não é, listas exatas

- Etiqueta: `Para quem é`
- H2: `Feito para founder que constrói, não para quem estuda QA`

Grade de 2 colunas, 18px de espaço. Cartão positivo com borda verde translúcida, cartão negativo com borda vermelha translúcida, ambos com fundo `--panel`, raio de 14px e respiro de 24px. Itens em 15px, cor `--muted`, separados por borda tracejada, com o símbolo à esquerda, certo verde no cartão positivo e x vermelho no negativo.

**Este curso é para você se**
- Você está criando um SaaS com IA, vibe coding ou agente de código
- Você vai lançar, ou já lançou, sem ninguém testando além de você
- Seu maior medo é quebrar em produção na frente dos primeiros clientes
- Você quer um método curto de conferência, para repetir em todo lançamento

**Não é para você se**
- Você quer uma formação completa em QA ou preparação para certificação
- Você procura automação avançada de testes e frameworks de código
- Seu produto já tem uma equipe de qualidade dedicada
- Você quer promessa de resultado financeiro, aqui não tem nenhuma

## 25. Seção Quem ensina, abertura exata

- Etiqueta: `Quem ensina`
- H2: `Autoridade de verdade, sem número inventado`
- Parágrafo: `Você vai ver por aí curso vendido com print de faturamento e promessa de resultado. Aqui a credibilidade é outra, é trabalho real, verificável, feito todos os dias.`

Bloco do instrutor em grade de 2 colunas, cartão de 300px e texto ao lado, 28px de espaço, fundo `--panel`, borda `--line2`, raio de 14px, respiro de 28px, alinhado pelo topo.

---

# QUEM ENSINA

## 26. Cartão do instrutor e texto, exatos

### Cartão, coluna da esquerda

Cartão interno com fundo `--bg2`, borda `--line2`, raio de 12px, respiro de 22px. No topo, um círculo dourado de 64px por 64px com as iniciais `HP`, texto `#141310`, peso 900, 22px. Depois o nome em 18px, o cargo em 13.5px, cor `--gold2`, peso 600, e a lista com itens de 13.5px, cor `--muted`, separados por borda tracejada superior.

- Nome: `Herbert Parasio`
- Cargo: `SQA Team Lead, BMM Test Labs, Canadá`
- Lista:
  1. `Team Lead de QA em laboratório de testes no Canadá, com software que não pode ir ao ar com erro`
  2. `95% de aprovação na primeira verificação dos produtos testados nos últimos 6 meses`
  3. `Reduziu uma triagem de bugs de 3 dias para menos de 24 horas`
  4. `Certificado CTFL, ISTQB, em 2026`
  5. `Mais de 10 anos em TI, de desenvolvedor full stack a líder de QA`

### Texto, coluna da direita

Parágrafos em 16px, cor `--muted`, com os destaques na cor do texto principal. Três parágrafos e, no fim, uma citação com borda esquerda dourada de 3px, respiro à esquerda de 16px, 17px, peso 600, cor do texto principal.

> Eu trabalho testando software que não pode ir ao ar com erro. No laboratório onde lidero a área de QA, cada produto passa por uma verificação rigorosa antes de qualquer liberação, e cada problema encontrado volta para quem desenvolveu corrigir, com o processo rodando até ficar certo.

> É esse olhar que falta no SaaS feito com IA. Não é falta de código, o agente entrega código o dia inteiro. É falta de alguém conferindo o que importa, na ordem certa, antes do cliente. Foi exatamente esse método, simplificado para quem não é de QA, que virou as 7 aulas deste curso.

> Nada aqui é teoria de livro. É o mesmo raciocínio de priorização e conferência que eu uso no trabalho, traduzido para a realidade de quem constrói sozinho, com agente, e precisa lançar sem medo.

Citação:

> Eu não tenho coragem de inventar número para parecer autoridade. O que eu tenho é o trabalho, e é ele que está nestas aulas.

Conferir a regra da verdade neste bloco: o texto diz verificar, liderar a área de QA e devolver o problema para quem desenvolveu corrigir. Ele não diz aprovar, certificar ou liberar produto para o mercado.

---

# PERGUNTAS FREQUENTES

## 27. FAQ, as 5 perguntas e respostas exatas

- Etiqueta: `Perguntas frequentes`
- H2: `Tire suas dúvidas`

Caixa única com borda `--line2`, raio de 14px, fundo `--panel`, itens separados por borda inferior. Cada pergunta é um botão de largura total, texto à esquerda, peso 700, 16px, respiro de 18px por 20px, altura mínima de 60px, com um sinal de mais dourado à direita. A resposta fica escondida até abrir, em 15px, cor `--muted`, largura máxima de 52em, respiro inferior de 18px. Comportamento: só um item aberto por vez, abrir um fecha os outros, clicar no item aberto fecha esse item, e o FAQ começa com todos os itens fechados.

1. **Preciso saber programar para fazer o curso?**
   Não. O curso foi desenhado para quem constrói com agente. Em cada aula, o prompt pronto faz a parte técnica com a sua LLM, e a conferência manual é feita na tela, clicando e observando, sem escrever código.

2. **Funciona com a ferramenta que eu uso?**
   Sim. Os prompts e as conferências não dependem de uma ferramenta específica. Servem para Cursor, Claude, Copilot, ChatGPT e qualquer outro agente ou LLM que você já use para construir seu SaaS.

3. **Quando o curso lança e quanto vai custar?**
   O curso está em produção e será lançado quando estiver completo, com data e preço publicados aqui. Enquanto isso, o diagnóstico já mostra quais áreas do seu SaaS precisam de atenção primeiro.

4. **O diagnóstico é gratuito?**
   Sim. São 7 perguntas, leva cerca de 1 minuto, e o resultado aparece na tela com sua pontuação de 0 a 14 e o status de cada área. Pedimos seu e-mail antes de mostrar o resultado, só isso.

5. **Eu já lancei meu SaaS. Ainda faz sentido?**
   Faz, e talvez faça ainda mais. Os 7 testes viram um ritual de conferência para cada nova versão, cada nova funcionalidade e cada correção que o agente entregar. Produto lançado quebra em atualização do mesmo jeito que quebra em lançamento.

Não acrescentar pergunta sobre lista de espera, desconto, garantia ou preço fechado. Preço e data não existem nesta versão da página.

---

# FECHAMENTO DA PÁGINA

## 28. CTA final, rodapé e barra fixa do celular

### CTA final

Bloco final com fundo `--bg2`, borda superior, brilho radial dourado suave no topo central, respiro vertical de 70px. Conteúdo centralizado, largura máxima de 640px. Textos exatos:

- Etiqueta: `Diagnóstico rápido`
- H2: `Seu próximo lançamento não precisa ser uma aposta`
- Parágrafo: `Faça o diagnóstico, 7 perguntas em cerca de 1 minuto, e veja sua pontuação, suas áreas descobertas e as aulas que atacam exatamente o seu risco. Melhor você encontrar o bug agora do que o seu primeiro cliente encontrar por você.`
- Botão grande dourado, 26px abaixo do parágrafo: `Fazer o diagnóstico`

### Rodapé

Rodapé com borda superior, respiro de 26px em cima e 90px embaixo, este respiro maior existe para o conteúdo não ficar atrás da barra fixa no celular. Texto em 13px, cor `--muted2`, dois blocos em linha, um à esquerda e um à direita, com quebra quando preciso. Textos exatos:

- À esquerda: `UNFLAKY, Quality Lab, Herbert Parasio`
- À direita: `Mini curso em produção. Conteúdo baseado em experiência real de QA, sem resultados financeiros prometidos ou inventados.`

### Barra fixa do celular

Escondida no desktop. Visível só até 620px. Fixa na parte inferior, de ponta a ponta, camada 60, fundo `rgba(18,19,22,.97)`, borda superior `--line2`, respiro de 10px por 16px, mais a área segura do aparelho na parte inferior. Dentro, um único botão dourado de largura total, altura mínima de 48px, raio de 9px, peso 800, 15px, texto exato: `Fazer o diagnóstico`. Ele abre o quiz direto na pergunta 1, igual a todos os outros.

## 29. O que não existe na página, lista de espera zero

Não existe nenhuma lista de espera em lugar nenhum. Sem formulário de lista de espera, sem campo de e-mail solto, sem texto de entrar na lista, avise-me ou garanta sua vaga, e sem botão com esse sentido.

Conferir um por um, porque versões antigas tinham lista de espera nestes lugares: hero, caixa do hero, CTA final, header, barra fixa do celular, FAQ e rodapé. Em todos eles, o CTA correto agora é `Fazer o diagnóstico`.

O único e-mail pedido na página inteira é o da tela de e-mail do quiz, depois das 7 perguntas e antes do resultado. Motivo: a página só vai ao ar quando o curso já estiver pronto, então não há o que esperar.

---

# RESPONSIVIDADE

## 30. Quebras em 900px e 620px, o que muda em cada uma

### Acima de 900px, desktop completo

Hero em 2 colunas, provas em 4 colunas, formato em 4 colunas, instrutor em 2 colunas com cartão de 300px. Modal do quiz com quadro de celular de 400px centralizado sobre a página escurecida. Sem barra fixa inferior. Botão do header visível.

### Até 900px

Hero vira 1 coluna, o cartão de conferência vai para baixo dos textos e da caixa de CTA. Faixa de provas vira 2 colunas, sem borda à esquerda, com borda superior entre as linhas, e os 2 primeiros itens sem borda superior. Formato de cada aula vira 2 colunas. Bloco do instrutor vira 1 coluna, cartão acima do texto. Corpo das aulas perde o recuo grande, respiro à esquerda de 20px. Problema, público e as demais grades de 2 colunas continuam em 2 colunas nesta faixa, elas só quebram em 620px.

### Até 620px, celular

Seções O problema e Para quem é viram 1 coluna. Formato de cada aula vira 1 coluna. Linhas de formulário viram coluna, com o botão em largura total. Isso vale para o formulário de e-mail do quiz. Barra fixa inferior aparece, com o botão Fazer o diagnóstico. Botão do header some. Modal do quiz sem respiro externo, quadro em tela cheia, 100dvh, sem borda e sem raio, tela interna sem raio. Caixa de CTA da seção de diagnóstico com respiro menor, 22px. Respiro das seções cai para 48px, e o do hero para 38px em cima e 40px embaixo.

### Acessibilidade e movimento

Com a preferência de movimento reduzido ligada, a rolagem suave é desligada e a rotação do sinal das aulas perde a animação. Campos com foco visível, contorno dourado de 2px. Botões de acordeão e do quiz com estado de acessibilidade atualizado. Áreas de toque de pelo menos 48px de altura, com as exceções medidas do botão do header, 44px, e do botão de fechar do modal, 34px.

## 31. Comportamento técnico geral

Página estática, um único arquivo HTML com CSS e JavaScript embutidos, sem servidor, sem banco de dados e sem dependência de backend para o fluxo funcionar. Nenhuma imagem externa é necessária. O único gráfico é o escudo da Unflaky em SVG embutido no header.

Âncoras internas: `#topo` no conteúdo principal, `#diagnostico` na seção do diagnóstico e `#aulas` na seção do curso. Ícone da aba vazio, declarado como data URI vazia, e meta de viewport com `viewport-fit=cover`. Nenhum erro de console, nenhum elemento vazando para fora da tela no celular e nenhum texto cortado nas quebras de 900px e 620px.

---

# ACEITAÇÃO

## 32. Checklist de aceitação, conferir item por item

### Visual e textos
- Fundo escuro com as cores hexadecimais da seção 5, sem cor substituída por aproximação.
- Fontes Archivo e IBM Plex Mono carregando, mono só nas etiquetas e detalhes.
- Conteúdo centralizado em 1120px, header fixo, escudo dourado inteiro ao lado de UNFLAKY e QUALITY LAB, no desktop e no celular.
- Hero com etiqueta, título com o fim em dourado, 2 subtítulos e caixa de CTA sem campo de e-mail.
- Cartão de conferência com as 5 linhas, os 3 tipos de status e o rodapé com 2 falhas e CUSTO: R$ 0 em cliente perdido.
- Faixa de provas com os 4 itens exatos, 10+ anos, 3 dias para 24h, 98% no prazo e CTFL 2026.
- Nenhum travessão em nenhum texto da página. Nenhum número, depoimento ou promessa que não esteja nesta especificação.
- Nenhuma lista de espera, em nenhum lugar, ver seção 29.

### Quiz e modal
- Todos os botões Fazer o diagnóstico abrem o modal direto na pergunta 1, sem tela intermediária, em qualquer ponto da página.
- Desktop: modal centralizado, página escurecida atrás, quadro de 400px, raio de 40px, notch no topo, X visível.
- Celular: quiz em tela cheia, 100dvh, sem borda e sem raio.
- Fecha pelo X, clicando fora e com Esc. Rolagem da página trava com o modal aberto.
- 7 perguntas na ordem, com área, dica e as 3 opções exatas, Continuar desabilitado sem resposta, Voltar invisível na pergunta 1, e Ver o que falta na pergunta 7.
- Barra de progresso andando de 0% até 100% na tela de e-mail.
- E-mail inválido mostra o erro exato e não libera o resultado. E-mail válido mostra o resultado na hora.
- Teste de pontuação 1: responder tudo com a primeira opção dá 14 pontos, faixa Quase pronto, feche as lacunas, e todas as áreas como Conferido.
- Teste de pontuação 2: responder tudo com a última opção dá 0 ponto, faixa Lançamento em risco, todas as áreas como Descoberto e as 7 aulas listadas como prioritárias.
- Teste de pontuação 3: misturar respostas e conferir se cada área mostra Conferido, Parcial ou Descoberto conforme os pontos 2, 1 e 0, e se as prioritárias são só as áreas abaixo de 2 pontos.
- Ver as aulas do curso fecha o modal e rola até as aulas. Refazer o diagnóstico volta direto para a pergunta 1. Fechar e reabrir também recomeça na pergunta 1.

### Conteúdo e responsividade
- Acordeão do curso com as 8 aulas exatas, introdução aberta ao carregar, só uma aberta por vez.
- FAQ com as 5 perguntas exatas, só um item aberto por vez, todos fechados ao carregar.
- Cartão do instrutor com os 5 itens, os 3 parágrafos e a citação, sem linguagem de aprovação ou certificação de produto.
- Quebras conferidas em 900px e 620px, barra fixa só no celular, botão do header só fora do celular, e nada vazando ou cortado em nenhuma largura.

Se qualquer item deste checklist falhar, a reconstrução não está pronta, mesmo que o resto esteja igual. Os itens que mais costumam quebrar são o escudo cortado no topo, a tela intermediária antes da pergunta 1 e a volta de algum formulário de lista de espera.
