# Website Nowhr Dynamics

Site da **Nowhr Dynamics** — landing page + uma página por plugin, com mini
manual, formulário de captura de contato e download do beta.

Estático puro: HTML, CSS e um arquivo de JavaScript. Sem build, sem
dependências, sem npm. Abrir `index.html` no navegador já funciona.

```
index.html            landing
progressions.html     Progressions — features, formulário, download, manual
grid-frequency.html   Grid Frequency — idem
assets/css/site.css   todo o estilo
assets/js/config.js   ← o único arquivo que você precisa editar
assets/js/site.js     idioma, formulário, abas, índice do manual
assets/img/           logo, favicon e os prints dos plugins
```

## O que precisa ser configurado

Tudo está em [`assets/js/config.js`](assets/js/config.js). Duas coisas:

### 1. O formulário (Google Forms)

1. Crie um Google Form com quatro perguntas de resposta curta, **nesta ordem**:
   Nome · E-mail · DAW · Plugin. Em *Respostas → Vincular ao Sheets* as
   respostas caem numa planilha.
2. Abra o formulário publicado, botão direito → *Ver código-fonte da página*, e
   procure por `entry.` — vai aparecer um `entry.NNNNNNNNN` por pergunta.
3. Preencha `form.action` e `form.fields` no `config.js`. O `action` é a URL do
   formulário com `viewform` trocado por `formResponse`:

```js
form: {
  action: 'https://docs.google.com/forms/d/e/1FAIpQL.../formResponse',
  fields: {
    name:   'entry.111111111',
    email:  'entry.222222222',
    daw:    'entry.333333333',
    plugin: 'entry.444444444'
  }
}
```

Enquanto `action` estiver vazio o site continua funcionando — o formulário
libera os downloads normalmente, só não grava nada, e avisa no console.

Um `entry` vazio (`plugin: ''`) quer dizer "não mande este campo". Isso existe
por um motivo específico: **o Google Forms recusa o envio inteiro quando uma
resposta não cabe na pergunta.** Se a pergunta `plugin` for de múltipla escolha
e o site mandar `Progressions`, a resposta volta 400 com *"A pergunta mudou"* e
você perde o contato todo, não só aquela coluna. Por isso o campo `plugin` está
desligado até a pergunta virar **Resposta curta** no editor do formulário —
depois é só trocar as duas linhas comentadas no `config.js`.

> O Google Forms não manda cabeçalhos CORS, então o navegador não consegue ler a
> resposta do envio. Na prática: o site sabe que a requisição saiu, não que a
> linha foi gravada. É o preço de postar direto no Forms sem backend. Confira a
> planilha depois do primeiro envio de teste.

### 2. Os downloads (GitHub Releases)

Suba os `.vst3` zipados como assets de uma *Release* deste repositório. Os links
no `config.js` já usam a forma `releases/latest/download/<arquivo>`, então basta
manter os nomes dos arquivos e publicar uma release nova a cada versão — as URLs
nunca mudam.

Nomes esperados:

```
Progressions-macOS.zip      Progressions-Windows.zip
GridFrequency-macOS.zip     GridFrequency-Windows.zip
```

Se você preferir outros nomes, ajuste as URLs no `config.js`.

## Publicando no GitHub Pages

Em *Settings → Pages*, escolha **Deploy from a branch**, branch `main`, pasta
`/ (root)`. O `.nojekyll` já está no repositório para o Jekyll não tocar em
nada. O site fica em `https://andrebeltrame.github.io/Website-Nowhr-Dynamics/`.

Para domínio próprio, adicione um arquivo `CNAME` na raiz com o domínio e
aponte o DNS para o GitHub Pages.

## Idiomas

O site é bilíngue (inglês e português) sem duplicar arquivos: os dois textos
convivem no mesmo HTML e o CSS mostra um de cada vez.

```html
<span lang="en">Get the beta</span><span lang="pt">Pegar o beta</span>
```

```css
body [lang="en"], body [lang="pt"] { display: none; }
html[data-lang="pt"] body [lang="pt"] { display: revert; }
```

O idioma inicial vem do `localStorage`, e na primeira visita do
`navigator.language`. Um script curtinho no `<head>` decide isso antes da
página pintar, para não piscar. O padrão no HTML é inglês, então a página lê
certo mesmo sem JavaScript.

Para textos que não aceitam dois `<span>` — `<option>` e `placeholder` — use
`data-en` / `data-pt` e `data-ph-en` / `data-ph-pt`.

## Rodando localmente

Abrir o arquivo direto funciona, mas para o comportamento ser idêntico ao do
Pages:

```bash
python3 -m http.server 8787
```

E abra <http://localhost:8787>.

## Editando

- **Trocou CSS ou JS?** Suba o `?v=1` no fim dos `href`/`src` dos três HTMLs,
  senão o navegador de quem já visitou continua com a versão velha.
- **Prints novos?** Recorte a janela do plugin (sem o DAW em volta, quando der),
  redimensione para 1800px de largura e salve como JPEG qualidade 82 — os
  arquivos atuais têm entre 70 e 230 KB.
- **Cores:** todas as variáveis estão no `:root` do `site.css`. A paleta é Sand
  `#BFB48F`, Taupe Grey `#564E58`, Burnt Rose `#904E55`, Parchment `#F2EFE9` e
  Carbon Black `#252627`.
