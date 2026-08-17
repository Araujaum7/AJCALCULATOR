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
                4.08, 5.30, 6.31, 7.30, 8.28, 9.28, 
                11.12, 12.39, 13.58, 14.94, 16.05, 17.04
            ],
            master: [
                4.08, 5.34, 6.35, 7.34, 8.32, 9.32, 
                11.12, 12.39, 13.58, 14.94, 16.05, 17.04
            ],
            elo: [
                4.68, 6.53, 7.53, 8.50, 9.47, 10.46, 
                12.45, 13.40, 14.38, 15.35, 16.32, 17.31
            ],
            hipercard: [
                3.99, 6.29, 7.30, 8.28, 9.25, 10.23, 
                11.99, 12.96, 13.94, 14.91, 15.89, 16.87
            ],
            amex: [
                3.32, 4.84, 5.48, 6.13, 6.76, 7.40, 
                8.32, 8.95, 9.59, 10.23, 10.86, 11.49
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
