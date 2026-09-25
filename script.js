// ====== CONFIGURAÇÃO ======
const TOTAL_PERGUNTAS = 10; // mínimo recomendado: 10

// Banco de perguntas: [pergunta, resposta CORRETA, errada 1, errada 2, errada 3, explicação]
// Tema: Vacinas: treinando o sistema imunológico
// Adicione quantas quiser: quanto maior o banco, mais variado o quiz.
const BANCO = [
  ["Qual é a principal função de uma vacina?", "Preparar o sistema imunológico para combater um agente infeccioso", "Curar uma doença já instalada", "Substituir os antibióticos", "Eliminar todos os vírus do corpo", "A vacina apresenta ao corpo uma versão inofensiva do agente infeccioso, para que ele aprenda a se defender antes de encontrar a doença de verdade."],
  ["Como se chama a substância que estimula o corpo a produzir defesas?", "Antígeno", "Antibiótico", "Anticoagulante", "Hormônio", "O antígeno é a parte do microrganismo que o sistema imunológico reconhece como estranha; é ele que treina as defesas na vacina."],
  ["Quais células do sangue produzem anticorpos?", "Linfócitos B", "Hemácias", "Plaquetas", "Neurônios", "Os linfócitos B se transformam em plasmócitos, células que produzem os anticorpos."],
  ["Quem desenvolveu a primeira vacina, contra a varíola, em 1796?", "Edward Jenner", "Louis Pasteur", "Alexander Fleming", "Oswaldo Cruz", "Em 1796, Edward Jenner usou material da varíola bovina para proteger contra a varíola humana, dando origem à vacinação."],
  ["Quem liderou a campanha de vacinação contra a varíola no Rio de Janeiro, em 1904, que gerou a Revolta da Vacina?", "Oswaldo Cruz", "Carlos Chagas", "Vital Brazil", "Adolfo Lutz", "Oswaldo Cruz, então diretor de Saúde Pública, liderou a campanha. A vacinação obrigatória contra a varíola motivou a Revolta da Vacina, em 1904."],
  ["Qual doença foi erradicada do mundo graças à vacinação?", "Varíola", "Sarampo", "Poliomielite", "Gripe", "A varíola foi declarada erradicada em 1980, resultado de uma grande campanha mundial de vacinação."],
  ["Qual é o programa brasileiro que oferece vacinas gratuitas pelo SUS?", "Programa Nacional de Imunizações (PNI)", "Bolsa Família", "Farmácia Popular", "Mais Médicos", "O PNI, criado em 1973, oferece vacinas gratuitas pelo SUS para pessoas de todas as idades."],
  ["Qual personagem é símbolo das campanhas de vacinação no Brasil?", "Zé Gotinha", "Zé Carioca", "Jeca Tatu", "Cebolinha", "O Zé Gotinha foi criado em 1986 para as campanhas contra a poliomielite e virou símbolo da vacinação no país."],
  ["O que é a memória imunológica?", "A capacidade do corpo de responder mais rápido a um agente que já enfrentou", "A capacidade de decorar o nome das vacinas", "Um tipo de vacina", "Um remédio para dor de cabeça", "Depois do primeiro contato, o corpo guarda células de memória que reagem mais rápido e com mais força numa nova exposição."],
  ["O que é imunidade coletiva (ou de rebanho)?", "Quando grande parte da população está imune e o agente circula menos", "Quando só uma pessoa da família se vacina", "Quando ninguém precisa mais de vacina", "Quando a doença fica mais forte", "Quando muita gente está imune, o agente encontra poucos hospedeiros e circula menos, o que também protege quem não pode se vacinar."],
  ["Qual tipo de microrganismo causa o sarampo?", "Vírus", "Bactéria", "Fungo", "Protozoário", "O sarampo é causado por um vírus muito contagioso, por isso é essencial manter alta a cobertura vacinal."],
  ["Por que é importante completar todas as doses de uma vacina?", "Para garantir proteção adequada e duradoura", "Porque cada dose diminui a eficácia", "Porque a vacina só funciona depois de cinco anos", "Porque a dose extra cura a doença", "Algumas vacinas precisam de mais de uma dose para que o corpo forme uma memória imunológica forte e duradoura."],
  ["A vacina BCG protege principalmente contra formas graves de qual doença?", "Tuberculose", "Sarampo", "Hepatite B", "Gripe", "A BCG protege principalmente contra as formas graves da tuberculose em crianças, como a meníngea e a miliar."],
  ["A vacina tríplice viral protege contra quais doenças?", "Sarampo, caxumba e rubéola", "Tétano, difteria e coqueluche", "Dengue, zika e chikungunya", "Hepatite A, B e C", "A tríplice viral reúne em uma só vacina a proteção contra sarampo, caxumba e rubéola."],
  ["A vacina \"gotinha\" (Sabin) protege contra qual doença?", "Poliomielite (paralisia infantil)", "Varíola", "Raiva", "Febre amarela", "A gotinha das campanhas protege contra a poliomielite, doença que pode causar paralisia."],
  ["Por que a vacina da gripe precisa ser tomada todo ano?", "Porque o vírus influenza sofre mutações e muda com frequência", "Porque a vacina só funciona por uma semana", "Porque a gripe é causada por bactérias", "Porque o corpo esquece a vacina em um mês", "O vírus influenza sofre mutações e muda de um ano para outro; por isso a vacina é atualizada e precisa ser repetida."],
  ["A produção de anticorpos estimulada por uma vacina é um exemplo de:", "Imunidade ativa", "Imunidade passiva", "Alergia", "Inflamação crônica", "Na imunidade ativa, o próprio corpo produz as defesas depois de ser estimulado, como acontece com a vacina."],
  ["Os anticorpos que o bebê recebe da mãe pela placenta e pela amamentação são exemplo de:", "Imunidade passiva", "Imunidade ativa", "Vacinação", "Alergia", "Na imunidade passiva, o corpo recebe anticorpos prontos. É uma proteção temporária, como a que o bebê recebe da mãe."],
  ["Qual reação leve é comum após tomar uma vacina?", "Dor no local da aplicação e febre baixa", "Queda de cabelo", "Alteração do DNA", "Perda da visão", "Dor no local e febre baixa mostram que o sistema imunológico está reagindo e costumam passar em poucos dias."],
  ["As vacinas podem alterar o DNA humano?", "Não, elas não alteram o material genético", "Sim, todas alteram", "Sim, mas só em crianças", "Sim, mas só as feitas com vírus vivo", "Nenhuma vacina altera o DNA humano; elas apenas mostram ao sistema imunológico como reconhecer o agente."],
  ["O que contém uma vacina de vírus atenuado?", "Vírus enfraquecido, que estimula a defesa do corpo", "Vírus em sua força máxima", "Apenas água e açúcar", "Antibióticos", "Na vacina atenuada, o vírus é enfraquecido em laboratório: em geral não causa a doença em pessoas saudáveis, mas estimula a defesa."],
  ["Em qual órgão os linfócitos T amadurecem?", "Timo", "Pâncreas", "Fígado", "Bexiga", "Os linfócitos T se originam na medula óssea e amadurecem no timo, glândula localizada atrás do osso do peito."],
  ["Qual célula de defesa \"engole\" microrganismos, processo chamado fagocitose?", "Macrófago", "Neurônio", "Osteoblasto", "Hemácia", "Os macrófagos englobam e destroem microrganismos e ainda mostram pedaços deles aos linfócitos."],
  ["Qual é a primeira linha de defesa do organismo contra agentes infecciosos?", "Pele e mucosas", "Anticorpos", "Vacinas", "Linfócitos T", "A pele e as mucosas formam uma barreira física que dificulta a entrada de microrganismos antes mesmo de as células de defesa agirem."],
  ["A vacina contra o HPV ajuda a prevenir:", "Câncer do colo do útero, entre outros", "Tuberculose", "Dengue", "Tétano", "A vacina contra o HPV previne infecções por vírus que podem causar câncer do colo do útero, além de outros cânceres e verrugas genitais."],
  ["O que são anticorpos?", "Proteínas que reconhecem e neutralizam antígenos", "Vitaminas do sangue", "Hormônios do crescimento", "Glóbulos vermelhos", "Anticorpos são proteínas produzidas pelos linfócitos B que se ligam aos antígenos e ajudam a neutralizá-los."]
];

// ====== UTILITÁRIOS ======
const $ = id => document.getElementById(id);

const LOGO_PADRAO = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#1e4fd8"/>' +
  '<path d="M32 14 8 26l24 12 24-12z" fill="#fff"/><path d="M18 33v10c0 4 6 8 14 8s14-4 14-8V33l-14 7z" fill="#fff" opacity=".85"/></svg>'
);

// localStorage protegido (pode falhar em navegação privada)
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ====== PERSONALIZAÇÃO (logo, nome, cor) ======
// Ordem da logo: enviada pelo usuário > logo.png da pasta > brasão padrão
$("logo").onerror = function () { this.onerror = null; this.src = LOGO_PADRAO; };

function aplicarConfig() {
  const enviada = store.get("quiz_logo");
  if (enviada) $("logo").src = enviada;
  $("school").textContent = store.get("quiz_nome") || "LEGACY SCHOOL";
  const cor = store.get("quiz_cor") || "#1c2b5c";
  document.documentElement.style.setProperty("--ac", cor);
  $("colorIn").value = cor;
  $("nameIn").value = store.get("quiz_nome") || "";
}
aplicarConfig();

$("nameIn").oninput = e => { store.set("quiz_nome", e.target.value); aplicarConfig(); };
$("colorIn").oninput = e => { store.set("quiz_cor", e.target.value); aplicarConfig(); };
$("reset").onclick = () => {
  ["quiz_logo", "quiz_nome", "quiz_cor"].forEach(store.del);
  $("logo").src = "logo.png";
  aplicarConfig();
};
$("logoIn").onchange = e => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;
  const leitor = new FileReader();
  leitor.onload = () => {
    const img = new Image();
    img.onload = () => {
      const esc = Math.min(1, 256 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * esc; c.height = img.height * esc;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      store.set("quiz_logo", c.toDataURL("image/png"));
      aplicarConfig();
    };
    img.src = leitor.result;
  };
  leitor.readAsDataURL(arquivo);
};

// ====== SORTEIO ======
// Prioriza perguntas que NÃO saíram na tentativa anterior
function sortear() {
  let anteriores = [];
  try { anteriores = JSON.parse(store.get("quiz_ultimas") || "[]"); } catch (e) {}
  const todos = BANCO.map((_, i) => i);
  const novas = embaralhar(todos.filter(i => !anteriores.includes(i)));
  const repetidas = embaralhar(todos.filter(i => anteriores.includes(i)));
  const escolhidas = novas.concat(repetidas).slice(0, TOTAL_PERGUNTAS);
  store.set("quiz_ultimas", JSON.stringify(escolhidas));
  return embaralhar(escolhidas).map(i => {
    const b = BANCO[i];
    return { pergunta: b[0], correta: b[1], opcoes: embaralhar(b.slice(1, 5)), explica: b[5] || "" };
  });
}

// ====== FLUXO DO QUIZ ======
const TEMPO = 20;          // segundos por pergunta (quando o cronômetro está ligado)
const PONTOS_ACERTO = 100; // pontos por resposta certa
const BONUS_SEGUNDO = 5;   // bônus por cada segundo que sobrar
let perguntas = [], atual = 0, acertos = 0, pontos = 0, historico = [];
let usaTempo = true, restante = TEMPO, relogio = null, respondida = false;

// Modo equipes: cada pergunta alterna entre as duas equipes (turno = atual % 2)
let modoEquipes = false, nomesEquipes = ["Equipe 1", "Equipe 2"];
let placarPts = [0, 0], placarAcertos = [0, 0];
function turnoAtual() { return atual % 2; }

function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

function pararRelogio() { clearInterval(relogio); relogio = null; }
function desenharRelogio() {
  $("tleft").textContent = restante + "s";
  $("tfill").style.width = (restante / TEMPO * 100) + "%";
  $("tbar").classList.toggle("low", restante <= 5);
}
function iniciarRelogio() {
  pararRelogio(); restante = TEMPO; desenharRelogio();
  if (!usaTempo) return;
  relogio = setInterval(() => {
    restante--; desenharRelogio();
    if (restante <= 0) tempoEsgotado();
  }, 1000);
}

function iniciar() {
  usaTempo = $("timerOn").checked;
  store.set("quiz_timer", usaTempo ? "1" : "0");
  modoEquipes = $("modoEquipes").checked;
  store.set("quiz_modo", modoEquipes ? "1" : "0");
  if (modoEquipes) {
    nomesEquipes = [
      $("teamA").value.trim() || "Equipe 1",
      $("teamB").value.trim() || "Equipe 2"
    ];
    store.set("quiz_teamA", nomesEquipes[0]);
    store.set("quiz_teamB", nomesEquipes[1]);
  }
  placarPts = [0, 0]; placarAcertos = [0, 0];
  perguntas = sortear(); atual = 0; acertos = 0; pontos = 0; historico = [];
  $("start").classList.add("hide");
  $("end").classList.add("hide");
  $("quiz").classList.remove("hide");
  $("placar").classList.toggle("hide", !modoEquipes);
  $("pts").classList.toggle("hide", modoEquipes);
  mostrar();
}

function atualizarPlacarEquipes() {
  if (!modoEquipes) return;
  const t = turnoAtual();
  const boxes = [$("timeA"), $("timeB")];
  boxes.forEach((box, i) => {
    box.querySelector(".tn").textContent = nomesEquipes[i];
    box.querySelector(".tv").textContent = placarPts[i];
    box.classList.toggle("turno", i === t);
  });
  $("vezLabel").textContent = `Vez de\n${nomesEquipes[t]}`;
}

function mostrar() {
  const p = perguntas[atual];
  respondida = false;
  $("num").textContent = modoEquipes
    ? `Pergunta ${atual + 1} de ${perguntas.length} — vez de ${nomesEquipes[turnoAtual()]}`
    : `Pergunta ${atual + 1} de ${perguntas.length}`;
  $("pts").textContent = `Acertos: ${acertos} · Pontos: ${pontos}`;
  atualizarPlacarEquipes();
  $("prog").style.width = (atual / perguntas.length * 100) + "%";
  $("q").textContent = p.pergunta;
  $("fb").className = "fb hide";
  $("tbox").classList.toggle("hide", !usaTempo);
  $("next").disabled = true;
  $("next").textContent = atual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
  const caixa = $("opts");
  caixa.innerHTML = "";
  p.opcoes.forEach((texto, n) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.dataset.v = texto;
    b.textContent = `${n + 1}. ${texto}`;
    b.onclick = () => responder(texto);
    caixa.appendChild(b);
  });
  iniciarRelogio();
}

function responder(texto) {
  if (respondida) return;
  respondida = true; pararRelogio();
  const p = perguntas[atual];
  const ganho = texto === p.correta ? PONTOS_ACERTO + (usaTempo ? restante * BONUS_SEGUNDO : 0) : 0;
  revelar(p, texto, ganho);
}

function tempoEsgotado() {
  if (respondida) return;
  respondida = true; pararRelogio();
  revelar(perguntas[atual], null, 0);
}

function revelar(p, marcada, ganho) {
  const certa = marcada === p.correta;
  [...$("opts").children].forEach(b => {
    b.disabled = true;
    if (b.dataset.v === p.correta) b.classList.add("ok");
    else if (b.dataset.v === marcada) b.classList.add("no");
  });
  const equipe = modoEquipes ? nomesEquipes[turnoAtual()] : null;
  historico.push({ correta: p.correta, pergunta: p.pergunta, marcada: marcada || "Tempo esgotado", ok: certa, equipe });
  if (modoEquipes) {
    const t = turnoAtual();
    if (certa) placarAcertos[t]++;
    placarPts[t] += ganho;
    atualizarPlacarEquipes();
  } else {
    if (certa) acertos++;
    pontos += ganho;
    $("pts").textContent = `Acertos: ${acertos} · Pontos: ${pontos}`;
  }
  const titulo = certa
    ? `✔ ${equipe ? equipe + " acertou! " : "Correto! "}+${ganho} pontos`
    : marcada ? (equipe ? `✘ ${equipe} não foi dessa vez` : "✘ Não foi dessa vez") : "⏱ Tempo esgotado";
  const fb = $("fb");
  fb.className = "fb " + (certa ? "ok" : "no");
  fb.innerHTML = `<strong>${titulo}</strong>` +
    (certa ? "" : `Resposta certa: <b>${esc(p.correta)}</b>. `) + esc(p.explica);
  $("next").disabled = false;
}

function finalizar() {
  $("quiz").classList.add("hide");
  $("end").classList.remove("hide");
  $("final").classList.toggle("hide", modoEquipes);
  $("ptsFinal").classList.toggle("hide", modoEquipes);
  $("placarFinal").classList.toggle("hide", !modoEquipes);

  if (modoEquipes) {
    const empate = placarPts[0] === placarPts[1];
    const vencedor = placarPts[0] > placarPts[1] ? 0 : 1;
    $("placarFinal").innerHTML = [0, 1].map(i => `
      <div class="res ${!empate && i === vencedor ? "win" : ""}">
        ${!empate && i === vencedor ? '<div class="troféu">🏆</div>' : ""}
        <div class="n">${esc(nomesEquipes[i])}</div>
        <div class="v">${placarPts[i]}</div>
        <div class="n">${placarAcertos[i]} acerto(s)</div>
      </div>`).join("");
    $("msg").textContent = empate
      ? "Empate! As duas equipes treinaram muito bem o sistema imunológico."
      : `${nomesEquipes[vencedor]} venceu! Parabéns às duas equipes pelo empenho.`;
    if (window.confete) confete();
  } else {
    $("final").textContent = `${acertos} / ${perguntas.length}`;
    $("ptsFinal").textContent = `${pontos} pontos`;
    const pct = acertos / perguntas.length;
    $("msg").textContent =
      pct >= 0.9 ? "Excelente! Você mandou muito bem!" :
      pct >= 0.7 ? "Muito bom! Continue assim!" :
      pct >= 0.5 ? "Bom resultado, mas dá para melhorar." :
                   "Vale a pena revisar e tentar de novo!";
    if (pct >= 0.7 && window.confete) confete();
  }

  $("review").innerHTML = historico.map(h => {
    const res = h.ok
      ? `<b class="ok">✔ ${esc(h.correta)}</b>`
      : `<b class="no">✘ ${esc(h.marcada)}</b> — correta: <b class="ok">${esc(h.correta)}</b>`;
    const rotulo = h.equipe ? `<em>${esc(h.equipe)}</em> — ${esc(h.pergunta)}` : esc(h.pergunta);
    return `<div class="rev"><div>${rotulo}</div>${res}</div>`;
  }).join("");
}

$("go").onclick = iniciar;
$("again").onclick = iniciar;
$("next").onclick = () => { atual++; atual < perguntas.length ? mostrar() : finalizar(); };

// ====== MODO APRESENTAÇÃO (fonte grande + tela cheia) ======
function rotuloApresentacao(on) {
  $("presBtn").textContent = on ? "Sair do modo apresentação" : "Modo apresentação";
}
function alternarApresentacao() {
  const on = document.documentElement.classList.toggle("apres");
  store.set("quiz_apres", on ? "1" : "0");
  rotuloApresentacao(on);
  try {
    if (on && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  } catch (e) {}
}
$("presBtn").onclick = alternarApresentacao;

// ====== TECLADO: 1–4 respondem, Enter ou → avançam ======
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT" || $("quiz").classList.contains("hide")) return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 4) {
    const b = $("opts").children[n - 1];
    if (b && !b.disabled) b.click();
  } else if ((e.key === "Enter" || e.key === "ArrowRight") && !$("next").disabled) {
    e.preventDefault(); $("next").click();
  }
});

// ====== PREFERÊNCIAS SALVAS ======
$("timerOn").checked = store.get("quiz_timer") !== "0";
$("totalBanco").textContent = BANCO.length;
if (store.get("quiz_apres") === "1") { document.documentElement.classList.add("apres"); rotuloApresentacao(true); }

$("modoEquipes").checked = store.get("quiz_modo") === "1";
$("teamA").value = store.get("quiz_teamA") || "";
$("teamB").value = store.get("quiz_teamB") || "";
$("teamSetup").classList.toggle("hide", !$("modoEquipes").checked);
$("modoEquipes").onchange = () => $("teamSetup").classList.toggle("hide", !$("modoEquipes").checked);
