let cads = document.getElementById('cads')
let pdf = document.getElementById('baixar-pdf')

cads.addEventListener('click', () => {
    let itens = Number(document.getElementById('itens').value)
    let imprima = document.getElementById('imprima')
    imprima.innerHTML = ''
    imprima.innerHTML += `
        <label>Insira o Nome do Cliente</label>
        <input type='text' id='nomeC'><br><br>
        <label>Insira o Endereço do Cliente</label>
        <input type='text' id='localC'><br><br>
        <label>Insira a cidade do Cliente</label>
        <input type='text' id='cityC'><br><br>
        <label>Insira a data de emissão</label>
        <input type='date' id='dateE'><br><br>
        <label>Insira o número do orçamento</label>
        <input type='number' id='numO'><br><br>
    `

    for (let i = 1; i <= itens; i++) {
        imprima.innerHTML += `
            <div class='produto'>
                <hr><br>
                <label>Insira o nome do produto</label>
                <input id='nome${i}' type='text'>
                <label>Insira a quantidade do produto</label>
                <input id='qtde${i}' type='number'>
                <label>Insira o preço unitário do produto</label>
                <input id='precoU${i}' type='number'>
            </div>
        `
    }

    imprima.innerHTML += `
        <br><hr><br>
        <label for="coment">Gostaria de Inserir um Comentário?</label>
        <input id="coment" type="text">
    `

    imprima.innerHTML += `
        <button id='orcar'>Gerar Orçamento</button>
        <hr><br>
    `

    let orcar = document.getElementById('orcar')

    orcar.addEventListener('click', () => {
        let itens = Number(document.getElementById('itens').value)
        let orcamento = document.getElementById('orcamento-about')
        let footer = document.getElementById('orcamento-footer')

        let prod = []
        let total = 0

        let nomeC = document.getElementById('nomeC').value
        let localC = document.getElementById('localC').value
        let cityC = document.getElementById('cityC').value
        let dateE = document.getElementById('dateE').value
        let numO = Number(document.getElementById('numO').value)
        let coment = document.getElementById('coment').value

        let head = document.getElementById('thead')
        let body = document.getElementById('tbody')
        let foot = document.getElementById('tfoot')

        for (let i = 1; i <= itens; i++) {
            prod.push([
                document.getElementById(`nome${i}`).value,
                Number(document.getElementById(`qtde${i}`).value),
                Number(document.getElementById(`precoU${i}`).value)
            ])

            console.table(prod)

        }

        prod.forEach(activity => {
            let totalU = activity[1] * activity[2]
            activity[3] = totalU
        })

        for (let i = 0; i < itens; i++) {
            total += prod[i][3]
        }

        console.table(prod)

        orcamento.innerHTML = `
            <div class='about'>
                <img src="./public/logo.png" alt="">
                <h1>Prinz Vidraçaria</h1>
                <p>
                    <a href='https://api.whatsapp.com/send/?phone=5548998206570&text&type=phone_number&app_absent=0'>
                        Whatsapp: (48) 99820-6570
                    </a>
                </p>
                <p>
                    <a href='https://maps.app.goo.gl/Dr5aVy3LoZ7sLQgt5'>
                        Rua: Geraldo Rebelo, N° 1500
                    </a>
                </p>
                <p>
                    <a href='https://www.instagram.com/vidracariaprinz/'>
                        Instagram: vidracariaprinz
                    </a>
                </p>
                <p>
                    <a href='https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsmFSqwHdMbRbHkKFqgKVtstjlhxTFFVXLHgxWBkXqgntBhZsltWkCWwlRScfxxmZDJBNFRG'>
                        email: vidracariaprinz@gmail.com
                    </a>
                </p>
                <p>CNPJ: 41.959.367/0001-14</p>
            </div>

            <div class="title">
                <h2>ORÇAMENTO Nº ${numO}</h2>
            </div>

            <p>Data de Emissão: ${dateE}</p>
        
            <div class="client-info">
                <h2>Para:</h2>
                <p>${nomeC}</p>
                <p>Endereço: ${localC}</p>
                <p>Cidade: ${cityC}</p>
            </div>
        `

        head.innerHTML = `
            <tr>
                <th scope='col'>N°</th>
                <th scope='col'>DESCRIÇÃO</th>
                <th scope='col'>QTD</th>
                <th scope='col'>PREÇO</th>
                <th scope='col'>TOTAL</th>
            </tr>
        `

        body.innerHTML = ''

        for (let i = 0; i < itens; i++) {
            body.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${prod[i][0]}</td>
                    <td>${prod[i][1]}</td>
                    <td>R$: ${(prod[i][2]).toFixed(2)}</td>
                    <td>R$: ${(prod[i][3]).toFixed(2)}</td>
                </tr>
            `
        }

        foot.innerHTML = `
            <tr>
                <th scope="row" colspan="4">
                    Valor do Orçamento:
                </th>
                <td>
                    R$: ${total.toFixed(2)}
                </td>
            </tr>
        `

        if (coment) {
            footer.innerHTML = `
                <h2>Observações: </h2>
                <p>${coment}</p>
            `
        }

    })
})

const download = function () {
    
    const a = document.createElement('a')
    a.style = 'display : none;'
    document.body.appendChild(a)
    return function (conteudo, nomeArquivo) {
        const blob = new Blob([conteudo], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = nomeArquivo
        a.click()
        window.URL.revokeObjectURL(url)
    }
}

const downloadPDF = download()

pdf.addEventListener('click', () => {
    function visao(){
        let itens = Number(document.getElementById('itens').value)

        let prod = []
        let total = 0

        let nomeC = document.getElementById('nomeC').value
        let localC = document.getElementById('localC').value
        let cityC = document.getElementById('cityC').value
        let dateE = document.getElementById('dateE').value
        let numO = Number(document.getElementById('numO').value)
        let coment = document.getElementById('coment').value

        for (let i = 1; i <= itens; i++) {
            prod.push([
                document.getElementById(`nome${i}`).value,
                Number(document.getElementById(`qtde${i}`).value),
                Number(document.getElementById(`precoU${i}`).value)
            ])

            console.table(prod)

        }

        prod.forEach(activity => {
            let totalU = activity[1] * activity[2]
            activity[3] = totalU
        })

        for (let i = 0; i < itens; i++) {
            total += prod[i][3]
        }

        console.table(prod)

        let preview = `
            <style> 
                *{
                    font-size: 5px;
                    color: black;
                    text-decoration: none;
                    margin: 0;
                    padding: 0;
                }
                
                div {
                    margin-top: 10px;
                    width: 190px;
                    text-align: center;
                }
                
                table {
                    width: 190px
                }

                th, td {
                    border: 0.1px solid black;
                    padding: 1px 4px;
                }
            </style>

            <div class='about'>
                <h1>Prinz Vidraçaria</h1>
                <p>
                    <a href='https://api.whatsapp.com/send/?phone=5548998206570&text&type=phone_number&app_absent=0'>
                        Whatsapp: (48) 99820-6570
                    </a>
                </p>
                <p>
                    <a href='https://maps.app.goo.gl/Dr5aVy3LoZ7sLQgt5'>
                        Rua: Geraldo Rebelo, N° 1500
                    </a>
                </p>
                <p>
                    <a href='https://www.instagram.com/vidracariaprinz/'>
                        Instagram: vidracariaprinz
                    </a>
                </p>
                <p>
                    <a href='https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsmFSqwHdMbRbHkKFqgKVtstjlhxTFFVXLHgxWBkXqgntBhZsltWkCWwlRScfxxmZDJBNFRG'>
                        email: vidracariaprinz@gmail.com
                    </a>
                </p>
                <p>CNPJ: 41.959.367/0001-14</p>
            </div>

            <div class="title">
                <h2>ORÇAMENTO Nº ${numO}</h2>
                <p>Data de Emissão: ${dateE}</p>
            </div>
        
            <div class="client-info">
                <h2>Para:</h2>
                <p>${nomeC}</p>
                <p>Endereço: ${localC}</p>
                <p>Cidade: ${cityC}</p>
            </div>
        
            <div>
                <table> 
                    <thead>      
                        <tr>
                            <th scope='col'>N°</th>
                            <th scope='col'>DESCRIÇÃO</th>
                            <th scope='col'>QTD</th>
                            <th scope='col'>PREÇO</th>
                            <th scope='col'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
        `

        for (let i = 0; i < itens; i++) {
            preview += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${prod[i][0]}</td>
                    <td>${prod[i][1]}</td>
                    <td>R$: ${(prod[i][2]).toFixed(2)}</td>
                    <td>R$: ${(prod[i][3]).toFixed(2)}</td>
                </tr>
            `
        }

        preview += `
                    </body>
                    <tfoot>
                        <tr>
                            <th scope="row" colspan="4">
                                Valor do Orçamento:
                            </th>
                            <td>
                                R$: ${total.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `
            
            if (coment) {
            preview += `
                <div>
                    <h2>Observações: </h2>
                    <p>${coment}</p>
                </div>
            `
        }
        
        return preview
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const previewContent = visao();
    
    // Convert previewContent to a temporary HTML element
    const tempElement = document.createElement('div');
    tempElement.innerHTML = previewContent;
    
    // Use jsPDF's fromHTML function to convert HTML to PDF
    doc.html(tempElement, {
        callback: function (doc) {
            const pdfBlob = doc.output('blob');
            const cliente = document.getElementById('nomeC').value;
        
            if (cliente) {
                downloadPDF(pdfBlob, `${cliente}_orcamento.pdf`);
            }
        },
        x: 10,
        y: 10,
    });
})