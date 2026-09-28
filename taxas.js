// ============================================================================
// ARQUIVO DE CONFIGURAÇÃO DE TAXAS - AJ CALCULATOR
// ============================================================================
// Instruções:
// 1. Você pode alterar qualquer número abaixo utilizando o Bloco de Notas.
// 2. Sempre use PONTO no lugar de VÍRGULA para as casas decimais (ex: 4.08 em vez de 4,08).
// 3. Após salvar este arquivo, basta usar o atalho de Gerar o Aplicativo!

const CONFIGURACAO_TAXAS = {
    // ------------------------------------------------------------------------
    // PLATAFORMA 1: PAYUP ATIVA
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
                4.97, 6.89, 7.94, 9.00, 9.99, 11.43,
                13.66, 15.37, 16.96, 18.74, 20.25, 21.66
            ],
            master: [
                4.97, 6.91, 7.90, 9.01, 9.99, 11.43,
                13.66, 15.37, 16.96, 18.74, 20.25, 21.66
            ],
            elo: [
                5.53, 6.92, 8.35, 9.78, 11.19, 12.62,
                15.02, 16.40, 17.82, 19.20, 20.59, 21.98
            ],
            hipercard: [
                4.88, 6.65, 8.09, 9.51, 10.94, 12.35,
                14.51, 15.92, 17.31, 18.72, 20.10, 21.51
            ],
            amex: [
                5.45, 6.66, 8.08, 9.52, 10.93, 12.36,
                14.57, 15.95, 17.37, 18.75, 20.14, 21.55
            ]
        }
    },

    // ------------------------------------------------------------------------
    // PLATAFORMA: PAYUP ATITUDE
    // ------------------------------------------------------------------------
    payup_atitude: {
        pix: {
            percent: 2.00,
            fixed: 0
        },
        credit: {
            visa: [
                4.57, 5.94, 7.08, 8.22, 9.35, 10.49,
                12.46, 13.87, 15.20, 16.68, 17.93, 19.06
            ],
            master: [
                4.57, 5.98, 7.13, 8.26, 9.38, 10.53,
                12.46, 13.86, 15.20, 16.69, 17.94, 19.07
            ],
            elo: [
                5.17, 7.17, 8.31, 9.41, 10.53, 11.66,
                13.78, 14.86, 15.98, 17.09, 18.20, 19.31
            ],
            hipercard: [ // Mesmas taxas do Payup Ativa por padrão, já que a imagem não mostrou
                4.88, 6.65, 8.09, 9.51, 10.94, 12.35,
                14.51, 15.92, 17.31, 18.72, 20.10, 21.51
            ],
            amex: [ // Mesmas taxas do Payup Ativa por padrão
                5.45, 6.66, 8.08, 9.52, 10.93, 12.36,
                14.57, 15.95, 17.37, 18.75, 20.14, 21.55
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
