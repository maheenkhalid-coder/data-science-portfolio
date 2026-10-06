const G = "https://github.com/maheenkhalid-coder/";
let lang = "en", cur = "all";
try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("de") ? "de" : "en"); } catch (e) {}
const DE = {
  "DocChat-AI": ["RAG über dein eigenes PDF", "PDF hochladen und Fragen stellen. Die Antworten stammen nur aus dem Dokument, mit Quellenseiten unter jeder Antwort. Steht die Antwort nicht drin, sagt die App das."],
  "ResearchFlow-AI": ["Multi-Agenten-Recherchesystem", "Macht aus einer Frage einen quellenbasierten Bericht. Getrennte Agenten suchen im Web, lesen Seiten, schreiben den Bericht und bewerten ihn kritisch."],
  "MeetMindAI": ["Assistent für Meetings und Videos", "Transkribiert YouTube-Links sowie Audio- und Videodateien und erstellt Zusammenfassung, Aufgaben, Entscheidungen und offene Fragen. Mit RAG-Chat über das Transkript."],
  "PostPilot-AI": ["LinkedIn-Autor mit Human-in-the-Loop", "Recherchiert ein Thema, schreibt einen Post und wartet auf deine Freigabe oder dein Feedback. Mit Token-Budgets, Limits und Caching für eine öffentliche Free-Tier-Demo."],
  "NextWordPrediction": ["LSTM-Sprachmodell", "Sagt das nächste Wort voraus und erzeugt längere Texte aus einem Anfangssatz. Bereitgestellt über ein FastAPI-Backend mit Weboberfläche."],
  "EmotionAI": ["Emotionserkennung in Texten", "Erkennt die Emotion in einem Satz. Naive Bayes und Logistic Regression verglichen, das bessere Modell als Echtzeit-API und Web-App bereitgestellt."],
  "Mindscope": ["Regression mit 5.000 Studierenden", "Sagt einen Mental-Health-Score aus Social-Media-Nutzung, Schlaf, Lernzeit und Stress voraus. Random Forest erreichte ein Test-R² von 0,878 (MAE 0,347). Lernprojekt, kein Diagnosetool."],
  "QuickBite-Marketing-Analytics": ["SQL, Python und Power BI", "Conversion, Engagement und Kundenbewertungen einer Lieferplattform analysiert. Die Durchschnittsbewertung (ca. 3,7) liegt unter dem Ziel von 4,0; dazu Empfehlungen zu Saison und Inhalten."]
};
const UI = {
  "nav a[href='#work']": "Projekte", "nav a[href='#about']": "Über mich", "nav a[href='#contact']": "Kontakt",
  ".hero h1": "Ich baue KI-Apps, die aus echten Daten antworten und ihre Quellen zeigen.",
  ".hero-text p:not(.cta)": "Junior AI Engineer in München. Absolventin im Bereich Computer Engineering und frühere Softwareentwicklerin. Ich arbeite mit LLMs, RAG, Multi-Agenten-Workflows und klassischem ML und stelle alles als Live-Demo bereit, die du direkt ausprobieren kannst.",
  ".btn:not(.ghost)": "Projekte ansehen",
  ".chat .q": "Wie lautet die Regelung zu Säumniszuschlägen?",
  ".src": "Quellen: handbook.pdf, Seiten 12, 15",
  "#work h2": "Projekte", "#about h2": "Über mich",
  "#about > p:nth-of-type(1)": "Ich habe als Softwareentwicklerin angefangen und bin dann zu Daten und KI gewechselt. Das Google Advanced Data Analytics Certificate (Juni 2025) hat mir die Basis in Statistik, Datenaufbereitung und Analyse gegeben. Seitdem konzentriere ich mich auf angewandte KI: Retrieval-Pipelines (RAG), Agenten mit Tool-Calling, Human-in-the-Loop-Workflows und Modell-Deployment.",
  "#about > p:nth-of-type(2)": "Ich lebe in München und arbeite auf Englisch und Deutsch. Ich habe die Telc-B1-Prüfung in Deutsch bestanden und bereite mich jetzt auf B2 vor, damit ich gut in ein deutschsprachiges Team hineinwachsen kann.",
  "#about > p:nth-of-type(3)": "Ich lerne durch Bauen. Jedes Projekt geht von einem echten Problem bis zu einer funktionierenden Demo und endet mit einem README, das den Aufbau und die bekannten Einschränkungen erklärt. Meine Demos laufen auf Free Tiers, deshalb baue ich Token-Budgets, Tageslimits und klare Fehlermeldungen ein. Als Nächstes vertiefe ich mich in KI-Agenten und in zuverlässigere RAG-Antworten.",
  "footer h2": "Lass uns sprechen", "footer > p:not(.links)": "Offen für Junior-KI-Stellen in München.",
  "[data-f='all']": "Alle", "[data-f='llm']": "LLMs und Agenten", "[data-f='ml']": "ML und NLP", "[data-f='data']": "Analytics"
};
const projects = [
  { t: "DocChat AI", c: "llm", big: 1, tag: "RAG over your own PDF",
    d: "Upload a PDF and ask questions. Answers come only from the document, with source pages under every answer. If the answer is not there, it says so.",
    s: ["LangGraph", "FAISS", "Groq", "Hugging Face embeddings", "Streamlit"],
    demo: "https://docchatassistant.streamlit.app/", repo: "DocChat-AI" },
  { t: "ResearchFlow AI", c: "llm", big: 1, tag: "Multi-agent research system",
    d: "Turns a question into a source-backed report. Separate agents search the web, read pages, write the report and critique it.",
    s: ["LangChain", "Groq", "Tavily", "BeautifulSoup", "Streamlit"],
    demo: "https://researchflow-assistant.streamlit.app/", repo: "ResearchFlow-AI" },
  { t: "MeetMind AI", c: "llm", tag: "Meeting and video assistant",
    d: "Transcribes YouTube links and audio/video files, then creates a summary, action items, decisions and open questions. Includes RAG chat over the transcript.",
    s: ["Whisper", "ChromaDB", "LangChain", "Groq", "yt-dlp"],
    demo: "https://meetmind-video-ai.streamlit.app/", repo: "MeetMindAI" },
  { t: "PostPilot", c: "llm", tag: "Human-in-the-loop LinkedIn writer",
    d: "Researches a topic, drafts a post and pauses for your approval or feedback. Built with token budgets, run limits and caching for a free-tier public demo.",
    s: ["LangGraph interrupt()", "Tavily", "Groq", "Streamlit"],
    demo: "https://pilotpost-generator.streamlit.app/", repo: "PostPilot-AI" },
  { t: "NextWordPrediction", c: "ml", tag: "LSTM language model",
    d: "Predicts the next word and generates longer text from a starting phrase. Served through a FastAPI backend with a web interface.",
    s: ["TensorFlow", "Keras", "LSTM", "FastAPI"],
    demo: "https://nextwordprediction1.onrender.com", repo: "NextWordPrediction" },
  { t: "EmotionAI", c: "ml", tag: "Text emotion classifier",
    d: "Predicts the emotion in a sentence. Compared Naive Bayes and Logistic Regression, then deployed the winner as a real-time API and web app.",
    s: ["scikit-learn", "Bag-of-Words", "FastAPI", "Render"],
    demo: "https://emotionai-1-6tca.onrender.com", repo: "EmotionAI" },
  { t: "Mindscope", c: "ml", tag: "Regression on 5,000 students",
    d: "Predicts a mental health score from social media use, sleep, study time and stress. Random Forest reached test R² 0.878 (MAE 0.347). Educational project, not a diagnostic tool.",
    s: ["scikit-learn", "Random Forest", "FastAPI"],
    demo: "https://mindscope-1-ezku.onrender.com", repo: "Mindscope" },
  { t: "QuickBite Marketing Analytics", c: "data", tag: "SQL, Python and Power BI",
    d: "Analyzed conversion, engagement and customer ratings for a food-delivery platform. Found the average rating (about 3.7) sits below the 4.0 target and gave seasonal and content recommendations.",
    s: ["SQL", "Pandas", "Matplotlib", "Power BI"],
    repo: "QuickBite-Marketing-Analytics" },
  { t: "Salifort Motors HR Analytics", c: "data", tag: "Predictive modeling, Google capstone",
    d: "End-to-end capstone on employee turnover at Salifort Motors: data cleaning, exploratory analysis and a predictive model that shows what drives people to leave.",
    s: ["Python", "Predictive modeling", "EDA"], repo: "Google-Salifort-Motors-Project" },
  { t: "Waze User Behavior Analytics", c: "data", tag: "Statistics and modeling, Google capstone",
    d: "Analysis of Waze user behavior data: data exploration, statistical modeling and business insights to support product decisions.",
    s: ["Python", "Statistics", "Modeling"], repo: "Google-Waze-Analytics-Project" },
  { t: "Customer Churn Analysis", c: "data", tag: "Customer attrition with Python",
    d: "Explores the main factors behind customer attrition with data cleaning, EDA and visualization to support retention strategies.",
    s: ["Python", "EDA", "Visualization"], repo: "customer-churn-analysis" }
];

const grid = document.getElementById("grid");
function render(f) {
  cur = f;
  grid.innerHTML = "";
  projects.filter(p => f === "all" || p.c === f).forEach((p, n) => {
    const tx = lang === "de" && DE[p.repo] ? DE[p.repo] : [p.tag, p.d];
    const el = document.createElement("article");
    el.className = "card" + (p.big && f === "all" ? " big" : "");
    el.style.transitionDelay = (n % 3) * 90 + "ms";
    el.innerHTML = `<h3>${p.t}</h3><p class="tag">${tx[0]}</p><p>${tx[1]}</p>
      <ul>${p.s.map(x => `<li>${x}</li>`).join("")}</ul>
      <div class="row">${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${lang === "de" ? "Live-Demo" : "Live demo"}</a>` : ""}
      <a href="${G}${p.repo}" target="_blank" rel="noopener">Code</a></div>`;
    grid.appendChild(el);
    reveal([el]);
  });
}
document.querySelectorAll(".filters button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".filters button").forEach(x => x.classList.remove("on"));
  b.classList.add("on");
  render(b.dataset.f);
});

Object.assign(DE, {
  "Google-Salifort-Motors-Project": ["Prädiktive Modellierung, Google-Abschlussprojekt", "End-to-End-Abschlussprojekt zur Mitarbeiterfluktuation bei Salifort Motors: Datenbereinigung, explorative Analyse und ein Vorhersagemodell, das Kündigungsgründe aufzeigt."],
  "Google-Waze-Analytics-Project": ["Statistik und Modellierung, Google-Abschlussprojekt", "Analyse des Nutzerverhaltens bei Waze: Datenexploration, statistische Modellierung und Geschäftsempfehlungen zur Unterstützung von Produktentscheidungen."],
  "customer-churn-analysis": ["Kundenabwanderung mit Python", "Untersucht die wichtigsten Gründe für Kundenabwanderung mit Datenbereinigung, EDA und Visualisierung zur Unterstützung von Bindungsstrategien."]
});
UI[".creds a:nth-of-type(1)"] = "Google Advanced Data Analytics Zertifikat";
UI[".creds a:nth-of-type(2)"] = "Telc B1 Deutsch, bestanden";

// Scroll reveal
document.documentElement.classList.add("js");
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 }) : null;
function reveal(els) { els.forEach(el => { el.classList.add("rv"); io ? io.observe(el) : el.classList.add("in"); }); }
reveal(document.querySelectorAll("#work h2, .filters, #about h2, #about p, .creds, .skills, footer > *"));

// Hero demo typing
const typed = document.getElementById("typed"), src = document.getElementById("src");
const HERO = { en: typed.dataset.text, de: "Antworten stammen nur aus deinem hochgeladenen PDF. Steht etwas nicht im Dokument, sagt die App das." };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let timer;
function type() {
  clearTimeout(timer); src.classList.remove("show");
  const t = HERO[lang];
  if (reduce) { typed.textContent = t; src.classList.add("show"); return; }
  let i = 0; typed.textContent = "";
  (function tick() {
    typed.textContent = t.slice(0, ++i);
    i < t.length ? timer = setTimeout(tick, 22) : src.classList.add("show");
  })();
}

// Language toggle
const tb = document.createElement("button");
tb.id = "lang";
document.querySelector(".top nav").appendChild(tb);
function setLang(l) {
  lang = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.documentElement.lang = l;
  for (const [sel, de] of Object.entries(UI)) document.querySelectorAll(sel).forEach(el => {
    el.dataset.en ??= el.textContent;
    el.textContent = l === "de" ? de : el.dataset.en;
  });
  tb.textContent = l === "de" ? "EN" : "DE";
  tb.setAttribute("aria-label", l === "de" ? "Switch to English" : "Auf Deutsch wechseln");
  render(cur); type();
}
tb.onclick = () => setLang(lang === "de" ? "en" : "de");
setLang(lang);
