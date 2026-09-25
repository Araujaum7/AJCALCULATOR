// As taxas agora são importadas dinamicamente do arquivo taxas.js
const rates = CONFIGURACAO_TAXAS;
const elCalcMode = document.getElementById('calc-mode');
const elMainValue = document.getElementById('main-value');
const elMainValueLabel = document.getElementById('main-value-label');
const elPlatform = document.getElementById('platform');
const elMethod = document.getElementById('method');
const elCreditOptions = document.getElementById('credit-options');
const elBrandGroup = document.getElementById('brand-group');
const elBrand = document.getElementById('brand');
const elInstallments = document.getElementById('installments');
const elUoppayFeeGroup = document.getElementById('uoppay-fee-group');
const elUoppayFee = document.getElementById('uoppay-fee');
const elExtraFee = document.getElementById('extra-fee');

const elPrimaryTitle = document.getElementById('result-primary-title');
const elPrimaryAmount = document.getElementById('result-primary-amount');
const elPrimarySubtitle = document.getElementById('result-primary-subtitle');
const elFeeAmount = document.getElementById('fee-amount');
const elFeePercent = document.getElementById('fee-percent');
const elSecondaryTitle = document.getElementById('result-secondary-title');
const elSecondaryAmount = document.getElementById('result-secondary-amount');
const elSaleAmount = document.getElementById('sale-amount');
const elModeRadios = document.querySelectorAll('input[name="mode-ui"]');

// Initialize formatting and listeners
elCalcMode.addEventListener('change', () => { updateMode(); calculate(); });
elModeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        elCalcMode.value = radio.value;
        updateMode();
        calculate();
    });
});
elMainValue.addEventListener('input', handleCurrencyInput);
elPlatform.addEventListener('change', updateFormState);
elMethod.addEventListener('change', updateFormState);
elBrand.addEventListener('change', calculate);
elInstallments.addEventListener('change', calculate);
elUoppayFee.addEventListener('change', calculate);
elExtraFee.addEventListener('input', calculate);

function handleCurrencyInput(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value === '') value = '0';
    const numValue = parseInt(value, 10) / 100;
    e.target.value = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numValue);
    calculate();
}

function getNumericValue(str) {
    if (!str) return 0;
    const cleanStr = str.replace(/[^\d,]/g, '');
    return parseFloat(cleanStr.replace(',', '.'));
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function updateMode() {
    const mode = elCalcMode.value;
    if (mode === 'normal') {
        elMainValueLabel.textContent = 'Valor líquido desejado';
        elPrimaryTitle.textContent = 'Valor a cobrar';
        elPrimarySubtitle.textContent = 'Passe este valor para o cliente';
        elSecondaryTitle.textContent = 'Você recebe';
    } else {
        elMainValueLabel.textContent = 'Valor cobrado do cliente';
        elPrimaryTitle.textContent = 'Valor líquido';
        elPrimarySubtitle.textContent = 'Valor que cai na sua conta';
        elSecondaryTitle.textContent = 'Valor Cobrado';
    }
}

function updateFormState() {
    const platform = elPlatform.value;
    const method = elMethod.value;

    // Update Methods based on Platform
    const currentMethod = elMethod.value;
    elMethod.innerHTML = '';

    if (platform === 'payup') {
        elMethod.add(new Option('Pix', 'pix'));
        elMethod.add(new Option('Cartão de crédito', 'credit'));
        elUoppayFeeGroup.hidden = true;
    } else {
        elMethod.add(new Option('Pix', 'pix'));
        elMethod.add(new Option('Boleto', 'boleto'));
        elMethod.add(new Option('Cartão de crédito', 'credit'));
        elUoppayFeeGroup.hidden = false;
    }

    // Restore selected method if available
    if (Array.from(elMethod.options).some(opt => opt.value === currentMethod)) {
        elMethod.value = currentMethod;
    } else {
        elMethod.value = 'pix';
    }

    // Handle Credit Options visibility
    if (elMethod.value === 'credit') {
        elCreditOptions.hidden = false;

        // Brand logic
        elBrandGroup.hidden = false;

        // Populate installments
        populateInstallments();
    } else {
        elCreditOptions.hidden = true;
    }

    calculate();
}

function populateInstallments() {
    const currentInst = elInstallments.value;
    elInstallments.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const label = i === 1 ? '1x (À vista)' : `${i}x`;
        elInstallments.add(new Option(label, i));
    }
    if (currentInst && currentInst <= 12) {
        elInstallments.value = currentInst;
    }
}

function calculate() {
    const platform = elPlatform.value;
    const method = elMethod.value;
    const brand = elBrand.value;
    const mode = elCalcMode.value;

    if (platform === 'uoppay' && method === 'credit' && brand === 'elo') {
        alert('Atenção: a bandeira Elo não está disponível na plataforma UOPPAY.');
        elBrand.value = 'visa'; // Reverte para uma bandeira permitida
    }

    const mainValueStr = elMainValue.value;
    const mainValue = getNumericValue(mainValueStr);

    if (mainValue === 0) {
        resetResults();
        return;
    }

    let percentRate = 0;
    let fixedRate = 0;

    if (platform === 'uoppay' && elUoppayFee.checked) {
        fixedRate = 1.00; // Tarifa de processamento da UOPPAY
    }

    if (method === 'pix') {
        percentRate = rates[platform].pix.percent;
    } else if (method === 'boleto') {
        percentRate = rates[platform].boleto.percent;
    } else if (method === 'credit') {
        const installments = parseInt(elInstallments.value, 10);
        const index = installments - 1;

        if (platform === 'payup') {
            const brand = elBrand.value;
            percentRate = rates.payup.credit[brand][index];
        } else {
            percentRate = rates.uoppay.credit.all[index];
        }
    }

    // Lê a taxa extra opcional
    const extraFeeStr = elExtraFee.value.replace(',', '.');
    const extraFeePercent = parseFloat(extraFeeStr) || 0;

    const totalPercentRate = percentRate + extraFeePercent;

    let chargeAmount = 0;
    let netReceived = 0;
    let totalFee = 0;

    if (mode === 'normal') {
        // Formula: Valor a Cobrar = (Valor Líquido + Taxa Fixa) / (1 - Taxa Percentual / 100)
        const factor = 1 - (totalPercentRate / 100);
        chargeAmount = (mainValue + fixedRate) / factor;
        totalFee = chargeAmount - mainValue;
        netReceived = mainValue;

        elPrimaryAmount.textContent = formatCurrency(chargeAmount);
        elSecondaryAmount.textContent = formatCurrency(netReceived);
        if (elSaleAmount) elSaleAmount.textContent = formatCurrency(chargeAmount);
    } else {
        // Inverso
        // Formula: Taxa = Valor Cobrado * (Taxa Percentual / 100) + Taxa Fixa
        chargeAmount = mainValue;
        totalFee = chargeAmount * (totalPercentRate / 100) + fixedRate;
        netReceived = chargeAmount - totalFee;

        elPrimaryAmount.textContent = formatCurrency(netReceived);
        elSecondaryAmount.textContent = formatCurrency(chargeAmount);
        if (elSaleAmount) elSaleAmount.textContent = formatCurrency(chargeAmount);
    }

    elFeeAmount.textContent = `- ${formatCurrency(totalFee)}`;

    let percentText = `${percentRate.toFixed(2).replace('.', ',')}%`;
    if (extraFeePercent > 0) percentText += ` + ${extraFeePercent.toFixed(2).replace('.', ',')}% (Extra)`;
    if (fixedRate > 0) percentText += ' + R$ 1,00';

    elFeePercent.textContent = percentText;

    // Dispara a animação de atualização do resultado
    const primaryCard = document.querySelector('.result-card.primary');
    if (primaryCard) {
        primaryCard.classList.remove('result-updated');
        void primaryCard.offsetWidth; // Força o reflow para reiniciar a animação
        primaryCard.classList.add('result-updated');
    }
}

function resetResults() {
    elPrimaryAmount.textContent = 'R$ 0,00';
    elFeeAmount.textContent = '- R$ 0,00';
    elFeePercent.textContent = '0%';
    elSecondaryAmount.textContent = 'R$ 0,00';
    if (elSaleAmount) elSaleAmount.textContent = 'R$ 0,00';
}

// Initialize
updateMode();
updateFormState();
elMainValue.dispatchEvent(new Event('input'));
