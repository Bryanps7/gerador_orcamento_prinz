/* ==========================================================================
   Vidraçaria Prinz — Gerador de Orçamentos
   ========================================================================== */

const cadastrarBtn = document.getElementById('cads')
const gerarPdfBtn = document.getElementById('baixar-pdf')
const emptyState = document.getElementById('orcamento-empty')

const LUCRO_PADRAO = 0.7 // 70%, usado quando nenhuma margem é informada

// Logo embutida em base64: evita o erro de "canvas contaminado" (tainted canvas)
// que ocorre ao gerar o PDF quando a página é aberta direto do disco (file://)
const LOGO_BASE64 = "data:image/png;base64,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"

/* --------------------------------------------------------------------
   1. Geração do formulário dinâmico (dados do cliente + itens)
   -------------------------------------------------------------------- */

cadastrarBtn.addEventListener('click', () => {
    const itens = Number(document.getElementById('itens').value)
    const imprima = document.getElementById('imprima')

    if (!itens || itens < 1) {
        alert('Informe uma quantidade válida de itens antes de cadastrar.')
        return
    }

    imprima.innerHTML = `
        <div class="section-label">Dados do cliente</div>
        <div class="client-fields">
            <div class="field">
                <label for="nomeC">Nome do cliente</label>
                <input type="text" id="nomeC" placeholder="Nome completo">
            </div>
            <div class="field">
                <label for="localC">Endereço do cliente</label>
                <input type="text" id="localC" placeholder="Rua, número, bairro">
            </div>
            <div class="field">
                <label for="cityC">Cidade do cliente</label>
                <input type="text" id="cityC" placeholder="Ex: Tijucas - SC">
            </div>
            <div class="field">
                <label for="dateE">Data de emissão</label>
                <input type="date" id="dateE">
            </div>
            <div class="field">
                <label for="numO">Número do orçamento</label>
                <input type="number" id="numO" placeholder="Ex: 1">
            </div>
        </div>

        <div class="section-label">Itens do orçamento</div>
    `

    for (let i = 1; i <= itens; i++) {
        imprima.innerHTML += `
            <div class="produto">
                <p class="produto__title">Item ${i}</p>

                <div class="field">
                    <label for="nome${i}">Nome do produto</label>
                    <input id="nome${i}" list="vidro-${i}" placeholder="Selecione ou digite">
                    <datalist id="vidro-${i}">
                        <option>Janela Fixa</option>
                        <option>Janela 2 Folhas</option>
                        <option>Janela 4 Folhas</option>
                        <option>Janela Maxiar</option>
                        <option>Janela Basculante</option>
                        <option value="Porta 2 Folhas"></option>
                        <option value="Porta 4 Folhas"></option>
                        <option value="Porta Pivotante"></option>
                        <option value="Porta Mão Amiga"></option>
                        <option value="Porta RollDoor"></option>
                        <option value="Portão de Correr"></option>
                        <option value="Portão de Abrir"></option>
                        <option value="Espelho Bisotê"></option>
                        <option value="Espelho Lapidado"></option>
                    </datalist>
                </div>

                <div class="produto__grid">
                    <div class="field">
                        <label for="lar${i}">Largura (m)</label>
                        <input id="lar${i}" type="number" step="0.01" min="0" placeholder="0,00">
                    </div>
                    <div class="field">
                        <label for="alt${i}">Altura (m)</label>
                        <input id="alt${i}" type="number" step="0.01" min="0" placeholder="0,00">
                    </div>
                    <div class="field">
                        <label for="alu${i}">Preço do alumínio (R$)</label>
                        <input id="alu${i}" type="number" step="0.01" min="0" placeholder="0,00">
                    </div>
                    <div class="field">
                        <label for="fer${i}">Preço das ferragens (R$)</label>
                        <input id="fer${i}" type="number" step="0.01" min="0" placeholder="0,00">
                    </div>
                    <div class="field">
                        <label for="mVidro${i}">Preço do m² do vidro (R$)</label>
                        <input id="mVidro${i}" type="number" step="0.01" min="0" placeholder="0,00">
                    </div>
                    <div class="field">
                        <label for="qtde${i}">Quantidade</label>
                        <input id="qtde${i}" type="number" min="1" placeholder="1">
                    </div>
                </div>
            </div>
        `
    }

    imprima.innerHTML += `
        <div class="section-label">Finalização</div>
        <div class="field">
            <label for="coment">Deseja inserir um comentário?</label>
            <input id="coment" list="comentario" placeholder="Opcional">
            <datalist id="comentario">
                <option>Crédito</option>
            </datalist>
        </div>
        <div class="field">
            <label for="lucro">Qual será a margem de lucro? (%)</label>
            <input id="lucro" type="number" min="0" placeholder="Padrão: 70%">
            <p class="hint">Deixe em branco para usar a margem padrão de 70%.</p>
        </div>

        <button id="orcar" class="btn btn--ghost">Visualizar Orçamento</button>
    `

    document.getElementById('orcar').addEventListener('click', () => {
        try {
            renderizarOrcamento(itens)
        } catch (erro) {
            console.error(erro)
            alert('Confira se todos os campos dos itens foram preenchidos corretamente.')
        }
    })
})

/* --------------------------------------------------------------------
   2. Cálculo e renderização do orçamento na tela
   -------------------------------------------------------------------- */

function coletarDadosDoFormulario(itens) {
    const nomeC = document.getElementById('nomeC').value.trim()
    const localC = document.getElementById('localC').value.trim()
    const cityC = document.getElementById('cityC').value.trim()
    const dateE = document.getElementById('dateE').value
    const numO = Number(document.getElementById('numO').value)
    const coment = document.getElementById('coment').value.trim()

    const lucroInformado = Number(document.getElementById('lucro').value)
    const margemLucro = lucroInformado > 0 ? lucroInformado / 100 : LUCRO_PADRAO

    const produtos = []
    for (let i = 1; i <= itens; i++) {
        const nome = document.getElementById(`nome${i}`).value.trim()
        const quantidade = Number(document.getElementById(`qtde${i}`).value) || 1
        const ferragens = Number(document.getElementById(`fer${i}`).value) || 0
        const aluminio = Number(document.getElementById(`alu${i}`).value) || 0
        const largura = Number(document.getElementById(`lar${i}`).value) || 0
        const altura = Number(document.getElementById(`alt${i}`).value) || 0
        const precoVidroM2 = Number(document.getElementById(`mVidro${i}`).value) || 0

        const area = largura * altura
        const totalVidro = area * precoVidroM2
        const custoUnitario = totalVidro + ferragens + aluminio
        const lucroUnitario = custoUnitario * margemLucro
        const precoUnitario = custoUnitario + lucroUnitario
        const subtotal = precoUnitario * quantidade

        produtos.push({ nome, quantidade, precoUnitario, subtotal })
    }

    const total = produtos.reduce((soma, produto) => soma + produto.subtotal, 0)

    return { nomeC, localC, cityC, dateE, numO, coment, produtos, total }
}

function formatarData(dataISO) {
    if (!dataISO) return '—'
    const [ano, mes, dia] = dataISO.split('-')
    return `${dia}/${mes}/${ano}`
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

let ultimoOrcamento = null

function renderizarOrcamento(itens) {
    const dados = coletarDadosDoFormulario(itens)
    ultimoOrcamento = dados

    const about = document.getElementById('orcamento-about')
    const head = document.getElementById('thead')
    const body = document.getElementById('tbody')
    const foot = document.getElementById('tfoot')
    const footer = document.getElementById('orcamento-footer')

    about.innerHTML = `
        <div class="about">
            <img src="${LOGO_BASE64}" alt="Logotipo Vidraçaria Prinz">
            <div class="about-info">
                <h2>Vidraçaria Prinz</h2>
                <p>
                    <a href="https://api.whatsapp.com/send/?phone=5548998206570&text&type=phone_number&app_absent=0">WhatsApp: (48) 99820-6570</a><br>
                    <a href="https://maps.app.goo.gl/Dr5aVy3LoZ7sLQgt5">Rua Geraldo Rebelo, Nº 1500 — Tijucas/SC</a><br>
                    <a href="https://www.instagram.com/vidracariaprinz/">Instagram: @vidracariaprinz</a><br>
                    <a href="mailto:vidracariaprinz@gmail.com">E-mail: vidracariaprinz@gmail.com</a><br>
                    CNPJ: 41.959.367/0001-14
                </p>
            </div>
        </div>

        <div class="orcamento-meta">
            <div class="title">
                <h2>Orçamento Nº ${dados.numO || '—'}</h2>
                <p class="meta-line">Data de emissão: ${formatarData(dados.dateE)} &nbsp;•&nbsp; Validade: 15 dias</p>
            </div>
        </div>

        <div class="client-info">
            <h2>Cliente</h2>
            <p>
                ${dados.nomeC || '—'}<br>
                Endereço: ${dados.localC || '—'}<br>
                Cidade: ${dados.cityC || '—'}
            </p>
        </div>
    `

    head.innerHTML = `
        <tr>
            <th scope="col">Nº</th>
            <th scope="col">Descrição</th>
            <th scope="col">Qtd.</th>
            <th scope="col">Preço unit.</th>
            <th scope="col">Total</th>
        </tr>
    `

    body.innerHTML = dados.produtos.map((produto, indice) => `
        <tr>
            <td>${indice + 1}</td>
            <td>${produto.nome || '—'}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${formatarMoeda(produto.precoUnitario)}</td>
            <td>R$ ${formatarMoeda(produto.subtotal)}</td>
        </tr>
    `).join('')

    foot.innerHTML = `
        <tr>
            <th scope="row" colspan="4">Valor total do orçamento</th>
            <td>R$ ${formatarMoeda(dados.total)}</td>
        </tr>
    `

    footer.innerHTML = dados.coment
        ? `<h2>Observações</h2><p>${dados.coment}</p>`
        : ''

    emptyState.style.display = 'none'
}

/* --------------------------------------------------------------------
   3. Montagem do HTML autocontido usado para gerar o PDF
   Todo o CSS fica embutido no próprio HTML (nada de arquivo externo,
   variável CSS ou fonte do Google) para garantir que o html2canvas
   renderize exatamente o que é enviado, mesmo abrindo o arquivo
   direto do disco (file://).
   -------------------------------------------------------------------- */

function construirHtmlOrcamentoPDF(dados) {
    const linhasProdutos = dados.produtos.map((produto, indice) => `
        <tr style="${indice % 2 === 1 ? 'background:#f4faff;' : ''}">
            <td style="padding:8px 10px;border-bottom:1px solid #e2e8f2;">${indice + 1}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #e2e8f2;">${produto.nome || '—'}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #e2e8f2;">${produto.quantidade}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #e2e8f2;">R$ ${formatarMoeda(produto.precoUnitario)}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #e2e8f2;">R$ ${formatarMoeda(produto.subtotal)}</td>
        </tr>
    `).join('')

    const blocoObservacoes = dados.coment ? `
        <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #e2e8f2;">
            <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#0169b4;margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;">Observações</h2>
            <p style="font-size:13px;color:#33415a;line-height:1.6;margin:0;">${dados.coment}</p>
        </div>
    ` : ''

    return `
        <div style="width:750px;background:#ffffff;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#0f172a;">

            <div style="display:flex;align-items:center;gap:20px;padding-bottom:16px;border-bottom:2px solid #e4f3fc;margin-bottom:16px;">
                <img src="${LOGO_BASE64}" alt="Logotipo Vidraçaria Prinz" style="width:80px;height:80px;object-fit:contain;">
                <div>
                    <h2 style="font-size:20px;color:#001240;margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;">Vidraçaria Prinz</h2>
                    <p style="font-size:11px;color:#64748b;line-height:1.6;margin:0;">
                        WhatsApp: (48) 99820-6570 &nbsp;•&nbsp; Rua Geraldo Rebelo, Nº 1500 — Tijucas/SC<br>
                        Instagram: @vidracariaprinz &nbsp;•&nbsp; E-mail: vidracariaprinz@gmail.com<br>
                        CNPJ: 41.959.367/0001-14
                    </p>
                </div>
            </div>

            <div style="margin-bottom:16px;">
                <h2 style="font-size:18px;font-weight:800;color:#012159;margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;">Orçamento Nº ${dados.numO || '—'}</h2>
                <p style="font-size:12px;color:#64748b;margin:0;">Data de emissão: ${formatarData(dados.dateE)} &nbsp;•&nbsp; Validade: 15 dias</p>
            </div>

            <div style="background:#f4faff;border-radius:10px;padding:14px 16px;margin-bottom:16px;">
                <h2 style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#0169b4;margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;">Cliente</h2>
                <p style="font-size:13px;line-height:1.6;margin:0;color:#0f172a;">
                    ${dados.nomeC || '—'}<br>
                    Endereço: ${dados.localC || '—'}<br>
                    Cidade: ${dados.cityC || '—'}
                </p>
            </div>

            <table style="width:100%;border-collapse:collapse;font-size:13px;border:1px solid #e2e8f2;border-radius:10px;overflow:hidden;">
                <thead>
                    <tr>
                        <th style="background:#012159;color:#ffffff;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;">Nº</th>
                        <th style="background:#012159;color:#ffffff;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;">Descrição</th>
                        <th style="background:#012159;color:#ffffff;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;">Qtd.</th>
                        <th style="background:#012159;color:#ffffff;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;">Preço unit.</th>
                        <th style="background:#012159;color:#ffffff;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhasProdutos}
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="4" style="background:#f4faff;text-align:right;padding:10px;font-size:12px;color:#012159;">Valor total do orçamento</th>
                        <td style="background:#f4faff;padding:10px;font-size:15px;font-weight:800;color:#012159;">R$ ${formatarMoeda(dados.total)}</td>
                    </tr>
                </tfoot>
            </table>

            ${blocoObservacoes}
        </div>
    `
}

/* --------------------------------------------------------------------
   4. Geração do PDF
   -------------------------------------------------------------------- */

gerarPdfBtn.addEventListener('click', () => {
    if (!ultimoOrcamento) {
        alert('Clique em "Visualizar Orçamento" antes de gerar o PDF.')
        return
    }

    const nomeArquivo = `${(ultimoOrcamento.nomeC || 'orcamento').trim().replace(/\s+/g, '_')}_orcamento.pdf`
    const htmlOrcamento = construirHtmlOrcamentoPDF(ultimoOrcamento)

    const textoOriginal = gerarPdfBtn.textContent
    gerarPdfBtn.disabled = true
    gerarPdfBtn.textContent = 'Abrindo impressão...'

    const finalizar = () => {
        gerarPdfBtn.disabled = false
        gerarPdfBtn.textContent = textoOriginal
    }

    const popup = window.open('', '_blank', 'width=900,height=900')
    if (!popup) {
        finalizar()
        alert('Permita pop-ups para gerar o PDF.')
        return
    }

    try {
        popup.document.open()
        popup.document.write(`<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>${nomeArquivo}</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                        font-family: Helvetica, Arial, sans-serif;
                        color: #0f172a;
                    }
                    .pdf-page {
                        padding: 24px;
                        box-sizing: border-box;
                    }
                    @page {
                        size: A4;
                        margin: 12mm;
                    }
                    @media print {
                        body { margin: 0; }
                        .pdf-page { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="pdf-page">${htmlOrcamento}</div>
            </body>
            </html>`)
        popup.document.close()
        popup.focus()

        setTimeout(() => {
            try {
                popup.focus()
                popup.print()
            } catch (erro) {
                console.error('Erro ao abrir a janela de impressão:', erro)
            }
        }, 500)
    } catch (erro) {
        console.error('Erro ao montar a janela de impressão:', erro)
        finalizar()
        alert('Não foi possível abrir a janela de impressão. Tente novamente.')
        return
    }

    setTimeout(() => {
        finalizar()
    }, 1500)
})
