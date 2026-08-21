// ============================================================================
// ARQUIVO DE CONFIGURAÇÃO DE TAXAS - AJ CALCULATOR
// ============================================================================
// Instruções:
// 1. Você pode alterar qualquer número abaixo utilizando o Bloco de Notas.
// 2. Sempre use PONTO no lugar de VÍRGULA para as casas decimais (ex: 4.08 em vez de 4,08).
// 3. Após salvar este arquivo, basta usar o atalho de Gerar o Aplicativo!

const CONFIGURACAO_TAXAS = {
    // ------------------------------------------------------------------------
    // PLATAFORMA 1: PAYUP
    // ------------------------------------------------------------------------
    payup: {
        pix: {
            percent: 2.00,  // Taxa do Pix em %
            fixed: 0        // Taxa fixa do Pix em R$ (se houver)
        },
        credit: {
            // As taxas do cartão são listas de 12 valores.
            // O 1º valor é a taxa à vista (1x). O 12º valor é a taxa em 12x.
            visa: [
                4.70, 5.70, 6.76, 7.81, 8.89, 9.94,
                11.84, 13.17, 14.42, 15.83, 17.00, 18.05
            ],
            master: [
                4.70, 5.74, 6.80, 7.86, 8.91, 9.98,
                11.57, 12.92, 14.16, 15.61, 16.77, 17.82
            ],
            elo: [
                5.01, 6.93, 7.98, 9.02, 10.06, 11.12,
                13.15, 14.17, 15.20, 16.25, 17.28, 18.32
            ]
        }
    },

    // ------------------------------------------------------------------------
    // PLATAFORMA 2: UOPPAY
    // ------------------------------------------------------------------------
    uoppay: {
        pix: {
            percent: 2.69,
            fixed: 0
        },
        boleto: {
            percent: 2.19,
            fixed: 0
        },
        // Na UOPPAY, as taxas de cartão não mudam por bandeira.
        credit: {
            all: [
                6.07, 7.21, 7.98, 8.76, 9.53, 10.31,
                11.32, 13.09, 13.86, 15.14, 15.91, 16.69
            ]
        }
    }
};
