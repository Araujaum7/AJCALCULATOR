<div align="center">
  <h1>AJ Calculator 📱💜</h1>
  <p><strong>A ferramenta definitiva para calcular o repasse exato de taxas de maquininhas e gateways de pagamento.</strong></p>
</div>

---

## 📌 Sobre o Projeto
A **AJ Calculator** foi desenvolvida para empreendedores e vendedores que precisam saber **exatamente** quanto cobrar do cliente final para receber um valor líquido desejado, livre de todas as taxas da plataforma de pagamento.

Diferente de calculadoras comuns, ela faz o "cálculo reverso": você insere o quanto quer no bolso (ex: R$ 2.000) e ela te diz o valor a passar na máquina, de acordo com a bandeira do cartão e o número de parcelas.

## 🚀 Funcionalidades
- **Cálculo Reverso Preciso:** Descubra o valor bruto da venda baseado no valor líquido desejado.
- **Múltiplas Plataformas:** Suporte inicial nativo para **Payup** e **UOPPAY**.
- **Acréscimos Personalizados:** Opção para embutir uma "Taxa Extra" (ex: +5%) diretamente no valor final do cliente.
- **Design Premium:** Interface linda e moderna (Glassmorphism), adaptada às cores institucionais (Roxo/Violeta).
- **Ultra Leve:** Feita puramente em HTML/CSS/Vanilla JS para máxima velocidade sem travamentos.

## ⚙️ Como alterar as taxas?
A melhor parte é a autonomia: você não precisa saber programar para manter o app atualizado!
Basta abrir o arquivo **`taxas.js`** em qualquer bloco de notas e você verá uma tabela simples e amigável:

```javascript
// Exemplo do arquivo taxas.js
payup: {
    pix: { percent: 2.00 },
    credit: {
        visa: [4.08, 5.30, /* parcelas... */ ]
    }
}
```
Altere os números, salve o arquivo e o aplicativo inteiro passará a usar as novas taxas no mesmo segundo.

## 🌐 Deploy Rápido (Netlify/Vercel)
Por ser uma estrutura puramente estática, a AJ Calculator pode ser hospedada gratuitamente e em poucos segundos:
1. Acesse o **Netlify Drop**.
2. Arraste a pasta do projeto para o site.
3. Compartilhe o link gerado com todos os seus clientes!

---
Desenvolvido com 💜 para facilitar as vendas diárias.
