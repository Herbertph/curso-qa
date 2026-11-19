// Single source for every quiz string and every quiz number (spec §14 to §18).

export const OPTIONS = [
  { label: 'Sim, já testei isso de verdade', points: 2 },
  { label: 'Testei só o caminho normal, sem erro', points: 1 },
  { label: 'Nunca testei isso', points: 0 },
];

export const AREAS = [
  {
    area: 'Login e sessão',
    lesson: '01',
    question:
      'Você já testou o que acontece quando o usuário erra a senha, pede para recuperar a conta ou fica com a sessão expirada?',
    hint: 'Não vale só o login feliz, o problema mora no erro e na volta.',
  },
  {
    area: 'Pagamento e checkout',
    lesson: '02',
    question:
      'Você já simulou um cartão recusado no seu checkout para ver o que acontece com a cobrança e com o acesso do cliente?',
    hint: 'Pagamento que falha é onde SaaS novo mais cobra errado ou libera sem pagar.',
  },
  {
    area: 'Salvamento e perda de dados',
    lesson: '03',
    question:
      'Depois de salvar algo no seu SaaS, você já atualizou a página, fechou tudo e voltou para conferir se continuou lá?',
    hint: 'Dado que some sem aviso é o bug que o cliente menos perdoa.',
  },
  {
    area: 'Permissões e acesso',
    lesson: '04',
    question:
      'Você já tentou acessar dados de outra conta, trocando o endereço da página ou entrando como usuário comum em área restrita?',
    hint: 'O vazamento mais comum não é invasão, é permissão que ninguém testou.',
  },
  {
    area: 'Fluxo principal ponta a ponta',
    lesson: '05',
    question:
      'Você já fez a jornada completa como um cliente novo, cadastro, primeiro uso e pagamento, sem pular nenhuma etapa?',
    hint: 'Testar tela por tela esconde o bug que mora entre as telas.',
  },
  {
    area: 'Erros e casos limite',
    lesson: '06',
    question:
      'Você já enviou formulários vazios, clicou duas vezes no botão de pagar ou simulou a internet caindo no meio de um envio?',
    hint: 'Seu usuário vai fazer tudo isso, a pergunta é como seu SaaS responde.',
  },
  {
    area: 'Mobile e navegadores',
    lesson: '07',
    question:
      'Você já abriu seu SaaS no celular e em um navegador diferente do seu para conferir se funciona do mesmo jeito?',
    hint: 'Seu cliente não usa o seu computador, nem o seu navegador, nem a sua internet.',
  },
];

export const BANDS = [
  {
    min: 0,
    max: 4,
    title: 'Lançamento em risco',
    text: 'A maior parte das áreas críticas nunca foi conferida. Se um cliente encontrar esses bugs antes de você, ele encontra todos de uma vez.',
  },
  {
    min: 5,
    max: 9,
    title: 'Base parcial, buracos abertos',
    text: 'Você confere o caminho normal, mas os erros, os casos limite e as permissões continuam descobertos, que é onde o SaaS quebra.',
  },
  {
    min: 10,
    max: 14,
    title: 'Quase pronto, feche as lacunas',
    text: 'Sua base de conferência é boa. O que falta é transformar isso em método, para repetir a conferência inteira a cada lançamento.',
  },
];

export const STATUS = {
  2: { label: 'conferido', icon: 'check' },
  1: { label: 'parcial', icon: 'dot' },
  0: { label: 'descoberto', icon: 'x' },
};

export const QUESTIONS_COPY = {
  areaLabel: 'ÁREA',
  ofSeven: 'DE 7',
  counter: (n) => `Pergunta ${n} de 7`,
  back: 'Voltar',
  next: 'Continuar',
  last: 'Ver o que falta',
};

export const EMAIL_COPY = {
  eyebrow: 'SEU RESULTADO ESTÁ PRONTO',
  counter: 'Falta só o e-mail',
  title: 'Onde eu te mostro o diagnóstico?',
  text: 'Deixe seu e-mail para ver a pontuação completa, com suas áreas descobertas e as aulas prioritárias para o seu caso.',
  label: 'Seu e-mail para ver o diagnóstico',
  placeholder: 'seu melhor e-mail',
  button: 'Ver meu diagnóstico',
  note: 'Seu resultado aparece na tela assim que você confirmar.',
  error: 'Confira o e-mail digitado, parece que falta alguma coisa nele.',
};

export const RESULT_COPY = {
  eyebrow: 'SEU DIAGNÓSTICO',
  priorityIntro: 'Suas aulas prioritárias',
  priorityOutro:
    'São exatamente essas áreas que o curso destrincha, com o prompt pronto e a conferência manual de cada uma.',
  noneTitle: 'Nenhuma área descoberta',
  noneText:
    'No curso, seu ganho é o método completo e a lista de liberação para repetir isso em todo lançamento.',
  lessonsButton: 'Ver as aulas do curso',
  redoButton: 'Refazer o diagnóstico',
  note: 'Guarde suas áreas descobertas, elas viram o seu plano de conferência antes do próximo lançamento.',
};
