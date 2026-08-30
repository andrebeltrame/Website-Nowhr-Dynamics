# Website Nowhr Dynamics

Site da **Nowhr Dynamics** — landing page + uma página por plugin, com mini
manual, formulário de captura de contato e download do beta.

Estático puro: HTML, CSS e um arquivo de JavaScript. Sem build, sem
dependências, sem npm. Abrir `index.html` no navegador já funciona.

```
index.html            landing
progressions.html     Progressions — features, formulário, download, manual
assets/css/site.css   todo o estilo
assets/js/config.js   ← o único arquivo que você precisa editar
assets/js/site.js     idioma, formulário, abas, índice do manual
assets/img/           logo, favicon e os prints dos plugins
```

## O que precisa ser configurado

Tudo está em [`assets/js/config.js`](assets/js/config.js). Duas coisas:

### 1. O formulário (Google Forms)

1. Crie um Google Form com cinco perguntas de **resposta curta**:
   Nome · WhatsApp · E-mail · DAW · Plugin. Em *Respostas → Vincular ao Sheets*
   as respostas caem numa planilha.
2. Abra o formulário publicado, botão direito → *Ver código-fonte da página*, e
   procure por `entry.` — vai aparecer um `entry.NNNNNNNNN` por pergunta.
3. Preencha `form.action` e `form.fields` no `config.js`. O `action` é a URL do
   formulário com `viewform` trocado por `formResponse`:

```js
form: {
  action: 'https://docs.google.com/forms/d/e/1FAIpQL.../formResponse',
  fields: {
    name:     'entry.111111111',
    whatsapp: 'entry.222222222',
    email:    'entry.333333333',
    daw:      'entry.444444444',
    plugin:   'entry.555555555'
  }
}
```

Enquanto `action` estiver vazio o site continua funcionando — o formulário
libera os downloads normalmente, só não grava nada, e avisa no console.

**Todas precisam ser resposta curta.** O Google Forms recusa o envio inteiro
quando uma resposta não cabe na pergunta: se `plugin` for múltipla escolha e o
site mandar `Progressions`, volta 400 com *"A pergunta mudou"* e você perde o
contato todo, não só aquela coluna. Um `entry` vazio no `config.js` quer dizer
"não mande este campo" — é o jeito de desligar um campo problemático sem perder
os outros.

> O Google Forms não manda cabeçalhos CORS, então o navegador não consegue ler a
> resposta do envio. Na prática: o site sabe que a requisição saiu, não que a
> linha foi gravada. É o preço de postar direto no Forms sem backend. Confira a
> planilha depois do primeiro envio de teste.

### 2. Os downloads

Hoje o download aponta para uma **pasta do Google Drive**, não para um arquivo:

```js
url:  'https://drive.google.com/drive/folders/…',
external: true,
meta: '6,5 MB · macOS e Windows'
```

A pasta, e não o id do arquivo, porque assim trocar o `.zip` lá não quebra o
link — um id direto quebraria. O `external: true` faz o card abrir em aba nova e
largar o atributo `download`, que não funciona entre origens.

Só o `meta` precisa de ajuste manual, quando o tamanho do arquivo mudar.

Se preferir voltar a servir da *Release* deste repositório, troque a `url` por
`https://github.com/andrebeltrame/Website-Nowhr-Dynamics/releases/latest/download/Progressions.zip`
e remova o `external`. Nesse caso, os assets só continuam baixáveis enquanto o
repositório for público.

O `.vst3` do Progressions carrega os dois binários dentro — macOS universal e
Windows x64 — então é um arquivo só para os dois sistemas, e não existe uma
entrada `win` separada a acrescentar.

## Publicação

O site está no ar em
<https://andrebeltrame.github.io/Website-Nowhr-Dynamics/>, servido pelo GitHub
Pages a partir da branch `main`, pasta `/ (root)`. **Todo push para a `main`
republica o site** — leva um ou dois minutos.

O `.nojekyll` está aí para o Jekyll não tocar em nada. O repositório é público
porque o Pages não roda em repositório privado no plano gratuito.

Para domínio próprio: adicione um arquivo `CNAME` na raiz com o domínio (uma
linha, sem `http://`) e aponte o DNS para o GitHub Pages.

Se um dia o site mudar de casa, ele vai inteiro: são arquivos estáticos com
caminhos relativos, então basta copiar a pasta para qualquer servidor, Netlify,
Vercel ou FTP. Nada aqui depende do GitHub além dos links de download.

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

**O padrão é português.** Quem já escolheu um idioma tem a escolha respeitada
(`localStorage`); quem chega pela primeira vez recebe inglês só se o navegador
pedir inglês, e português em qualquer outro caso. Um script curtinho no
`<head>` decide isso antes da página pintar, para não piscar.

O HTML nasce em português — `<html lang="pt-BR" data-lang="pt">`, `<title>` e
`description` em português — então é isso que um buscador indexa e é isso que
aparece se o JavaScript não rodar. Para inverter, troque nos dois HTMLs o
atributo do `<html>`, a linha do `navigator.language`, o `aria-pressed` dos
dois botões e o `<title>`/`description`.

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

- **Trocou CSS ou JS?** Suba o `?v=N` no fim dos `href`/`src` dos dois HTMLs,
  senão o navegador de quem já visitou continua com a versão velha.
- **Prints novos?** Recorte a janela do plugin (sem o DAW em volta, quando der),
  redimensione para 1800px de largura e salve como JPEG qualidade 82 — os
  arquivos atuais têm entre 70 e 230 KB.
- **Cores:** todas as variáveis estão no `:root` do `site.css`. A paleta é Sand
  `#BFB48F`, Taupe Grey `#564E58`, Burnt Rose `#904E55`, Parchment `#F2EFE9` e
  Carbon Black `#252627`.
